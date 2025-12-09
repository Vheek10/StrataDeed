/** @format */

"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
	Wallet,
	CheckCircle,
	AlertCircle,
	ChevronDown,
	ExternalLink,
	LogOut,
} from "lucide-react";

export function WalletConnectButton() {
	const { isConnected, address } = useAccount();
	const chainId = useChainId();
	const router = useRouter();

	// Redirect to dashboard when wallet connects
	useEffect(() => {
		if (isConnected) {
			// Small delay to ensure wallet is fully connected
			const timer = setTimeout(() => {
				router.push("/dashboard");
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [isConnected, router]);

	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				authenticationStatus,
				mounted,
			}) => {
				const ready = mounted && authenticationStatus !== "loading";
				const connected =
					ready &&
					account &&
					chain &&
					(!authenticationStatus || authenticationStatus === "authenticated");

				if (!ready) {
					return (
						<div className="w-40 h-10 bg-gray-800 rounded-lg animate-pulse" />
					);
				}

				if (!connected) {
					return (
						<button
							onClick={openConnectModal}
							type="button"
							className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden">
							{/* Shine effect */}
							<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

							<div className="relative flex items-center justify-center gap-2">
								<Wallet className="w-5 h-5 group-hover:scale-110 transition-transform" />
								<span className="text-sm font-bold tracking-wide">
									Connect Wallet
								</span>
								<ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						</button>
					);
				}

				if (chain.unsupported) {
					return (
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-800/50 text-red-400 rounded-lg backdrop-blur-sm">
								<AlertCircle className="w-4 h-4" />
								<span className="text-sm font-medium">Wrong Network</span>
							</div>
							<button
								onClick={openChainModal}
								type="button"
								className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
								Switch Network
							</button>
						</div>
					);
				}

				return (
					<div className="flex items-center gap-3">
						{/* Network Badge */}
						<button
							onClick={openChainModal}
							type="button"
							className="group relative px-4 py-2 bg-gray-900/50 border border-gray-800 text-gray-300 rounded-lg hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm">
							<div className="flex items-center gap-2">
								{chain.hasIcon && (
									<div
										className="w-5 h-5 rounded-full overflow-hidden"
										style={{
											background: chain.iconBackground,
										}}>
										{chain.iconUrl && (
											<img
												alt={chain.name ?? "Chain icon"}
												src={chain.iconUrl}
												className="w-full h-full"
											/>
										)}
									</div>
								)}
								<span className="text-sm font-medium">{chain.name}</span>
								<ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-400" />
							</div>
						</button>

						{/* Wallet Address */}
						<button
							onClick={openAccountModal}
							type="button"
							className="group relative px-4 py-2 bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-800/50 text-emerald-400 rounded-lg hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 backdrop-blur-sm">
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-2">
									<CheckCircle className="w-4 h-4 text-emerald-400" />
									<span className="text-sm font-medium">
										{account.displayName}
									</span>
								</div>
								<ChevronDown className="w-4 h-4 text-emerald-500/50 group-hover:text-emerald-400" />
							</div>
						</button>

						{/* Disconnect Button */}
						<button
							onClick={openAccountModal}
							type="button"
							className="p-2 bg-red-900/20 border border-red-800/30 text-red-400 rounded-lg hover:bg-red-800/30 hover:border-red-700/40 transition-colors"
							title="Disconnect">
							<LogOut className="w-4 h-4" />
						</button>
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
}
