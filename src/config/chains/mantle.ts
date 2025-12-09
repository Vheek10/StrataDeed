/** @format */

import { defineChain } from "viem";

export const mantleSepolia = defineChain({
	id: 5003,
	name: "Mantle Sepolia Testnet",
	nativeCurrency: {
		name: "Testnet Mantle",
		symbol: "MNT",
		decimals: 18,
	},
	rpcUrls: {
		default: {
			http: ["https://rpc.sepolia.mantle.xyz"],
			webSocket: ["wss://ws.sepolia.mantle.xyz"],
		},
		public: {
			http: ["https://rpc.sepolia.mantle.xyz"],
			webSocket: ["wss://ws.sepolia.mantle.xyz"],
		},
	},
	blockExplorers: {
		default: {
			name: "Mantle Sepolia Explorer",
			url: "https://sepolia.mantlescan.xyz",
		},
	},
	testnet: true,
	contracts: {
		multicall3: {
			address: "0xcA11bde05977b3631167028862bE2a173976CA11",
			blockCreated: 0,
		},
	},
});
