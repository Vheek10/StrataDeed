/** @format */

"use client";

import { useSuiWallet } from "@/providers/suiet-provider";
import { DEFAULT_NETWORK } from "@/config/chains/mantle";

/**
 * Hook to get Sui client and wallet state.
 * Returns wallet connection info and network configuration.
 */
export function useSuiClient() {
	const { connected, wallet, address } = useSuiWallet();
	const isTestnet = DEFAULT_NETWORK === "testnet";
	const isMainnet = DEFAULT_NETWORK === "mainnet";

	return {
		isConnected: !!connected,
		wallet,
		address,
		network: DEFAULT_NETWORK,
		isTestnet,
		isMainnet,
	};
}

// Backwards compatibility export
export const useMantleClient = useSuiClient;
