module stratadeed::property_rwa {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use std::string::String;
    use sui::event;
    use std::vector;

    /// RWA Token representing fractional ownership of a property
    public struct RWAToken has key, store {
        id: UID,
        property_id: String,
        tokens_owned: u64,
        owner: address,
    }

    /// RWA Treasury - manages escrow and deposits
    public struct RWATreasury has key {
        id: UID,
        balance: Balance<SUI>,
        total_escrow_liability: u64,
        total_escrow_raised: u64,
        total_escrow_processed: u64,
        funding_cap: u64,
        escrow_state: u8, // 0: Funding, 1: Finalized, 2: Cancelled, 3: Emergency
        distributed_yield: u64,
        max_withdrawals: u64,
    }

    /// Admin capability for controlling the contract
    public struct TreasuryAdminCap has key {
        id: UID,
    }

    // =========================================
    // Constants
    // =========================================

    const STATE_FUNDING: u8 = 0;
    const STATE_FINALIZED: u8 = 1;
    const STATE_CANCELLED: u8 = 2;
    const STATE_EMERGENCY: u8 = 3;

    const SCALE: u64 = 1_000_000_000_000_000_000; // 1e18
    const PROPERTY_TOKEN_SUPPLY: u64 = 1_000_000_000_000_000_000; // 1000 tokens with 18 decimals

    // Error codes
    const ERROR_INVALID_FUNDING_CAP: u64 = 1001;
    const ERROR_CAP_OVERFLOW: u64 = 1002;
    const ERROR_NOT_FUNDING_STATE: u64 = 1;
    const ERROR_EXCEEDS_CAP: u64 = 2;
    const ERROR_INSUFFICIENT_BALANCE: u64 = 301;
    const ERROR_INVALID_STATE: u64 = 302;
    const ERROR_EXCEEDS_WITHDRAWAL_LIMIT: u64 = 303;
    const ERROR_INVALID_STATE_DISTRIBUTE: u64 = 401;
    const ERROR_WOULD_OVERFLOW: u64 = 403;
    const ERROR_EMERGENCY_STATE: u64 = 501;
    const ERROR_WRONG_STATE_FOR_ACTION: u64 = 504;

    // =========================================
    // Events
    // =========================================

    public struct RWATokenMinted has copy, drop {
        owner: address,
        property_id: String,
        tokens: u64,
    }

    public struct EscrowDepositMade has copy, drop {
        depositor: address,
        amount: u64,
        timestamp: u64,
    }

    public struct EscrowStateChanged has copy, drop {
        new_state: u8,
        timestamp: u64,
    }

    public struct FundsWithdrawn has copy, drop {
        beneficiary: address,
        amount: u64,
    }

    public struct YieldDistributed has copy, drop {
        recipient: address,
        amount: u64,
    }

    // =========================================
    // Initialization
    // =========================================

    /// Create a new RWA Treasury
    public fun create_treasury(
        funding_cap: u64,
        ctx: &mut TxContext,
    ): (RWATreasury, TreasuryAdminCap) {
        // Validate cap is positive
        assert!(funding_cap > 0, ERROR_INVALID_FUNDING_CAP);
        
        // Prevent overflow
        assert!(funding_cap < (18446744073709551615u64 / 2), ERROR_CAP_OVERFLOW);
        
        let max_withdrawals = if (funding_cap / 10 > 0) { funding_cap / 10 } else { 1 };
        
        let treasury = RWATreasury {
            id: object::new(ctx),
            balance: balance::zero<SUI>(),
            total_escrow_liability: 0,
            total_escrow_raised: 0,
            total_escrow_processed: 0,
            funding_cap: funding_cap,
            escrow_state: STATE_FUNDING,
            distributed_yield: 0,
            max_withdrawals: max_withdrawals,
        };

        let admin_cap = TreasuryAdminCap {
            id: object::new(ctx),
        };

        (treasury, admin_cap)
    }

    // =========================================
    // Public Functions
    // =========================================

    /// Mint RWA tokens for a property
    public fun mint_rwa_token(
        property_id: String,
        tokens: u64,
        to: address,
        ctx: &mut TxContext,
    ): RWAToken {
        let token = RWAToken {
            id: object::new(ctx),
            property_id: property_id,
            tokens_owned: tokens,
            owner: to,
        };

        event::emit(RWATokenMinted {
            owner: to,
            property_id: property_id,
            tokens: tokens,
        });

        token
    }

    /// Deposit funds into the escrow
    public fun deposit_escrow(
        treasury: &mut RWATreasury,
        deposit: Coin<SUI>,
        ctx: &mut TxContext,
    ) {
        let amount = coin::value(&deposit);
        
        // Check state - only allow deposits during funding phase
        assert!(treasury.escrow_state == STATE_FUNDING, ERROR_NOT_FUNDING_STATE);
        
        // Don't exceed cap
        assert!(treasury.total_escrow_raised + amount <= treasury.funding_cap, ERROR_EXCEEDS_CAP);
        
        // Check for overflow
        assert!(treasury.total_escrow_raised + amount >= treasury.total_escrow_raised, ERROR_WOULD_OVERFLOW);

        balance::join(&mut treasury.balance, coin::into_balance(deposit));
        treasury.total_escrow_raised = treasury.total_escrow_raised + amount;

        event::emit(EscrowDepositMade {
            depositor: tx_context::sender(ctx),
            amount: amount,
            timestamp: get_timestamp(ctx),
        });
    }

    /// Withdraw funds from the treasury (admin only)
    public fun withdraw_funds(
        treasury: &mut RWATreasury,
        _admin_cap: &TreasuryAdminCap,
        amount: u64,
        ctx: &mut TxContext,
    ): Coin<SUI> {
        let current_balance = balance::value(&treasury.balance);
        
        // Check sufficient balance
        assert!(current_balance >= amount, ERROR_INSUFFICIENT_BALANCE);
        
        // Prevent withdrawal during funding phase
        assert!(treasury.escrow_state != STATE_FUNDING, ERROR_INVALID_STATE);
        
        // Check withdrawal doesn't exceed limit
        assert!(amount <= treasury.max_withdrawals, ERROR_EXCEEDS_WITHDRAWAL_LIMIT);
        
        // Prevent operations in emergency (can only withdraw for refunds)
        assert!(treasury.escrow_state == STATE_FINALIZED || treasury.escrow_state == STATE_CANCELLED, ERROR_EMERGENCY_STATE);
        
        let withdrawn_balance = balance::split(&mut treasury.balance, amount);
        let coin = coin::from_balance(withdrawn_balance, ctx);

        event::emit(FundsWithdrawn {
            beneficiary: tx_context::sender(ctx),
            amount: amount,
        });

        coin
    }

    /// Finalize the escrow (admin only)
    public fun finalize_escrow(
        treasury: &mut RWATreasury,
        _admin_cap: &TreasuryAdminCap,
        ctx: &mut TxContext,
    ) {
        assert!(treasury.escrow_state == STATE_FUNDING, ERROR_NOT_FUNDING_STATE);
        treasury.escrow_state = STATE_FINALIZED;
        treasury.total_escrow_processed = treasury.total_escrow_raised;

        event::emit(EscrowStateChanged {
            new_state: STATE_FINALIZED,
            timestamp: get_timestamp(ctx),
        });
    }

    /// Cancel the escrow and trigger refunds (admin only)
    public fun cancel_escrow(
        treasury: &mut RWATreasury,
        _admin_cap: &TreasuryAdminCap,
        ctx: &mut TxContext,
    ) {
        assert!(treasury.escrow_state == STATE_FUNDING, 1);
        treasury.escrow_state = STATE_CANCELLED;

        event::emit(EscrowStateChanged {
            new_state: STATE_CANCELLED,
            timestamp: get_timestamp(ctx),
        });
    }

    /// Trigger emergency refund mode (admin only)
    public fun trigger_emergency(
        treasury: &mut RWATreasury,
        _admin_cap: &TreasuryAdminCap,
        ctx: &mut TxContext,
    ) {
        treasury.escrow_state = STATE_EMERGENCY;

        event::emit(EscrowStateChanged {
            new_state: STATE_EMERGENCY,
            timestamp: get_timestamp(ctx),
        });
    }

    /// Distribute yield to token holders (admin only)
    public fun distribute_yield(
        treasury: &mut RWATreasury,
        _admin_cap: &TreasuryAdminCap,
        recipient: address,
        amount: u64,
        ctx: &mut TxContext,
    ): Coin<SUI> {
        let current_balance = balance::value(&treasury.balance);
        
        // Check actual balance, not just liability
        assert!(current_balance >= amount, ERROR_INSUFFICIENT_BALANCE);
        
        // Prevent yield distribution in wrong states
        assert!(treasury.escrow_state == STATE_FINALIZED, ERROR_INVALID_STATE_DISTRIBUTE);
        
        // Prevent overflow
        assert!(treasury.distributed_yield + amount <= current_balance, ERROR_WOULD_OVERFLOW);
        
        // Update distributed amount
        treasury.distributed_yield = treasury.distributed_yield + amount;
        
        let withdrawn_balance = balance::split(&mut treasury.balance, amount);
        let coin = coin::from_balance(withdrawn_balance, ctx);

        event::emit(YieldDistributed {
            recipient: recipient,
            amount: amount,
        });

        coin
    }

    /// Transfer RWA tokens to another address
    public fun transfer_rwa_token(
        token: RWAToken,
        to: address,
    ) {
        transfer::transfer(token, to);
    }

    /// Burn (destroy) an RWA token
    public fun burn_rwa_token(token: RWAToken) {
        let RWAToken {
            id,
            property_id: _,
            tokens_owned: _,
            owner: _,
        } = token;
        object::delete(id);
    }

    // =========================================
    // Public View Functions
    // =========================================

    /// Get treasury balance
    public fun get_treasury_balance(treasury: &RWATreasury): u64 {
        balance::value(&treasury.balance)
    }

    /// Get total escrow raised
    public fun get_total_escrow_raised(treasury: &RWATreasury): u64 {
        treasury.total_escrow_raised
    }

    /// Get escrow state
    public fun get_escrow_state(treasury: &RWATreasury): u8 {
        treasury.escrow_state
    }

    /// Get funding cap
    public fun get_funding_cap(treasury: &RWATreasury): u64 {
        treasury.funding_cap
    }

    /// Get RWA token info
    public fun get_token_info(token: &RWAToken): (String, u64, address) {
        (token.property_id, token.tokens_owned, token.owner)
    }

    /// Check if token is valid
    public fun is_token_valid(token: &RWAToken): bool {
        token.tokens_owned > 0
    }

    // =========================================
    // Internal Helper Functions
    // =========================================

    // =========================================
    // Internal Helper Functions
    // =========================================

    /// Get current timestamp using Sui epoch
    fun get_timestamp(ctx: &TxContext): u64 {
        // Use Sui's epoch timestamp
        // In production, use an oracle or official timestamp
        (tx_context::epoch(ctx) as u64) * 1000 // Convert epoch to milliseconds
    }

    /// Check escrow state for operations
    fun check_escrow_state_allowed(current_state: u8, action: u8) {
        // action: 0 = deposit, 1 = withdraw, 2 = distribute
        
        // Never allow operations in emergency
        assert!(current_state != STATE_EMERGENCY, ERROR_EMERGENCY_STATE);
    }
}
