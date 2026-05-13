/** @format */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Users,
	TrendingUp,
	MapPin,
	DollarSign,
	Target,
	AlertCircle,
	ArrowRight,
} from "lucide-react";
import { InvestorProfile } from "@/types/agents";
import {
	useInvestorMatching,
	useInvestorMatchingFormatter,
} from "@/hooks/useInvestorMatching";
import { cn } from "@/lib/utils";
import { AgentHeader } from "./common/AgentHeader";
import { LoadingState } from "./common/LoadingState";
import { ReasoningDisplay } from "./common/ReasoningDisplay";
import { ConfidenceScore } from "./common/ConfidenceScore";

export default function InvestorMatchingAgent() {
	const agent = useInvestorMatching();
	const formatter = useInvestorMatchingFormatter();

	// Form state
	const [riskTolerance, setRiskTolerance] = useState<
		"conservative" | "moderate" | "aggressive"
	>("moderate");
	const [budget, setBudget] = useState("");
	const [investmentHorizon, setInvestmentHorizon] = useState<
		"short" | "medium" | "long"
	>("medium");
	const [desiredYieldTarget, setDesiredYieldTarget] = useState("");
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [excludeGeographies, setExcludeGeographies] = useState("");
	const [investmentPreferences, setInvestmentPreferences] = useState("");
	const [portfolioCompleteness, setPortfolioCompleteness] = useState<
		"diversified" | "concentrated"
	>("diversified");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const profile: InvestorProfile = {
			riskTolerance,
			budget: budget ? parseInt(budget) : 0,
			investmentHorizon,
			investmentPreferences: investmentPreferences
				?.split(",")
				.map((p) => p.trim())
				.filter(Boolean),
			excludeGeographies: excludeGeographies
				?.split(",")
				.map((g) => g.trim())
				.filter(Boolean),
			desiredYieldTarget: desiredYieldTarget
				? parseFloat(desiredYieldTarget)
				: undefined,
			portfolioCompleteness,
		};

		await agent.analyze(profile);
	};

	return (
		<div className="min-h-screen bg-white pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
				{/* Header */}
				<AgentHeader
					icon={<Users className="w-6 h-6 lg:w-7 lg:h-7" />}
					title="Investor Property Matcher"
					description="AI-powered intelligent matching of investment opportunities aligned with your financial goals"
					badge="Live"
				/>

				{/* Main Grid */}
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-16 md:mt-24">
					{/* Left: Form */}
					<motion.form
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						onSubmit={handleSubmit}
						className="lg:sticky lg:top-32 space-y-6">
						<div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl lg:rounded-3xl p-8 lg:p-10 border border-blue-100/50 shadow-sm">
							{/* Risk Tolerance */}
							<div className="space-y-3 mb-8">
								<label className="block text-sm font-bold text-gray-700 uppercase tracking-wide font-montserrat">
									Risk Tolerance <span className="text-red-500">*</span>
								</label>
								<select
									value={riskTolerance}
									onChange={(e) =>
										setRiskTolerance(
											e.target.value as
												| "conservative"
												| "moderate"
												| "aggressive",
										)
									}
									className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
									<option value="conservative">Conservative</option>
									<option value="moderate">Moderate</option>
									<option value="aggressive">Aggressive</option>
								</select>
								<p className="text-xs text-gray-500 font-medium">
									Your preferred level of risk in property investments
								</p>
							</div>

							{/* Investment Budget */}
							<div className="space-y-3 mb-8">
								<label className="block text-sm font-bold text-gray-700 uppercase tracking-wide font-montserrat">
									Investment Budget (USD){" "}
									<span className="text-red-500">*</span>
								</label>
								<input
									type="number"
									placeholder="e.g., 250000"
									value={budget}
									onChange={(e) => setBudget(e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
								/>
								<p className="text-xs text-gray-500 font-medium">
									Total amount available to invest
								</p>
							</div>

							{/* Investment Horizon */}
							<div className="space-y-3 mb-8">
								<label className="block text-sm font-bold text-gray-700 uppercase tracking-wide font-montserrat">
									Investment Horizon <span className="text-red-500">*</span>
								</label>
								<select
									value={investmentHorizon}
									onChange={(e) =>
										setInvestmentHorizon(
											e.target.value as "short" | "medium" | "long",
										)
									}
									className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
									<option value="short">Short Term (1-3 years)</option>
									<option value="medium">Medium Term (3-7 years)</option>
									<option value="long">Long Term (7+ years)</option>
								</select>
							</div>

							{/* Desired Yield Target */}
							<div className="space-y-3 mb-8">
								<label className="block text-sm font-bold text-gray-700 uppercase tracking-wide font-montserrat">
									Target Annual Yield (%)
								</label>
								<input
									type="number"
									step="0.1"
									placeholder="e.g., 5.5"
									value={desiredYieldTarget}
									onChange={(e) => setDesiredYieldTarget(e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
								/>
								<p className="text-xs text-gray-500 font-medium">
									Desired annual return on investment
								</p>
							</div>

							{/* Advanced Options */}
							<button
								type="button"
								onClick={() => setShowAdvanced(!showAdvanced)}
								className="text-sm font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wide mb-6 transition-colors font-montserrat">
								{showAdvanced ? "Hide" : "Show"} Advanced Options
							</button>

							<AnimatePresence>
								{showAdvanced && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										className="space-y-6 pb-6 border-t border-blue-200/50 pt-6">
										{/* Portfolio Completeness */}
										<div className="space-y-3">
											<label className="block text-sm font-bold text-gray-700 uppercase tracking-wide font-montserrat">
												Portfolio Strategy
											</label>
											<select
												value={portfolioCompleteness}
												onChange={(e) =>
													setPortfolioCompleteness(
														e.target.value as "diversified" | "concentrated",
													)
												}
												className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
												<option value="diversified">Diversified</option>
												<option value="concentrated">Concentrated</option>
											</select>
											<p className="text-xs text-gray-500 font-medium">
												Whether to spread across many properties or focus on a
												few
											</p>
										</div>

										{/* Excluded Geographies */}
										<div className="space-y-3">
											<label className="block text-sm font-bold text-gray-700 uppercase tracking-wide font-montserrat">
												Exclude Regions
											</label>
											<input
												type="text"
												placeholder="e.g., Hawaii, Alaska (comma-separated)"
												value={excludeGeographies}
												onChange={(e) => setExcludeGeographies(e.target.value)}
												className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
											/>
											<p className="text-xs text-gray-500 font-medium">
												Regions where you do not want to invest
											</p>
										</div>

										{/* Investment Preferences */}
										<div className="space-y-3">
											<label className="block text-sm font-bold text-gray-700 uppercase tracking-wide font-montserrat">
												Investment Preferences
											</label>
											<input
												type="text"
												placeholder="e.g., residential, strong_yield, urban (comma-separated)"
												value={investmentPreferences}
												onChange={(e) =>
													setInvestmentPreferences(e.target.value)
												}
												className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
											/>
											<p className="text-xs text-gray-500 font-medium">
												Your investment style preferences (e.g., residential,
												commercial, rental_income, etc.)
											</p>
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							{/* Submit Button */}
							<motion.button
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								type="submit"
								disabled={agent.loading.isLoading || !budget}
								className={cn(
									"w-full px-8 py-4 rounded-full font-black text-white uppercase tracking-wide text-sm transition-all duration-300 flex items-center justify-center gap-3 font-montserrat",
									agent.loading.isLoading || !budget
										? "bg-gray-300 cursor-not-allowed"
										: "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-600/30",
								)}>
								<span>Find Matches</span>
								<ArrowRight className="w-4 h-4" />
							</motion.button>
						</div>
					</motion.form>

					{/* Right: Results */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="space-y-6">
						{/* Loading State */}
						{agent.loading.isLoading && (
							<LoadingState
								progress={agent.loading.progress}
								currentStep={agent.loading.currentStep}
								estimatedTimeMs={3000}
								variant="default"
							/>
						)}

						{/* Error State */}
						{agent.error && !agent.loading.isLoading && (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="bg-red-50 border border-red-200 rounded-2xl p-6 lg:p-8">
								<div className="flex gap-4">
									<AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
									<div>
										<h3 className="font-bold text-red-900 text-lg mb-2">
											Matching Failed
										</h3>
										<p className="text-red-700 text-sm mb-3">
											{agent.error.message}
										</p>
										{agent.error.details && (
											<p className="text-red-600 text-xs font-mono">
												{agent.error.details}
											</p>
										)}
										<button
											onClick={agent.reset}
											className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors">
											Try Again
										</button>
									</div>
								</div>
							</motion.div>
						)}

						{/* Results State */}
						{agent.result && !agent.loading.isLoading && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.6 }}
								className="space-y-6">
								{/* Summary Metrics */}
								<div className="grid grid-cols-2 gap-4">
									<motion.div
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.1 }}
										className="bg-blue-50 rounded-xl p-4 border border-blue-100">
										<p className="text-[10px] font-black text-blue-600 uppercase tracking-wide mb-1 font-montserrat">
											Matches Found
										</p>
										<p className="text-3xl font-black text-gray-900 font-mclaren">
											{agent.result.matches.length}
										</p>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.15 }}
										className="bg-cyan-50 rounded-xl p-4 border border-cyan-100">
										<p className="text-[10px] font-black text-cyan-600 uppercase tracking-wide mb-1 font-montserrat">
											Avg Fit Score
										</p>
										<p className="text-3xl font-black text-gray-900 font-mclaren">
											{agent.result.matches.length
												? (
														(agent.result.matches.reduce(
															(sum: number, p) => sum + p.fitScore,
															0,
														) /
															agent.result.matches.length) *
														100
													).toFixed(0)
												: "0"}
											%
										</p>
									</motion.div>
								</div>

								{/* Diversification & Opportunity */}
								<ConfidenceScore
									score={
										agent.result.matches.length > 0
											? Math.min(
													agent.result.matches.reduce(
														(sum: number, p) =>
															sum + (p.riskLevel === "low" ? 1 : 0),
														0,
													) / agent.result.matches.length,
													1,
												)
											: 0
									}
									label="Risk-Adjusted Opportunity"
									size="md"
									showPercentage={true}
								/>

								{/* Matched Properties */}
								<div className="space-y-3">
									<h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide font-montserrat">
										Top Matches
									</h3>
									{agent.result.matches.slice(0, 5).map((property, i) => (
										<motion.div
											key={i}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: i * 0.05 }}
											className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all">
											<div className="flex items-start justify-between mb-2">
												<h4 className="font-bold text-gray-900">
													{property.address}
												</h4>
												<span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full">
													{(property.fitScore * 100).toFixed(0)}%
												</span>
											</div>
											<div className="grid grid-cols-3 gap-2 text-xs text-gray-600 font-medium">
												<div className="flex items-center gap-1">
													<DollarSign className="w-3 h-3" />
													{formatter.formatCurrency(property.valuation)}
												</div>
												<div className="flex items-center gap-1">
													<TrendingUp className="w-3 h-3" />
													{property.expectedYield}%
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="w-3 h-3" />
													{property.address}
												</div>
											</div>
											<div className="mt-2 flex flex-wrap gap-1">
												{property.reasoning && (
													<span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded font-bold">
														{property.reasoning.substring(0, 100)}
														{property.reasoning.length > 100 ? "..." : ""}
													</span>
												)}
											</div>
										</motion.div>
									))}
								</div>

								{/* Metadata */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3 }}
									className="text-xs text-gray-400 font-medium flex justify-between">
									<span>Processing: {agent.processingTime}ms</span>
									<span>Tokens: {agent.tokensUsed}</span>
								</motion.div>

								{/* Action Buttons */}
								<div className="flex gap-3 pt-4 border-t border-gray-200">
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => agent.exportResult()}
										className="flex-1 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-100 transition-colors font-montserrat">
										Export Results
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => agent.saveToDraft()}
										className="flex-1 px-4 py-3 bg-gray-100 text-gray-900 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors font-montserrat">
										Save Draft
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={agent.reset}
										className="flex-1 px-4 py-3 bg-gray-100 text-gray-900 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors font-montserrat">
										New Analysis
									</motion.button>
								</div>
							</motion.div>
						)}

						{/* Empty State */}
						{!agent.result && !agent.loading.isLoading && !agent.error && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
								className="flex flex-col items-center justify-center py-16 text-center">
								<div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
									<Target className="w-8 h-8 text-blue-600" />
								</div>
								<h3 className="text-lg font-bold text-gray-900 mb-2">
									Ready to find your perfect properties?
								</h3>
								<p className="text-gray-500 text-sm max-w-xs">
									Fill in your investment profile and click "Find Matches" to
									discover properties tailored to your goals.
								</p>
							</motion.div>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
}
