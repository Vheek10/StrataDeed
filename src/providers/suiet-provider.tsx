/** @format */

"use client";

import * as React from "react";
import {
	AllDefaultWallets,
	WalletProvider,
	useWallet,
} from "@suiet/wallet-kit";

// @suiet/wallet-kit was written for React ≤18 and has multiple React 19
// incompatibilities (empty img src, legacy element.ref, missing list keys).
// React 19 calls console.error with format strings + substitution args, e.g.:
//   args[0] = 'An empty string ("") was passed to the %s attribute...'
//   args[1] = 'src'
// So we match on a substring that IS literally in args[0], not the substituted result.
if (typeof window !== "undefined") {
	const _consoleError = console.error.bind(console);
	console.error = (...args: unknown[]) => {
		const first = typeof args[0] === "string" ? args[0] : "";
		// Warning 1: empty img src — library renders wallet icons with empty iconUrl
		if (first.includes('An empty string ("") was passed to the')) return;
		// Warning 2: legacy element.ref access
		if (first.includes("Accessing element.ref was removed in React 19")) return;
		// Warning 3: missing key prop — library renders wallet list without keys
		if (first.includes('Each child in a list should have a unique "key" prop'))
			return;
		_consoleError(...args);
	};
}

export function SuietProvider({ children }: { children: React.ReactNode }) {
	// Restrict to Sui-native wallets only. Without this, @suiet/wallet-kit
	// auto-detects ALL browser extension wallets (including MetaMask), and
	// MetaMask throws "Failed to connect" when probed for a Sui connection
	// since it only speaks Ethereum.
	return (
		<WalletProvider defaultWallets={AllDefaultWallets}>
			{children}
		</WalletProvider>
	);
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
