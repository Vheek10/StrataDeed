/** @format */
"use client";

import { useState } from "react";
import {
	Wallet,
	ChevronDown,
	Check,
	ExternalLink,
	Loader2,
	LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletInfo {
	address: string;
	ensName?: string;
	balance?: string;
	network?: string;
}

export default function ConnectWalletButton() {
	const [isConnecting, setIsConnecting] = useState(false);
	const [isConnected, setIsConnected] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

	// Mock wallet data - replace with actual wallet connection logic
	const mockWalletInfo: WalletInfo = {
		address: "0x742d35Cc6634C0532925a3b8B9C4A1d3F2a1B6c5",
		ensName: "user.eth",
		balance: "2.5 ETH",
		network: "Ethereum Mainnet",
	};

	const handleConnect = async () => {
		setIsConnecting(true);

		// Simulate wallet connection delay
		await new Promise((resolve) => setTimeout(resolve, 800));

		setIsConnected(true);
		setWalletInfo(mockWalletInfo);
		setIsConnecting(false);
	};

	const handleDisconnect = () => {
		setIsConnected(false);
		setWalletInfo(null);
		setIsDropdownOpen(false);
	};

	const formatAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	return (
		<div className="relative">
			{isConnected ? (
				// Connected state
				<div className="relative">
					<button
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className={cn(
							"flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-300 group",
							"bg-white hover:bg-gray-50 active:scale-[0.98]",
							"border-gray-200 hover:border-accent/30",
							"shadow-sm hover:shadow-md",
							// Responsive fixes for large screens
							"min-w-[220px] xl:min-w-[320px] xl:justify-between xl:gap-6 xl:px-6 xl:py-3",
						)}>
						{/* Wallet icon */}
						<div className="relative">
							<Wallet className="w-4 h-4 text-accent" />
							<div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white" />
						</div>

						{/* Address/ENS */}
						<div className="flex flex-col items-start xl:flex-row xl:items-center xl:gap-3 xl:w-full xl:justify-between">
							<span className="text-sm font-medium text-text xl:text-base xl:truncate">
								{walletInfo?.ensName ||
									formatAddress(walletInfo?.address || "")}
							</span>
							<span className="text-xs text-muted xl:text-sm xl:ml-2">
								{walletInfo?.balance}
							</span>
						</div>

						{/* Chevron */}
						<ChevronDown
							className={cn(
								"w-4 h-4 text-muted transition-transform duration-300",
								isDropdownOpen && "rotate-180",
							)}
						/>

						{/* Hover effect */}
						<div className="absolute inset-0 rounded-lg bg-linear-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</button>

					{/* Dropdown menu */}
					{isDropdownOpen && (
						<div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 z-50">
							<div className="p-4">
								{/* Wallet info section */}
								<div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg mb-3">
									<div className="w-10 h-10 bg-linear-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
										<Wallet className="w-5 h-5 text-accent" />
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-1">
											<span className="text-sm font-medium text-text truncate">
												{walletInfo?.ensName || "Connected Wallet"}
											</span>
											<Check className="w-3 h-3 text-green-500" />
										</div>
										<div className="text-xs text-muted truncate">
											{walletInfo?.address}
										</div>
										<div className="flex items-center gap-2 mt-1">
											<span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">
												{walletInfo?.network}
											</span>
											<span className="text-xs font-medium text-text">
												{walletInfo?.balance}
											</span>
										</div>
									</div>
								</div>

								{/* Menu items */}
								<div className="space-y-1">
									<button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-muted hover:text-text hover:bg-gray-50 rounded-lg transition-colors duration-200 group/item">
										<ExternalLink className="w-4 h-4" />
										<span>View on Explorer</span>
									</button>
									<button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-muted hover:text-text hover:bg-gray-50 rounded-lg transition-colors duration-200 group/item">
										<Wallet className="w-4 h-4" />
										<span>Switch Wallet</span>
									</button>
									<div className="h-px bg-gray-100 my-1" />
									<button
										onClick={handleDisconnect}
										className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 group/item">
										<LogOut className="w-4 h-4" />
										<span>Disconnect</span>
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			) : (
				// Connect button
				<button
					onClick={handleConnect}
					disabled={isConnecting}
					className={cn(
						"flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-300 group relative overflow-hidden",
						"bg-linear-to-r from-accent to-accent/90 hover:from-accent hover:to-accent",
						"border-accent/20",
						"text-white font-medium text-sm",
						"shadow-sm hover:shadow-lg hover:shadow-accent/20",
						"active:scale-[0.98]",
						"disabled:opacity-70 disabled:cursor-not-allowed",
					)}>
					{/* Loading spinner or wallet icon */}
					{isConnecting ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Wallet className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
					)}

					{/* Button text */}
					<span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>

					{/* Hover shine effect */}
					<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />

					{/* Ripple effect */}
					<div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
				</button>
			)}

			{/* Close dropdown when clicking outside */}
			{isDropdownOpen && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => setIsDropdownOpen(false)}
				/>
			)}
		</div>
	);
}
