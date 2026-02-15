<!-- @format -->

# Mint Page Smart Contract Alignment

## Overview

This document details the changes made to align the frontend minting functionality with the actual Sui Move smart contract APIs. The previous implementation used deprecated APIs and called non-existent functions.

## Changes Made

### 1. Updated Tokenization Library (`src/lib/sui/tokenization.ts`)

#### Before:

```typescript
// Used deprecated executeMoveCall API
const tx = await client.executeMoveCall({
	packageObjectId: PROPERTY_PACKAGE_ID,
	module: "property_tokenization", // ❌ Wrong module
	function: "mint_property", // ❌ Wrong function
	arguments: [propertyId, metadataUrl, privateCommitment, ownerAddress],
	sender: walletAddress,
	gasBudget: 50_000_000,
});
```

#### After:

```typescript
// Uses modern Transaction Block API
import { Transaction } from "@mysten/sui/transactions";

export async function mintPropertyDeedOnSui(
	client: SuiClient,
	walletAddress: string,
	{ propertyId, metadataUri, privateCommitment, ownerAddress },
) {
	const tx = new Transaction();

	// Convert commitment string to vector<u8>
	const commitmentBytes = Array.from(
		new TextEncoder().encode(privateCommitment),
	);

	// Calls: property_nft::mint_property_deed (✅ CORRECT)
	tx.moveCall({
		target: `${PROPERTY_NFT_PACKAGE_ID}::property_nft::mint_property_deed`,
		arguments: [
			tx.pure.string(propertyId),
			tx.pure.string(metadataUri),
			tx.pure.vector("u8", commitmentBytes),
			tx.pure.address(ownerAddress),
		],
	});

	tx.setSender(walletAddress);
	return tx;
}
```

**Key Improvements:**

- ✅ Uses Transaction Block API (Sui SDK v1.0+)
- ✅ Targets correct module: `property_nft`
- ✅ Calls correct function: `mint_property_deed`
- ✅ Proper type encoding for Move function arguments
- ✅ Returns transaction object for wallet signing

#### Additional Functions Added:

**RWA Token Minting:**

```typescript
export async function mintRWATokenOnSui(
	client: SuiClient,
	walletAddress: string,
	{ propertyId, tokens, ownerAddress },
) {
	const tx = new Transaction();

	tx.moveCall({
		target: `${PROPERTY_RWA_PACKAGE_ID}::property_rwa::mint_rwa_token`,
		arguments: [
			tx.pure.string(propertyId),
			tx.pure.u64(tokens),
			tx.pure.address(ownerAddress),
		],
	});

	tx.setSender(walletAddress);
	return tx;
}
```

**Treasury Creation:**

```typescript
export async function createTreasuryOnSui(
	client: SuiClient,
	walletAddress: string,
	fundingCap: number,
) {
	const tx = new Transaction();

	tx.moveCall({
		target: `${PROPERTY_RWA_PACKAGE_ID}::property_rwa::create_treasury`,
		arguments: [tx.pure.u64(fundingCap)],
	});

	tx.setSender(walletAddress);
	return tx;
}
```

### 2. Updated Tokenization Hook (`src/hooks/useTokenization.ts`)

#### Before:

```typescript
const result = await tokenizePropertyOnSui(client, address, {
	propertyId,
	metadataUrl: metadataURI,
	privateCommitment,
	ownerAddress: owner,
	mintFee,
});
```

#### After:

```typescript
// Build transaction
const transaction = await mintPropertyDeedOnSui(client, address, {
	propertyId,
	metadataUri: metadataURI,
	privateCommitment,
	ownerAddress: owner,
});

// Sign and execute using Suiet wallet
const result = await signAndExecuteTransaction({
	transaction,
});

const digest = result.digest;
setTxDigest(digest);

return {
	success: true,
	hash: digest,
	message: "Sui transaction submitted successfully",
};
```

**Key Improvements:**

- ✅ Uses Suiet wallet's `signAndExecuteTransaction` method
- ✅ Proper transaction building with Transaction Block API
- ✅ Returns transaction digest for tracking
- ✅ Better error handling with user-friendly messages
- ✅ Input validation before transaction submission

### 3. Updated Mint Page (`src/app/mint/page.tsx`)

#### Before:

```typescript
// ❌ Cryptographically weak ID generation
const propertyId = `PROP-${Date.now()}-${Math.random()
	.toString(36)
	.substr(2, 9)}`;

console.log("Calling tokenizeProperty hook...");
const result = await tokenizeProperty(
	propertyId,
	metadataURI,
	"0",
	privateCommitment,
	address,
);
```

#### After:

```typescript
// ✅ Secure ID generation using Web Crypto API
const generateSecurePropertyId = (): string => {
	const timestamp = Date.now();
	const randomBytes = new Uint8Array(16);
	crypto.getRandomValues(randomBytes);
	const randomHex = Array.from(randomBytes)
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return `PROP-${timestamp}-${randomHex}`;
};

const propertyId = generateSecurePropertyId();

console.log("Minting Property Deed NFT on Sui...", {
	propertyId,
	metadataLength: metadataURI.length,
});

// Call Contract for NFT Minting (property_nft::mint_property_deed)
const result = await tokenizeProperty(
	propertyId,
	metadataURI,
	"0",
	privateCommitment,
	address,
);
```

**Key Improvements:**

- ✅ **Security Fix**: Uses `crypto.getRandomValues()` for cryptographically secure random bytes
- ✅ Generates 16 bytes (128 bits) of entropy
- ✅ Property ID format: `PROP-{timestamp}-{32-char-hex}`
- ✅ Prevents property ID collisions
- ✅ Better logging with relevant context

### 4. Updated StrataDeed Hook (`src/hooks/useStrataDeed.ts`)

#### Before:

```typescript
/**
 * Deploys Move contracts to Sui blockchain.
 */
const deployStrataDeed = async (fundingCap: string, ownerAddress: string) => {
	// Simulate deployment
	await new Promise((r) => setTimeout(r, 800));
	const mockDigest = `sui_${Date.now().toString(16)}`;
	return mockDigest;
};
```

#### After:

```typescript
/**
 * Creates an RWA Treasury for managing escrow and token distribution
 * Calls: property_rwa::create_treasury
 */
const deployStrataDeed = async (fundingCap: string, ownerAddress: string) => {
	console.log("Creating RWA Treasury on Sui...", {
		fundingCap,
		ownerAddress,
	});

	// Note: This requires the property_rwa package to be deployed
	// and PROPERTY_RWA_PACKAGE_ID to be set in environment
	console.warn(
		"Treasury creation simulated - deploy Move contracts and set PROPERTY_RWA_PACKAGE_ID",
	);

	await new Promise((r) => setTimeout(r, 800));
	const mockDigest = `treasury_${Date.now().toString(16)}`;
	return mockDigest;

	// Uncomment when contracts are deployed:
	// import { createTreasuryOnSui } from "@/lib/sui/tokenization";
	// import { createSuiClient } from "@/lib/sui/client";
	// const client = createSuiClient();
	// const tx = await createTreasuryOnSui(client, ownerAddress, parseInt(fundingCap));
	// const result = await signAndExecuteTransaction({ transaction: tx });
	// return result.digest;
};
```

**Key Improvements:**

- ✅ Clear documentation of actual function purpose (treasury creation)
- ✅ Explains dependency on deployed contracts
- ✅ Provides implementation code for when contracts are deployed
- ✅ Better mock digest format (`treasury_` prefix)
- ✅ Warns developers about mock mode

## Smart Contract Function Mappings

### Property NFT Module (`property_nft::mint_property_deed`)

**Smart Contract Signature:**

```move
public fun mint_property_deed(
    property_id: String,
    metadata_uri: String,
    private_commitment: vector<u8>,
    to: address,
    ctx: &mut TxContext,
): PropertyDeed
```

**Frontend Call:**

```typescript
tx.moveCall({
	target: `${PROPERTY_NFT_PACKAGE_ID}::property_nft::mint_property_deed`,
	arguments: [
		tx.pure.string(propertyId), // property_id
		tx.pure.string(metadataUri), // metadata_uri
		tx.pure.vector("u8", commitmentBytes), // private_commitment
		tx.pure.address(ownerAddress), // to
	],
});
```

**Returns:** `PropertyDeed` NFT object transferred to recipient address

### Property RWA Module (`property_rwa::mint_rwa_token`)

**Smart Contract Signature:**

```move
public fun mint_rwa_token(
    property_id: String,
    tokens: u64,
    to: address,
    ctx: &mut TxContext,
): RWAToken
```

**Frontend Call:**

```typescript
tx.moveCall({
	target: `${PROPERTY_RWA_PACKAGE_ID}::property_rwa::mint_rwa_token`,
	arguments: [
		tx.pure.string(propertyId), // property_id
		tx.pure.u64(tokens), // tokens
		tx.pure.address(ownerAddress), // to
	],
});
```

**Returns:** `RWAToken` object representing fractional ownership

### Property RWA Module (`property_rwa::create_treasury`)

**Smart Contract Signature:**

```move
public fun create_treasury(
    funding_cap: u64,
    ctx: &mut TxContext,
): (RWATreasury, TreasuryAdminCap)
```

**Frontend Call:**

```typescript
tx.moveCall({
	target: `${PROPERTY_RWA_PACKAGE_ID}::property_rwa::create_treasury`,
	arguments: [
		tx.pure.u64(fundingCap), // funding_cap
	],
});
```

**Returns:** Tuple of `(RWATreasury, TreasuryAdminCap)` - shared treasury object and admin capability

## Configuration Requirements

### Environment Variables Needed

Create `.env.local` with the following after deploying Move contracts:

```bash
# Sui Network Configuration
NEXT_PUBLIC_SUI_NETWORK=testnet

# Move Package IDs (get these from deployment output)
NEXT_PUBLIC_PROPERTY_PACKAGE_ID=0x...
NEXT_PUBLIC_PROPERTY_NFT_PACKAGE_ID=0x...
NEXT_PUBLIC_PROPERTY_RWA_PACKAGE_ID=0x...

# Admin Capabilities (get these from deployment output)
NEXT_PUBLIC_ADMIN_CAP_PROPERTY=0x...
NEXT_PUBLIC_ADMIN_CAP_PROPERTY_NFT=0x...
NEXT_PUBLIC_TREASURY_ADMIN_CAP=0x...

# Gas Configuration
NEXT_PUBLIC_SUI_GAS_BUDGET=50000000
```

### Deployment Steps

1. **Build Move Contracts:**

   ```bash
   cd move/stratadeed
   sui move build
   ```

2. **Deploy to Sui Testnet:**

   ```bash
   sui client publish --gas-budget 100000000
   ```

3. **Copy Package IDs:**
   - Look for "Published Objects" in deployment output
   - Copy package IDs for each module
   - Copy admin capability object IDs

4. **Update `.env.local`:**
   - Paste package IDs into environment variables
   - Paste admin capability IDs

5. **Restart Development Server:**
   ```bash
   npm run dev
   ```

## Testing Checklist

### Before Deployment Test (Current State)

- [x] TypeScript compilation passes
- [x] No import errors
- [x] Secure property ID generation works
- [x] Transaction building returns correct structure
- [ ] Mock mode provides feedback to users

### After Deployment Test

- [ ] Connect Suiet wallet on testnet
- [ ] Fill out property mint form
- [ ] Submit and sign transaction
- [ ] Verify PropertyDeed NFT appears in wallet
- [ ] Check transaction on Sui Explorer
- [ ] Test RWA token minting (if tokenization enabled)
- [ ] Verify treasury creation works
- [ ] Test error handling (insufficient gas, rejection, etc.)

## User Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│ 1. User fills property details form                │
│    - Title, location, valuation, etc.              │
│    - Uploads property documents                     │
│    - Optionally enables tokenization                │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 2. Frontend generates secure property ID            │
│    - Uses crypto.getRandomValues()                  │
│    - Format: PROP-{timestamp}-{32-char-hex}         │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 3. Frontend creates ZK commitment                   │
│    - Hashes private data (valuation, files)         │
│    - Stores commitment on-chain                     │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 4. Frontend encodes metadata to Base64              │
│    - Or uploads to IPFS (future enhancement)        │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 5. Build Sui transaction (mintPropertyDeedOnSui)    │
│    - Calls: property_nft::mint_property_deed        │
│    - Arguments: propertyId, metadataUri,            │
│      privateCommitment, ownerAddress                │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 6. User signs transaction with Suiet wallet         │
│    - Wallet shows gas estimation                    │
│    - User approves or rejects                       │
└──────────────────┬──────────────────────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
    ┌─────────┐         ┌─────────┐
    │ Success │         │ Failure │
    └────┬────┘         └────┬────┘
         │                   │
         │                   └───► Show error message
         │
         ▼
┌─────────────────────────────────────────────────────┐
│ 7. PropertyDeed NFT minted on Sui                   │
│    - NFT transferred to user's wallet               │
│    - Transaction digest returned                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ (if tokenization enabled)
                   ▼
┌─────────────────────────────────────────────────────┐
│ 8. Create RWA Treasury (createTreasuryOnSui)        │
│    - Calls: property_rwa::create_treasury           │
│    - Arguments: fundingCap                          │
│    - Returns: RWATreasury + Admin Capability        │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 9. Display success message with transaction links   │
│    - Link to Sui Explorer                           │
│    - Show NFT in user's wallet                      │
│    - Redirect to dashboard/vault                    │
└─────────────────────────────────────────────────────┘
```

## Error Handling

### Common Errors and Solutions

| Error                                    | Cause                                 | Solution                               |
| ---------------------------------------- | ------------------------------------- | -------------------------------------- |
| "Wallet not connected"                   | User hasn't connected Suiet wallet    | Display connection prompt              |
| "Property ID cannot be empty"            | Form validation failed                | Show field error                       |
| "PROPERTY_NFT_PACKAGE_ID not configured" | Contracts not deployed                | Show deployment instructions           |
| "Insufficient gas"                       | User's wallet has low SUI balance     | Prompt to add SUI to wallet            |
| "Transaction rejected by user"           | User declined in wallet               | Allow retry                            |
| "Module not found"                       | Wrong package ID configured           | Verify package IDs in `.env.local`     |
| "Function not found"                     | Smart contract function name mismatch | Verify contract deployment             |
| "Type mismatch"                          | Incorrect argument types              | Check argument encoding in transaction |

## Security Improvements

### 1. Property ID Generation

- **Before:** Used `Math.random()` which is predictable
- **After:** Uses `crypto.getRandomValues()` for cryptographically secure randomness
- **Impact:** Prevents property ID prediction/collision attacks

### 2. Input Validation

- Validates property ID is not empty
- Validates metadata URI exists
- Validates private commitment is provided
- Checks wallet connection before transaction

### 3. ZK Commitment

- Hashes private data (valuation, file hashes) on client side
- Stores only commitment hash on-chain
- Preserves privacy while enabling verification
- Uses Keccak-256 for commitment generation

## Next Steps

### Immediate (Before Production)

1. ✅ Update frontend code to use Transaction Block API
2. ✅ Fix function names to match smart contracts
3. ✅ Implement secure property ID generation
4. ⏳ Deploy Move contracts to Sui testnet
5. ⏳ Configure package IDs in environment variables
6. ⏳ End-to-end testing on testnet

### Future Enhancements

- [ ] Upload metadata to IPFS instead of Base64 encoding
- [ ] Add property image upload to IPFS/Arweave
- [ ] Implement property verification workflow (admin approval)
- [ ] Add escrow deposit functionality for RWA tokens
- [ ] Implement yield distribution UI
- [ ] Add property deed transfer functionality
- [ ] Create admin panel for property management
- [ ] Add analytics dashboard for minted properties

## File Changes Summary

| File                           | Status            | Changes                                                                |
| ------------------------------ | ----------------- | ---------------------------------------------------------------------- |
| `src/lib/sui/tokenization.ts`  | ✅ Updated        | Replaced deprecated API with Transaction Blocks, added 3 new functions |
| `src/hooks/useTokenization.ts` | ✅ Updated        | Uses new API, better error handling, proper wallet integration         |
| `src/hooks/useStrataDeed.ts`   | ✅ Updated        | Clarified purpose, added deployment instructions                       |
| `src/app/mint/page.tsx`        | ✅ Updated        | Secure property ID generation, better logging                          |
| `src/config/contracts.ts`      | ✅ Already Fixed  | Contains proper package IDs and module names                           |
| `.env.local`                   | ⚠️ Needs Creation | Must be created after contract deployment                              |

## Conclusion

The mint page is now properly aligned with the Sui Move smart contracts:

✅ **Correct Module Names**: `property_nft`, `property_rwa`  
✅ **Correct Function Names**: `mint_property_deed`, `mint_rwa_token`, `create_treasury`  
✅ **Modern Sui SDK**: Transaction Block API (v1.0+)  
✅ **Secure Randomness**: `crypto.getRandomValues()`  
✅ **Proper Type Encoding**: `tx.pure.string()`, `tx.pure.u64()`, etc.  
✅ **Error Handling**: User-friendly error messages  
✅ **Wallet Integration**: Suiet wallet signing

**Status**: Ready for contract deployment and testing on Sui testnet.
