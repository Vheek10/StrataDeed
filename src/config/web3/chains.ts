/** @format */

// Sui network configuration for testnet and mainnet
// These are defined by Sui and used by the Sui SDK

export const SUI_NETWORKS = {
	testnet: "testnet",
	mainnet: "mainnet",
	devnet: "devnet",
};

export const CURRENT_NETWORK = process.env.NEXT_PUBLIC_NETWORK || "testnet";
