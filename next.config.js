/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	reactStrictMode: true,
	// Explicitly disable Turbopack to use webpack
	experimental: {
		// Remove or set to false to disable Turbopack
		turbo: false, // or remove this line entirely
	},

	swcMinify: true, // Keep SWC minification

	// Add image configuration for external domains
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			// Add other image domains here if needed
			// {
			// 	protocol: 'https',
			// 	hostname: 'example.com',
			// },
		],
	},

	webpack: (config, { isServer, dev }) => {
		// Client-specific configurations
		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				path: false,
				os: false,
				crypto: false,
				stream: false,
				http: false,
				https: false,
				zlib: false,
				net: false,
				tls: false,
				child_process: false,
				worker_threads: false,
			};

			// Use IgnorePlugin to completely ignore problematic packages
			const webpack = require("webpack");
			config.plugins.push(
				new webpack.IgnorePlugin({
					resourceRegExp: /^thread-stream$/,
					contextRegExp: /node_modules/,
				}),
			);
		}

		// Exclude test files from all packages
		config.module.rules.push({
			test: /\.(test|spec)\.(js|ts|mjs)$/,
			use: "ignore-loader",
		});

		// Exclude specific problematic directories
		config.module.rules.push({
			test: /[\\/](test|__tests__|tests|bench|benchmark)[\\/]/,
			use: "ignore-loader",
		});

		// Specifically ignore thread-stream test files
		config.module.rules.push({
			test: /[\\/]thread-stream[\\/].*[\\/]test[\\/]/,
			use: "ignore-loader",
		});

		// Also ignore markdown, license, and other non-js files
		config.module.rules.push({
			test: /\.(md|yml|sh|zip)$/,
			use: "ignore-loader",
		});

		return config;
	},
};

module.exports = nextConfig;