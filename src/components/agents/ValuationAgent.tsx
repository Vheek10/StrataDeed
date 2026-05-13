/** @format */

/**
 * ValuationAgent Component
 * Property Valuation & Analysis Agent UI
 */

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Building2,
	MapPin,
	Ruler,
	Home,
	DollarSign,
	AlertCircle,
	ArrowUpRight,
	Download,
	RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
	useValuationAgent,
	useValuationFormatter,
} from "@/hooks/useValuationAgent";
import { AgentHeader } from "./common/AgentHeader";
import { LoadingState, ResultSkeleton } from "./common/LoadingState";
import { ReasoningDisplay } from "./common/ReasoningDisplay";
import {
	ConfidenceScore,
	RiskScore,
	MultiScore,
} from "./common/ConfidenceScore";
import { ValuationRequest } from "@/types/agents";

interface ValuationAgentProps {
	initialAddress?: string;
	onSuccess?: () => void;
}

export const ValuationAgent: React.FC<ValuationAgentProps> = ({
	initialAddress,
	onSuccess,
}) => {
	// Agent state
	const agent = useValuationAgent();
	const formatter = useValuationFormatter(agent.result);

	// Form state
	const [formData, setFormData] = useState<ValuationRequest>({
		propertyAddress: initialAddress || "",
		propertyType: "residential",
		condition: "good",
	});
	const [showAdvanced, setShowAdvanced] = useState(false);

	/**
	 * Handle form submission
	 */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await agent.analyze(formData);
		onSuccess?.();
	};

	/**
	 * Handle form input changes
	 */
	const handleInputChange = (field: keyof ValuationRequest, value: any) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<div className="min-h-screen bg-white py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<AgentHeader
					title="Property Valuation"
					description="AI-powered property analysis with market valuation, risk assessment, and investment rating"
					icon={<Building2 className="w-6 h-6 lg:w-7 lg:h-7" />}
					badge="Agent v1.0"
				/>

				{/* Main Content */}
				<div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
					{/* Input Form */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}>
						<form
							onSubmit={handleSubmit}
							className="bg-white sticky top-24">
							<div className="space-y-6">
								{/* Property Address */}
								<div>
									<label className="block text-sm font-black uppercase text-gray-400 tracking-widest mb-2 font-montserrat">
										Property Address *
									</label>
									<div className="relative">
										<MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
										<input
											type="text"
											placeholder="123 Main St, Los Angeles, CA"
											value={formData.propertyAddress}
											onChange={(e) =>
												handleInputChange("propertyAddress", e.target.value)
											}
											required
											className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-montserrat"
										/>
									</div>
								</div>

								{/* Property Type */}
								<div>
									<label className="block text-sm font-black uppercase text-gray-400 tracking-widest mb-2 font-montserrat">
										Property Type *
									</label>
									<select
										value={formData.propertyType}
										onChange={(e) =>
											handleInputChange("propertyType", e.target.value)
										}
										className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-montserrat">
										<option value="residential">Residential</option>
										<option value="commercial">Commercial</option>
										<option value="mixed-use">Mixed-Use</option>
										<option value="industrial">Industrial</option>
										<option value="land">Land</option>
									</select>
								</div>

								{/* Condition */}
								<div>
									<label className="block text-sm font-black uppercase text-gray-400 tracking-widest mb-2 font-montserrat">
										Condition
									</label>
									<select
										value={formData.condition || "good"}
										onChange={(e) =>
											handleInputChange("condition", e.target.value)
										}
										className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-montserrat">
										<option value="excellent">Excellent</option>
										<option value="good">Good</option>
										<option value="fair">Fair</option>
										<option value="poor">Poor</option>
									</select>
								</div>

								{/* Advanced Fields Toggle */}
								<button
									type="button"
									onClick={() => setShowAdvanced(!showAdvanced)}
									className="text-xs font-black uppercase text-blue-600 hover:text-blue-700 transition-colors tracking-widest font-montserrat">
									{showAdvanced ? "− Hide Advanced" : "+ Show Advanced"}
								</button>

								{/* Advanced Fields */}
								<AnimatePresence>
									{showAdvanced && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.3 }}
											className="space-y-4 pt-4 border-t border-gray-200">
											<div className="grid grid-cols-2 gap-4">
												<div>
													<label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2 font-montserrat">
														Size (sqft)
													</label>
													<input
														type="number"
														placeholder="1200"
														value={formData.size || ""}
														onChange={(e) =>
															handleInputChange(
																"size",
																e.target.value
																	? parseInt(e.target.value)
																	: undefined,
															)
														}
														className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 font-montserrat"
													/>
												</div>
												<div>
													<label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2 font-montserrat">
														Year Built
													</label>
													<input
														type="number"
														placeholder="2005"
														value={formData.yearBuilt || ""}
														onChange={(e) =>
															handleInputChange(
																"yearBuilt",
																e.target.value
																	? parseInt(e.target.value)
																	: undefined,
															)
														}
														className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 font-montserrat"
													/>
												</div>
												<div>
													<label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2 font-montserrat">
														Bedrooms
													</label>
													<input
														type="number"
														placeholder="2"
														value={formData.bedrooms || ""}
														onChange={(e) =>
															handleInputChange(
																"bedrooms",
																e.target.value
																	? parseInt(e.target.value)
																	: undefined,
															)
														}
														className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 font-montserrat"
													/>
												</div>
												<div>
													<label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2 font-montserrat">
														Bathrooms
													</label>
													<input
														type="number"
														placeholder="1"
														value={formData.bathrooms || ""}
														onChange={(e) =>
															handleInputChange(
																"bathrooms",
																e.target.value
																	? parseFloat(e.target.value)
																	: undefined,
															)
														}
														className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 font-montserrat"
													/>
												</div>
											</div>

											<div>
												<label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2 font-montserrat">
													Market Context
												</label>
												<textarea
													placeholder="Any additional market information..."
													value={formData.marketContext || ""}
													onChange={(e) =>
														handleInputChange("marketContext", e.target.value)
													}
													rows={3}
													className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 font-montserrat resize-none"
												/>
											</div>
										</motion.div>
									)}
								</AnimatePresence>

								{/* Action Buttons */}
								<div className="flex gap-3 pt-4">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										type="submit"
										disabled={
											agent.loading.isLoading || !formData.propertyAddress
										}
										className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-300 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 disabled:shadow-none font-montserrat">
										{agent.loading.isLoading ? (
											<>
												<motion.div
													animate={{ rotate: 360 }}
													transition={{
														duration: 1,
														repeat: Infinity,
														ease: "linear",
													}}
													className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
												/>
												Analyzing...
											</>
										) : (
											<>
												<Building2 className="w-4 h-4" />
												Analyze Property
											</>
										)}
									</motion.button>

									{agent.result && (
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											type="button"
											onClick={() => agent.reset()}
											className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black rounded-xl flex items-center justify-center transition-colors font-montserrat">
											<RefreshCw className="w-4 h-4" />
										</motion.button>
									)}
								</div>

								{/* Error Display */}
								{agent.error && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3">
										<AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
										<div>
											<p className="text-sm font-bold text-red-900 font-montserrat">
												{agent.error.message}
											</p>
											{agent.error.details && (
												<p className="text-xs text-red-700 mt-1 font-montserrat">
													{agent.error.details}
												</p>
											)}
										</div>
									</motion.div>
								)}
							</div>
						</form>
					</motion.div>

					{/* Results Panel */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}>
						{agent.loading.isLoading ? (
							<>
								<LoadingState
									progress={agent.loading.progress}
									currentStep={agent.loading.currentStep}
								/>
							</>
						) : agent.result ? (
							<div className="space-y-6">
								{/* Main Valuation */}
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4 }}
									className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl lg:rounded-[2rem] p-8 lg:p-12 text-white space-y-6">
									<div>
										<p className="text-sm font-black uppercase text-blue-100 tracking-widest mb-2 font-montserrat">
											Estimated Value
										</p>
										<h2 className="text-4xl lg:text-5xl font-black font-mclaren mb-2">
											{formatter.formatCurrency(
												agent.result.estimatedValue.midpoint,
											)}
										</h2>
										<p className="text-sm font-medium text-blue-100 font-montserrat">
											Range:{" "}
											{formatter.formatCurrency(
												agent.result.estimatedValue.min,
											)}{" "}
											-{" "}
											{formatter.formatCurrency(
												agent.result.estimatedValue.max,
											)}
										</p>
									</div>

									<div className="h-px bg-white/20" />

									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-xs font-black uppercase text-blue-100 tracking-widest mb-1 font-montserrat">
												Rating
											</p>
											<div className="flex items-baseline gap-1">
												<span className="text-3xl font-black font-mclaren">
													{agent.result.investmentRating.toFixed(1)}
												</span>
												<span className="text-sm font-bold text-blue-100 font-montserrat">
													/5
												</span>
											</div>
										</div>
										<div>
											<p className="text-xs font-black uppercase text-blue-100 tracking-widest mb-1 font-montserrat">
												Confidence
											</p>
											<p className="text-xl font-black font-mclaren">
												{formatter.formatConfidence(
													agent.result.estimatedValue.confidence,
												)}
											</p>
										</div>
									</div>
								</motion.div>

								{/* Risk Scores */}
								<MultiScore
									title="Risk Assessment"
									scores={[
										{
											label: "Overall Risk",
											value: agent.result.riskScore.overall,
											type: "risk",
										},
										{
											label: "Structural Risk",
											value: agent.result.riskScore.breakdown.structural,
											type: "risk",
										},
										{
											label: "Market Risk",
											value: agent.result.riskScore.breakdown.market,
											type: "risk",
										},
									]}
								/>

								{/* Reasoning */}
								<ReasoningDisplay
									steps={agent.result.reasoning}
									title="Valuation Reasoning"
									isExpanded={false}
								/>

								{/* Sources */}
								{agent.result.sources.length > 0 && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.4 }}
										className="bg-gray-50 border border-gray-200/60 rounded-2xl p-6 space-y-4">
										<p className="text-sm font-black uppercase text-gray-400 tracking-widest font-montserrat">
											Sources
										</p>
										<div className="space-y-2">
											{agent.result.sources.map((source, i) => (
												<div
													key={i}
													className="flex items-center gap-2 text-sm text-gray-700 font-montserrat">
													<span className="text-blue-600">•</span>
													{source}
												</div>
											))}
										</div>
									</motion.div>
								)}

								{/* Metadata */}
								<div className="text-xs text-gray-500 text-center space-y-1 font-montserrat">
									<p>
										Generated{" "}
										{new Date(agent.result.timestamp).toLocaleDateString()} at{" "}
										{new Date(agent.result.timestamp).toLocaleTimeString()}
									</p>
									{agent.tokensUsed > 0 && (
										<p>
											Tokens used: {agent.tokensUsed} | Processing:{" "}
											{agent.processingTime}ms
										</p>
									)}
								</div>
							</div>
						) : (
							<div className="text-center py-16">
								<Building2 className="w-16 h-16 text-gray-200 mx-auto mb-4" />
								<p className="text-gray-500 font-medium font-montserrat">
									Enter property details and click "Analyze Property" to get
									started
								</p>
							</div>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ValuationAgent;
