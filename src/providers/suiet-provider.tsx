/** @format */

"use client";

import * as React from "react";
import { WalletProvider, useWallet } from "@suiet/wallet-kit";

export function SuietProvider({ children }: { children: React.ReactNode }) {
	return <WalletProvider>{children}</WalletProvider>;
	// Optional: Add props later if needed, e.g.
	// return <WalletProvider defaultWallets={["Suiet", "Slush"]} theme="dark">{children}</WalletProvider>;
}

export function useSuiWallet() {
	const wallet = useWallet();

	return {
		...wallet, // Full access if you need advanced features
		address: wallet.account?.address ?? null, // null instead of undefined for clarity
		connected: wallet.connected,
		connecting: wallet.connecting,
		disconnect: wallet.disconnect,
		select: wallet.select, // Lets you programmatically select a wallet by name
	};
}
