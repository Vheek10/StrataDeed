module stratadeed::property {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::string::String;

    /// Admin capability for controlling the contract
    public struct AdminCapability has key {
        id: UID,
    }

    /// Represents a tokenized real estate property on Sui
    public struct Property has key, store {
        id: UID,
        title: String,
        location: String,
        valuation: u64,
        total_tokens: u64,
        tokens_available: u64,
        owner: address,
        is_verified: bool,
    }

    /// Represents an ownership token for a property
    public struct PropertyToken has key, store {
        id: UID,
        property_id: address,
        tokens: u64,
        owner: address,
    }

    // Error codes
    const ERROR_INVALID_VALUATION: u64 = 101;
    const ERROR_INVALID_TOKEN_SUPPLY: u64 = 102;
    const ERROR_INVALID_TITLE_LENGTH: u64 = 103;
    const ERROR_INVALID_LOCATION_LENGTH: u64 = 104;
    const ERROR_NOT_OWNER: u64 = 201;
    const ERROR_INVALID_TOKEN_AMOUNT: u64 = 202;
    const ERROR_INSUFFICIENT_TOKENS: u64 = 203;

    const MAX_STRING_LENGTH: u64 = 255;
    const MIN_STRING_LENGTH: u64 = 1;

    /// Initialize module with admin cap
    fun init(ctx: &mut TxContext) {
        let admin_cap = AdminCapability {
            id: object::new(ctx),
        };
        transfer::transfer(admin_cap, tx_context::sender(ctx));
    }

    /// Create a new tokenized property
    public fun create_property(
        _admin_cap: &AdminCapability,
        title: String,
        location: String,
        valuation: u64,
        total_tokens: u64,
        ctx: &mut TxContext,
    ): Property {
        // Input validation
        assert!(valuation > 0, ERROR_INVALID_VALUATION);
        assert!(total_tokens > 0, ERROR_INVALID_TOKEN_SUPPLY);
        assert!(check_string_length(&title, MIN_STRING_LENGTH, MAX_STRING_LENGTH), ERROR_INVALID_TITLE_LENGTH);
        assert!(check_string_length(&location, MIN_STRING_LENGTH, MAX_STRING_LENGTH), ERROR_INVALID_LOCATION_LENGTH);

        let id = object::new(ctx);
        let owner = tx_context::sender(ctx);
        
        Property {
            id,
            title,
            location,
            valuation,
            total_tokens,
            tokens_available: total_tokens,
            owner,
            is_verified: false,
        }
    }

    /// Mint tokens for a property
    public fun mint_property_token(
        property: &mut Property,
        tokens: u64,
        ctx: &mut TxContext,
    ): PropertyToken {
        let caller = tx_context::sender(ctx);
        
        // Ownership verification
        assert!(caller == property.owner, ERROR_NOT_OWNER);
        
        // Token validation
        assert!(tokens > 0, ERROR_INVALID_TOKEN_AMOUNT);
        assert!(tokens <= property.tokens_available, ERROR_INSUFFICIENT_TOKENS);
        
        // Update available tokens
        property.tokens_available = property.tokens_available - tokens;
        
        let id = object::new(ctx);
        
        PropertyToken {
            id,
            property_id: object::id_to_address(&property.id),
            tokens,
            owner: caller,
        }
    }

    /// Verify property ownership
    public fun verify_property(property: &mut Property, _admin_cap: &AdminCapability) {
        property.is_verified = true;
    }

    /// Get property details
    public fun get_property_info(property: &Property): (String, String, u64, u64) {
        (property.title, property.location, property.valuation, property.total_tokens)
    }

    /// Get property owner
    public fun get_owner(property: &Property): address {
        property.owner
    }

    /// Check if property is verified
    public fun is_verified(property: &Property): bool {
        property.is_verified
    }

    /// Transfer property token to another address
    public fun transfer_token(token: PropertyToken, to: address, _ctx: &mut TxContext) {
        transfer::public_transfer(token, to);
    }

    // =========================================
    // Internal Helper Functions
    // =========================================

    /// Check string length is within bounds
    fun check_string_length(s: &String, min: u64, max: u64): bool {
        let len = s.length();
        len >= min && len <= max
    }
}
