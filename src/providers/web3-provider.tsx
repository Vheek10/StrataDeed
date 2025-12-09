/** @format */

"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { config } from "@/config/web3/providers";

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider
					theme={darkTheme({
						accentColor: "#3b82f6", // blue-500
						accentColorForeground: "white",
						borderRadius: "medium",
						fontStack: "system",
						overlayBlur: "small",
					})}
					modalSize="compact">
					{mounted && children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
