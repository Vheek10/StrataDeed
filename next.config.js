/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
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
	swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	transpilePackages: [
		"@rainbow-me/rainbowkit",
		"@wagmi/connectors",
		"@walletconnect/ethereum-provider",
		"@walletconnect/utils",
		"@walletconnect/logger",
		"@mantleio/sdk",
	],
};

module.exports = nextConfig;
