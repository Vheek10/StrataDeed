module stratadeed::property_nft {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::string::String;
    use sui::event;

    /// Property Deed NFT - Represents a tokenized property deed
    public struct PropertyDeed has key, store {
        id: UID,
        property_id: String,
        metadata_uri: String,
        private_commitment: vector<u8>,  // Hash commitment to private data (ZK-ready)
        owner: address,
        minted_at: u64,
    }

    /// Admin capability for controlling the contract
    public struct AdminCap has key {
        id: UID,
    }

    // =========================================
    // Events
    // =========================================

    public struct PropertyTokenized has copy, drop {
        owner: address,
        deed_id: address,
        property_id: String,
        metadata_uri: String,
    }

    public struct DeedTransferred has copy, drop {
        from: address,
        to: address,
        deed_id: address,
    }

    public struct PrivateDataUpdated has copy, drop {
        deed_id: address,
        commitment: vector<u8>,
    }

    // Error codes
    const ERROR_NOT_OWNER: u64 = 101;
    const ERROR_SAME_ADDRESS: u64 = 102;
    const ERROR_INVALID_COMMITMENT: u64 = 201;
    const ERROR_COMMITMENT_TOO_LONG: u64 = 202;

    const MAX_COMMITMENT_LENGTH: u64 = 64;  // Hash commitment should be max 64 bytes

    // =========================================
    // Initialization
    // =========================================

    /// Initialize the module and create admin capability
    fun init(ctx: &mut TxContext) {
        let admin_cap = AdminCap {
            id: object::new(ctx),
        };
        transfer::transfer(admin_cap, tx_context::sender(ctx));
    }

    // =========================================
    // Public Functions
    // =========================================

    /// Mint a new Property Deed NFT
    public fun mint_property_deed(
        property_id: String,
        metadata_uri: String,
        private_commitment: vector<u8>,
        to: address,
        ctx: &mut TxContext,
    ): PropertyDeed {
        let deed = PropertyDeed {
            id: object::new(ctx),
            property_id: property_id,
            metadata_uri: metadata_uri,
            private_commitment: private_commitment,
            owner: to,
            minted_at: get_timestamp(ctx),
        };

        event::emit(PropertyTokenized {
            owner: to,
            deed_id: object::id_to_address(&deed.id),
            property_id: property_id,
            metadata_uri: metadata_uri,
        });

        event::emit(PrivateDataUpdated {
            deed_id: object::id_to_address(&deed.id),
            commitment: private_commitment,
        });

        deed
    }

    /// Transfer a property deed to another address
    public fun transfer_deed(
        deed: PropertyDeed,
        to: address,
        ctx: &mut TxContext,
    ) {
        let from = deed.owner;
        let caller = tx_context::sender(ctx);
        
        // Verify caller is the owner
        assert!(caller == deed.owner, ERROR_NOT_OWNER);
        
        // Verify not transferring to self
        assert!(to != deed.owner, ERROR_SAME_ADDRESS);
        
        event::emit(DeedTransferred {
            from: from,
            to: to,
            deed_id: object::id_to_address(&deed.id),
        });

        transfer::transfer(deed, to);
    }

    /// Update the private data commitment for a deed
    public fun update_private_commitment(
        deed: &mut PropertyDeed,
        new_commitment: vector<u8>,
        ctx: &TxContext,
    ) {
        let caller = tx_context::sender(ctx);
        
        // Verify caller is the owner
        assert!(caller == deed.owner, ERROR_NOT_OWNER);
        
        // Validate commitment is not empty
        assert!(std::vector::length(&new_commitment) > 0, ERROR_INVALID_COMMITMENT);
        
        // Validate commitment is reasonable length (max 64 bytes for hash)
        assert!(std::vector::length(&new_commitment) <= MAX_COMMITMENT_LENGTH, ERROR_COMMITMENT_TOO_LONG);
        
        deed.private_commitment = new_commitment;
        event::emit(PrivateDataUpdated {
            deed_id: object::id_to_address(&deed.id),
            commitment: new_commitment,
        });
    }

    /// Burn (destroy) a property deed
    public fun burn(deed: PropertyDeed) {
        let PropertyDeed {
            id,
            property_id: _,
            metadata_uri: _,
            private_commitment: _,
            owner: _,
            minted_at: _,
        } = deed;
        object::delete(id);
    }

    // =========================================
    // Public View Functions
    // =========================================

    /// Get property deed details
    public fun get_property_info(
        deed: &PropertyDeed,
    ): (String, String, u64) {
        (deed.property_id, deed.metadata_uri, deed.minted_at)
    }

    /// Get the owner of a deed
    public fun get_owner(deed: &PropertyDeed): address {
        deed.owner
    }

    /// Get the metadata URI
    public fun get_metadata_uri(deed: &PropertyDeed): String {
        deed.metadata_uri
    }

    /// Get the private commitment (for ZK verification)
    public fun get_private_commitment(deed: &PropertyDeed): vector<u8> {
        deed.private_commitment
    }

    // =========================================
    // Internal Helper Functions
    // =========================================

    /// Get current timestamp (simplified - in production, use proper oracle)
    fun get_timestamp(_ctx: &TxContext): u64 {
        // This is a placeholder. In a real implementation, you'd use a timestamp oracle
        0
    }
}
