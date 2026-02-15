/** @format */

/**
 * Centralized configuration for Sui Move Smart Contracts.
 *
 * Move Contracts Location: move/stratadeed/sources/
 * - property.move: Core property tokenization
 * - property_nft.move: NFT deed representation
 * - property_rwa.move: RWA treasury and escrow management
 */

// Sui Network Configuration
export const SUI_NETWORK = process.env.NEXT_PUBLIC_SUI_NETWORK || "testnet";

// Sui Move Package Addresses (set after deployment)
// These should be set in your .env.local file after deploying to Sui
export const PROPERTY_PACKAGE_ID =
	process.env.NEXT_PUBLIC_PROPERTY_PACKAGE_ID || "";
export const PROPERTY_NFT_PACKAGE_ID =
	process.env.NEXT_PUBLIC_PROPERTY_NFT_PACKAGE_ID || "";
export const PROPERTY_RWA_PACKAGE_ID =
	process.env.NEXT_PUBLIC_PROPERTY_RWA_PACKAGE_ID || "";

// Module Names - correspond to Move module declarations
export const MODULES = {
	PROPERTY: "property",
	PROPERTY_NFT: "property_nft",
	PROPERTY_RWA: "property_rwa",
} as const;

// Admin Capability Object IDs (set after deployment)
export const ADMIN_CAP_PROPERTY =
	process.env.NEXT_PUBLIC_ADMIN_CAP_PROPERTY || "";
export const ADMIN_CAP_PROPERTY_NFT =
	process.env.NEXT_PUBLIC_ADMIN_CAP_PROPERTY_NFT || "";
export const TREASURY_ADMIN_CAP =
	process.env.NEXT_PUBLIC_TREASURY_ADMIN_CAP || "";

/**
 * Sui Move Contract Configuration
 * Use this for actual Sui blockchain interactions
 */
export const SUI_CONTRACTS = {
	network: SUI_NETWORK,
	packages: {
		property: PROPERTY_PACKAGE_ID,
		propertyNFT: PROPERTY_NFT_PACKAGE_ID,
		propertyRWA: PROPERTY_RWA_PACKAGE_ID,
	},
	modules: MODULES,
	adminCaps: {
		property: ADMIN_CAP_PROPERTY,
		propertyNFT: ADMIN_CAP_PROPERTY_NFT,
		treasuryAdmin: TREASURY_ADMIN_CAP,
	},
} as const;

// Helper to check if Move contracts are configured
export const isSuiContractsConfigured = () => {
	return !!(
		PROPERTY_PACKAGE_ID &&
		PROPERTY_NFT_PACKAGE_ID &&
		PROPERTY_RWA_PACKAGE_ID
	);
};
