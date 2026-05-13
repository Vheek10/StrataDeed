/** @format */

/**
 * Agents Hub / Dashboard
 * Route: /agents
 */

"use client";

import { motion } from "framer-motion";
import {
	Building2,
	Users,
	FileText,
	TrendingUp,
	ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface AgentCard {
	id: string;
	title: string;
	description: string;
	icon: React.ReactNode;
	status: "available" | "coming-soon";
	href: string;
	features: string[];
}

const AGENTS: AgentCard[] = [
	{
		id: "valuation",
		title: "Property Valuation",
		description:
			"AI-powered property analysis with market valuation, risk assessment, and investment rating.",
		icon: <Building2 className="w-6 h-6 lg:w-8 lg:h-8" />,
		status: "available",
		href: "/agents/valuation",
		features: [
			"Market Analysis",
			"Risk Assessment",
			"Comparable Properties",
			"Chain-of-Thought",
		],
	},
	{
		id: "matching",
		title: "Investor Matching",
		description:
			"Matches investors with optimal properties based on profile and investment preferences.",
		icon: <Users className="w-6 h-6 lg:w-8 lg:h-8" />,
		status: "available",
		href: "/agents/matching",
		features: [
			"Profile Analysis",
			"Fit Scoring",
			"Recommendations",
			"Yield Calculation",
		],
	},
	{
		id: "due-diligence",
		title: "Due Diligence",
		description:
			"Document analysis and legal risk identification for property transactions.",
		icon: <FileText className="w-6 h-6 lg:w-8 lg:h-8" />,
		status: "coming-soon",
		href: "/agents/due-diligence",
		features: [
			"Document Analysis",
			"Risk Detection",
			"Key Term Extraction",
			"Recommendations",
		],
	},
	{
		id: "portfolio",
		title: "Portfolio Manager",
		description:
			"Autonomous portfolio analysis, optimization, and rebalancing recommendations.",
		icon: <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8" />,
		status: "coming-soon",
		href: "/agents/portfolio",
		features: [
			"Allocation Analysis",
			"Rebalancing",
			"Opportunity Detection",
			"Performance Tracking",
		],
	},
];

export default function AgentsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-16 lg:mb-24">
					<p className="text-sm font-black uppercase text-blue-600 tracking-widest mb-4 font-montserrat">
						AI-Powered Intelligence
					</p>
					<h1 className="text-4xl lg:text-6xl font-black mb-4 text-gray-900 font-mclaren">
						Autonomous Agents
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto font-montserrat">
						Meet StrataDeed's suite of specialized AI agents designed to
						revolutionize real estate tokenization and portfolio management on
						Sui.
					</p>
				</motion.div>

				{/* Agents Grid */}
				<div className="grid md:grid-cols-2 gap-6 lg:gap-8">
					{AGENTS.map((agent, index) => (
						<motion.div
							key={agent.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}>
							<Link href={agent.href}>
								<motion.div
									whileHover={{ scale: 1.02, y: -4 }}
									whileTap={{ scale: 0.98 }}
									className={cn(
										"relative h-full group cursor-pointer",
										agent.status === "coming-soon" && "opacity-60",
									)}>
									<div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 rounded-2xl lg:rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all opacity-0 group-hover:opacity-100" />

									<div className="relative bg-white border border-gray-200/60 hover:border-blue-200 rounded-2xl lg:rounded-[2rem] p-8 lg:p-10 transition-all duration-300 space-y-6 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10">
										{/* Status Badge */}
										<div className="flex items-center justify-between">
											<div
												className={cn(
													"inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest font-montserrat",
													agent.status === "available"
														? "bg-green-100 text-green-700"
														: "bg-amber-100 text-amber-700",
												)}>
												<div
													className={cn(
														"w-2 h-2 rounded-full",
														agent.status === "available"
															? "bg-green-600"
															: "bg-amber-600",
													)}
												/>
												{agent.status === "available"
													? "Available"
													: "Coming Soon"}
											</div>

											<motion.div
												animate={{ x: [0, 4, 0] }}
												transition={{ duration: 2, repeat: Infinity }}
												className="text-gray-300 group-hover:text-blue-600 transition-colors">
												<ArrowRight className="w-5 h-5" />
											</motion.div>
										</div>

										{/* Icon */}
										<div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/40 w-16 h-16 rounded-xl lg:rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-cyan-100 transition-all">
											{agent.icon}
										</div>

										{/* Content */}
										<div>
											<h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-2 font-mclaren">
												{agent.title}
											</h3>
											<p className="text-sm lg:text-base text-gray-600 font-montserrat">
												{agent.description}
											</p>
										</div>

										{/* Features */}
										<div className="pt-4 border-t border-gray-200/60">
											<p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-3 font-montserrat">
												Capabilities
											</p>
											<div className="flex flex-wrap gap-2">
												{agent.features.map((feature) => (
													<span
														key={feature}
														className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-montserrat">
														{feature}
													</span>
												))}
											</div>
										</div>

										{/* CTA */}
										<button
											onClick={(e) => {
												if (agent.status === "coming-soon") {
													e.preventDefault();
												}
											}}
											disabled={agent.status === "coming-soon"}
											className={cn(
												"w-full py-3 px-4 rounded-xl font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 font-montserrat",
												agent.status === "available"
													? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-blue-600/30"
													: "bg-gray-100 text-gray-400 cursor-not-allowed",
											)}>
											{agent.status === "available"
												? "Launch Agent"
												: "Coming Soon"}
											{agent.status === "available" && (
												<ArrowRight className="w-4 h-4" />
											)}
										</button>
									</div>
								</motion.div>
							</Link>
						</motion.div>
					))}
				</div>

				{/* Info Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mt-16 lg:mt-24 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/60 rounded-2xl lg:rounded-[2rem] p-8 lg:p-12">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 font-mclaren">
							How Agents Work
						</h2>
						<p className="text-gray-700 mb-6 font-montserrat">
							StrataDeed's AI agents leverage OpenAI's GPT-4 Turbo with advanced
							prompt engineering to provide intelligent analysis. Each agent:
						</p>
						<ul className="grid md:grid-cols-2 gap-4 text-sm font-montserrat">
							{[
								"Processes structured input data",
								"Performs chain-of-thought reasoning",
								"Validates output with schemas",
								"Returns transparent explanations",
								"Handles errors gracefully",
								"Tracks token usage & latency",
							].map((item, i) => (
								<li
									key={i}
									className="flex gap-3 text-gray-700">
									<span className="text-blue-600 font-black">✓</span>
									{item}
								</li>
							))}
						</ul>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

function cn(...classes: (string | boolean | undefined)[]) {
	return classes.filter(Boolean).join(" ");
}
