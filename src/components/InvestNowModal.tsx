/** @format */

"use client";

import { useState, useEffect } from "react";
import {
	X,
	DollarSign,
	PieChart,
	Users,
	TrendingUp,
	Calendar,
	Shield,
	CheckCircle,
	CreditCard,
	Lock,
	AlertCircle,
	Info,
	Building,
	MapPin,
	Home,
} from "lucide-react";
import {
	useAccount,
	useWriteContract,
	useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { motion, AnimatePresence } from "framer-motion";

interface Property {
	id: number;
	title: string;
	description: string;
	location: string;
	price: number;
	bedrooms: number;
	bathrooms: number;
	squareFeet: number;
	capacity: number;
	views: number;
	isFeatured: boolean;
	country: string;
	createdAt: string;
	type: string;
	rating?: number;
	investmentReturn?: number;
}

interface InvestNowModalProps {
	isOpen: boolean;
	onClose: () => void;
	property: Property;
	imageUrl: string;
}

// Mock contract address and ABI for investment
const INVESTMENT_CONTRACT_ADDRESS =
	"0x4C7e8Cd47EE5782c948Ee65F0D93F4D4e27EF93C"; // Replace with actual contract address
const INVESTMENT_CONTRACT_ABI = [
	{
		name: "investInProperty",
		type: "function",
		inputs: [
			{ name: "propertyId", type: "uint256" },
			{ name: "amount", type: "uint256" },
		],
		outputs: [],
		stateMutability: "payable",
	},
] as const;

export default function InvestNowModal({
	isOpen,
	onClose,
	property,
	imageUrl,
}: InvestNowModalProps) {
	const { address, isConnected } = useAccount();
	const [investmentAmount, setInvestmentAmount] = useState<string>("");
	const [selectedTokens, setSelectedTokens] = useState<number>(0);
	const [step, setStep] = useState<"select" | "confirm" | "success">("select");
	const [error, setError] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);

	// Mock contract interaction
	const { data: hash, writeContract, isPending } = useWriteContract();
	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	// Calculate token price based on property valuation and token supply
	const tokenPrice = property.price / 1000; // Assuming 1000 tokens total
	const totalTokens = 1000; // Mock total token supply
	const availableTokens = 750; // Mock available tokens (75%)
	const minInvestment = tokenPrice * 10; // Minimum 10 tokens
	const maxInvestment = tokenPrice * 100; // Maximum 100 tokens per transaction

	// Calculate investment values
	const calculateTokens = (amount: number) => Math.floor(amount / tokenPrice);
	const calculateEquity = (tokens: number) =>
		((tokens / totalTokens) * 100).toFixed(2);
	const calculateEstReturn = (tokens: number) => {
		const annualReturn = property.investmentReturn || 8; // Default 8%
		return ((tokens * tokenPrice * annualReturn) / 100).toFixed(2);
	};

	// Handle investment amount input
	const handleAmountChange = (value: string) => {
		setError(null);
		const amount = parseFloat(value);
		if (isNaN(amount)) {
			setInvestmentAmount("");
			setSelectedTokens(0);
			return;
		}

		if (amount < minInvestment) {
			setError(
				`Minimum investment is $${minInvestment.toFixed(2)} (10 tokens)`,
			);
		} else if (amount > maxInvestment) {
			setError(
				`Maximum investment per transaction is $${maxInvestment.toFixed(
					2,
				)} (100 tokens)`,
			);
		} else if (amount > property.price) {
			setError("Investment cannot exceed property valuation");
		} else {
			setError(null);
		}

		setInvestmentAmount(value);
		setSelectedTokens(calculateTokens(amount));
	};

	// Handle token selection
	const handleTokenSelect = (tokens: number) => {
		setError(null);
		const amount = tokens * tokenPrice;

		if (tokens > availableTokens) {
			setError(`Only ${availableTokens} tokens available`);
			return;
		}

		setSelectedTokens(tokens);
		setInvestmentAmount(amount.toFixed(2));
	};

	// Handle investment submission
	const handleInvest = async () => {
		if (!isConnected || !address) {
			setError("Please connect your wallet to invest");
			return;
		}

		if (!investmentAmount || parseFloat(investmentAmount) < minInvestment) {
			setError(`Minimum investment is $${minInvestment.toFixed(2)}`);
			return;
		}

		setIsProcessing(true);
		setStep("confirm");

		try {
			// Mock transaction - replace with actual contract call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Example contract call (commented out for now)
			/*
      writeContract({
        address: INVESTMENT_CONTRACT_ADDRESS,
        abi: INVESTMENT_CONTRACT_ABI,
        functionName: 'investInProperty',
        args: [BigInt(property.id), parseEther(investmentAmount)],
        value: parseEther(investmentAmount),
      });
      */

			// Simulate successful transaction
			setStep("success");
		} catch (err) {
			setError("Transaction failed. Please try again.");
			setStep("select");
		} finally {
			setIsProcessing(false);
		}
	};

	// Reset form when modal closes
	useEffect(() => {
		if (!isOpen) {
			setTimeout(() => {
				setStep("select");
				setInvestmentAmount("");
				setSelectedTokens(0);
				setError(null);
				setIsProcessing(false);
			}, 300);
		}
	}, [isOpen]);

	// Close modal on escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [onClose]);

	// Token preset options
	const tokenPresets = [10, 25, 50, 100];

	// Format currency
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
					/>

					{/* Modal */}
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
							{/* Header */}
							<div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
										<TrendingUp className="w-5 h-5 text-white" />
									</div>
									<div>
										<h2 className="text-xl font-bold text-gray-900 dark:text-white">
											Invest in Property
										</h2>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											{property.title} • {property.location.split(",")[0]}
										</p>
									</div>
								</div>
								<button
									onClick={onClose}
									className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
									aria-label="Close modal">
									<X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
								</button>
							</div>

							{/* Content */}
							<div className="overflow-y-auto max-h-[calc(90vh-200px)]">
								<div className="p-6 space-y-6">
									{/* Property Overview */}
									<div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/30">
										<div className="flex items-start gap-4">
											<div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
												<img
													src={imageUrl}
													alt={property.title}
													className="w-full h-full object-cover"
												/>
											</div>
											<div className="flex-1 min-w-0">
												<h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
													{property.title}
												</h3>
												<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
													<MapPin className="w-3.5 h-3.5" />
													<span className="truncate">{property.location}</span>
												</div>
												<div className="grid grid-cols-3 gap-3">
													<div className="text-center">
														<div className="text-2xl font-bold text-gray-900 dark:text-white">
															{formatCurrency(property.price)}
														</div>
														<div className="text-xs text-gray-500 dark:text-gray-400">
															Valuation
														</div>
													</div>
													<div className="text-center">
														<div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
															{property.investmentReturn || 8}%
														</div>
														<div className="text-xs text-gray-500 dark:text-gray-400">
															Est. ROI
														</div>
													</div>
													<div className="text-center">
														<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
															{availableTokens}/{totalTokens}
														</div>
														<div className="text-xs text-gray-500 dark:text-gray-400">
															Tokens Available
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									{step === "select" && (
										<>
											{/* Token Quick Select */}
											<div className="space-y-3">
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
													Quick Select Tokens
												</label>
												<div className="grid grid-cols-4 gap-3">
													{tokenPresets.map((tokens) => (
														<button
															key={tokens}
															onClick={() => handleTokenSelect(tokens)}
															className={`p-4 rounded-xl border-2 transition-all ${
																selectedTokens === tokens
																	? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
																	: "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
															}`}>
															<div className="text-lg font-bold text-gray-900 dark:text-white">
																{tokens}
															</div>
															<div className="text-sm text-gray-500 dark:text-gray-400">
																Tokens
															</div>
															<div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
																${(tokens * tokenPrice).toFixed(0)}
															</div>
														</button>
													))}
												</div>
											</div>

											{/* Custom Investment */}
											<div className="space-y-3">
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
													Custom Investment Amount
												</label>
												<div className="relative">
													<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
														<DollarSign className="w-5 h-5 text-gray-400" />
													</div>
													<input
														type="number"
														value={investmentAmount}
														onChange={(e) => handleAmountChange(e.target.value)}
														className="w-full pl-10 pr-24 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
														placeholder="0.00"
														min={minInvestment}
														max={maxInvestment}
														step="0.01"
													/>
													<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
														<span className="text-gray-500 dark:text-gray-400">
															USD
														</span>
													</div>
												</div>
												<div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
													<span>Minimum: ${minInvestment.toFixed(2)}</span>
													<span>Maximum: ${maxInvestment.toFixed(2)}</span>
												</div>
											</div>

											{/* Investment Summary */}
											{selectedTokens > 0 && (
												<motion.div
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: "auto" }}
													className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-xl p-5 border border-emerald-100 dark:border-emerald-800/30">
													<h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
														<PieChart className="w-4 h-4" />
														Investment Summary
													</h4>
													<div className="grid grid-cols-2 gap-4">
														<div>
															<div className="text-sm text-gray-500 dark:text-gray-400">
																Tokens
															</div>
															<div className="text-xl font-bold text-gray-900 dark:text-white">
																{selectedTokens}
															</div>
														</div>
														<div>
															<div className="text-sm text-gray-500 dark:text-gray-400">
																Equity Stake
															</div>
															<div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
																{calculateEquity(selectedTokens)}%
															</div>
														</div>
														<div>
															<div className="text-sm text-gray-500 dark:text-gray-400">
																Token Price
															</div>
															<div className="text-xl font-bold text-gray-900 dark:text-white">
																${tokenPrice.toFixed(2)}
															</div>
														</div>
														<div>
															<div className="text-sm text-gray-500 dark:text-gray-400">
																Est. Annual Return
															</div>
															<div className="text-xl font-bold text-blue-600 dark:text-blue-400">
																${calculateEstReturn(selectedTokens)}
															</div>
														</div>
													</div>
												</motion.div>
											)}

											{/* Error Message */}
											{error && (
												<motion.div
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
													<AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
													<p className="text-sm text-red-700 dark:text-red-300">
														{error}
													</p>
												</motion.div>
											)}

											{/* Security Features */}
											<div className="space-y-3">
												<h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
													<Shield className="w-4 h-4" />
													Secure Investment
												</h4>
												<div className="grid grid-cols-3 gap-3">
													<div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
														<Lock className="w-3 h-3 text-blue-500" />
														<span className="text-xs text-gray-600 dark:text-gray-400">
															Escrow Protected
														</span>
													</div>
													<div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
														<CheckCircle className="w-3 h-3 text-emerald-500" />
														<span className="text-xs text-gray-600 dark:text-gray-400">
															Verified Property
														</span>
													</div>
													<div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
														<CreditCard className="w-3 h-3 text-purple-500" />
														<span className="text-xs text-gray-600 dark:text-gray-400">
															Instant Settlement
														</span>
													</div>
												</div>
											</div>
										</>
									)}

									{step === "confirm" && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="text-center space-y-6">
											<div className="w-20 h-20 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
												<CreditCard className="w-10 h-10 text-blue-600 dark:text-blue-400" />
											</div>
											<div>
												<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
													Confirm Your Investment
												</h3>
												<p className="text-gray-600 dark:text-gray-400">
													Please confirm the transaction in your wallet
												</p>
											</div>
											<div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
												<div className="flex justify-between">
													<span className="text-gray-600 dark:text-gray-400">
														Property
													</span>
													<span className="font-semibold text-gray-900 dark:text-white">
														{property.title}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600 dark:text-gray-400">
														Investment Amount
													</span>
													<span className="font-semibold text-gray-900 dark:text-white">
														${parseFloat(investmentAmount).toLocaleString()}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600 dark:text-gray-400">
														Tokens to Receive
													</span>
													<span className="font-semibold text-gray-900 dark:text-white">
														{selectedTokens}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600 dark:text-gray-400">
														Equity Stake
													</span>
													<span className="font-semibold text-emerald-600 dark:text-emerald-400">
														{calculateEquity(selectedTokens)}%
													</span>
												</div>
												<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
													<div className="flex justify-between">
														<span className="text-gray-600 dark:text-gray-400">
															Network Fee
														</span>
														<span className="font-semibold text-gray-900 dark:text-white">
															~$2.50
														</span>
													</div>
												</div>
											</div>
											{isProcessing && (
												<div className="flex items-center justify-center gap-3">
													<div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
													<span className="text-gray-600 dark:text-gray-400">
														Processing transaction...
													</span>
												</div>
											)}
										</motion.div>
									)}

									{step === "success" && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="text-center space-y-6">
											<div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
												<CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
											</div>
											<div>
												<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
													Investment Successful! 🎉
												</h3>
												<p className="text-gray-600 dark:text-gray-400">
													You now own {selectedTokens} tokens in{" "}
													{property.title}
												</p>
											</div>
											<div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-xl p-6 space-y-4">
												<div className="flex items-center justify-between">
													<span className="text-gray-600 dark:text-gray-400">
														Transaction Hash
													</span>
													<span className="font-mono text-sm text-blue-600 dark:text-blue-400">
														0x...{Math.random().toString(36).substr(2, 6)}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<span className="text-gray-600 dark:text-gray-400">
														Tokens Issued
													</span>
													<span className="font-bold text-gray-900 dark:text-white">
														{selectedTokens}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<span className="text-gray-600 dark:text-gray-400">
														Total Investment
													</span>
													<span className="font-bold text-gray-900 dark:text-white">
														${parseFloat(investmentAmount).toLocaleString()}
													</span>
												</div>
											</div>
											<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
												<div className="flex items-start gap-3">
													<Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
													<div className="text-left">
														<p className="text-sm text-gray-700 dark:text-gray-300">
															Your investment tokens will appear in your
															portfolio within a few minutes. You can view and
															manage your investment from the dashboard.
														</p>
													</div>
												</div>
											</div>
										</motion.div>
									)}
								</div>
							</div>

							{/* Footer */}
							<div className="border-t border-gray-100 dark:border-gray-800 p-6">
								{step === "select" && (
									<div className="flex gap-3">
										<button
											onClick={onClose}
											className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
											Cancel
										</button>
										<button
											onClick={handleInvest}
											disabled={!selectedTokens || !!error || isProcessing}
											className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
											{isProcessing ? (
												<>
													<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
													Processing...
												</>
											) : (
												<>
													<DollarSign className="w-4 h-4" />
													Invest Now
												</>
											)}
										</button>
									</div>
								)}

								{step === "confirm" && (
									<div className="text-center space-y-4">
										<button
											onClick={() => setStep("select")}
											className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
											← Back to Edit
										</button>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											Waiting for wallet confirmation...
										</p>
									</div>
								)}

								{step === "success" && (
									<div className="flex gap-3">
										<button
											onClick={onClose}
											className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
											Close
										</button>
										<button
											onClick={() => {
												onClose();
												// Navigate to portfolio page
												window.location.href = "/portfolio";
											}}
											className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-600 transition-all flex items-center justify-center gap-2">
											<TrendingUp className="w-4 h-4" />
											View Portfolio
										</button>
									</div>
								)}
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
