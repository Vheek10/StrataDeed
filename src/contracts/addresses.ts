/** @format */

// Sui contract addresses - format: 0x + hex string
// Note: In Move, we use package IDs to reference published modules
export const STRATA_DEED_NFT_ADDRESS =
	process.env.NEXT_PUBLIC_STRATA_DEED_NFT_ADDRESS || "0x0"; // Sui testnet package ID

export const STRATA_DEED_RWA_ADDRESS =
	process.env.NEXT_PUBLIC_STRATA_DEED_RWA_ADDRESS || "0x0"; // Sui testnet package ID

// Network-specific addresses (on Sui, addresses are the same across networks)
export const CONTRACT_ADDRESSES = {
	testnet: {
		propertyNFT: STRATA_DEED_NFT_ADDRESS,
		rwa: STRATA_DEED_RWA_ADDRESS,
	},
	mainnet: {
		propertyNFT: process.env.NEXT_PUBLIC_MAINNET_NFT_ADDRESS || "0x0",
		rwa: process.env.NEXT_PUBLIC_MAINNET_RWA_ADDRESS || "0x0",
	},
};
