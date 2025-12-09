/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
			{
				protocol: "https",
				hostname: "source.unsplash.com",
			},
		],
	},

	// 🚨 DISABLE TURBOPACK TO FIX BUILD ERRORS
	experimental: {
		turbo: false,
	},

	// Ignore TypeScript and ESLint errors during build
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},

	// Transpile problematic packages
	transpilePackages: [
		"@rainbow-me/rainbowkit",
		"@wagmi/connectors",
		"@walletconnect/ethereum-provider",
		"@walletconnect/utils",
		"@walletconnect/logger",
		"@mantleio/sdk",
	],

	// Webpack config for ignoring test files
	webpack: (config, { isServer }) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
			net: false,
			tls: false,
			crypto: false,
			stream: false,
			path: false,
		};

		// Ignore test files (only add if ignore-loader is available)
		try {
			const IgnoreLoader = require("ignore-loader");
			config.module.rules.push({
				test: /\.test\.(js|ts|mjs)$/,
				use: "ignore-loader",
			});

			config.module.rules.push({
				test: /\.(md|LICENSE)$/,
				use: "ignore-loader",
			});
		} catch (e) {
			// ignore-loader not available, use null-loader instead
			config.module.rules.push({
				test: /\.test\.(js|ts|mjs)$/,
				use: "null-loader",
			});
		}

		return config;
	},
};

export default nextConfig;
