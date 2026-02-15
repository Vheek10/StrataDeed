/** @format */

import { SuiClient } from "@mysten/sui/client";
import { CURRENT_NETWORK } from "@/config/web3/chains";

// Sui RPC endpoints
const SUI_RPC_ENDPOINTS: Record<string, string> = {
	testnet: "https://fullnode.testnet.sui.io:443",
	mainnet: "https://fullnode.mainnet.sui.io:443",
	devnet: "https://fullnode.devnet.sui.io:443",
};

// Create Sui clients for different networks
export const suiTestnetClient = new SuiClient({
	url: SUI_RPC_ENDPOINTS.testnet,
});
export const suiMainnetClient = new SuiClient({
	url: SUI_RPC_ENDPOINTS.mainnet,
});
export const suiDevnetClient = new SuiClient({ url: SUI_RPC_ENDPOINTS.devnet });

// Get client for current network
export const getSuiClient = (network: string = CURRENT_NETWORK): SuiClient => {
	switch (network) {
		case "mainnet":
			return suiMainnetClient;
		case "devnet":
			return suiDevnetClient;
		case "testnet":
		default:
			return suiTestnetClient;
	}
};
