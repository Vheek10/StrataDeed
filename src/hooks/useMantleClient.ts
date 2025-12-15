/** @format */

"use client";

import { useChainId, usePublicClient, useWalletClient } from "wagmi";
import { getPublicClient } from "@/config/web3/clients";

export function useMantleClient() {
	const chainId = useChainId();
	const { data: walletClient } = useWalletClient();

	// Wagmi's default public client (not necessarily Mantle)
	const publicClient = usePublicClient();

	// Our Mantle-aware client mapped by chainId
	const mantlePublicClient = getPublicClient(chainId);

	const isMantle = chainId === 5000 || chainId === 5003;

	return {
		chainId,
		publicClient: mantlePublicClient ?? publicClient, // fallback if not mapped
		walletClient,
		isConnected: !!walletClient,
		isMantleNetwork: isMantle,
		isMainnet: chainId === 5000,
		isTestnet: chainId === 5003,
	};
}
