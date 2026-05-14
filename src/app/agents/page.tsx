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
	ChevronRight,
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
		features: [],
	},
	{
		id: "matching",
		title: "Investor Matching",
		description:
			"Matches investors with optimal properties based on profile and investment preferences.",
		icon: <Users className="w-6 h-6 lg:w-8 lg:h-8" />,
		status: "available",
		href: "/agents/matching",
		features: [],
	},
];

export default function AgentsPage() {
	return (
		<div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8 xl:px-12 lg:py-14">
			<div className="relative mx-auto max-w-7xl">
				{/* Hero */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55 }}
					className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
					<div className="space-y-5">
						<div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-blue-700 font-montserrat">
							AI Intelligence Suite
						</div>
						<h1 className="max-w-3xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl font-mclaren">
							Agents
						</h1>
						<p className="max-w-2xl text-base leading-7 text-gray-600 sm:text-lg font-montserrat">
							Simple tools for valuation, matching, and upcoming workflows.
						</p>
						<div className="flex flex-wrap gap-3 pt-2">
							<Link
								href="/agents/valuation"
								className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-[10px] font-black uppercase tracking-[0.35em] text-white font-montserrat">
								Valuation
							</Link>
							<Link
								href="/agents/matching"
								className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.35em] text-gray-800 font-montserrat">
								Matching
							</Link>
						</div>
					</div>
				</motion.section>

				{/* Agents Grid */}
				<div className="mt-8 grid gap-4 md:grid-cols-2">
					{AGENTS.map((agent, index) => (
						<motion.div
							key={agent.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}>
							{agent.status === "available" ? (
								<Link href={agent.href}>
									<motion.div
										whileHover={{ y: -2 }}
										whileTap={{ scale: 0.99 }}
										className={cn(
											"relative h-full group cursor-pointer overflow-hidden",
											agent.status === "coming-soon" && "opacity-60",
										)}>
										<div className="relative h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 sm:p-7 lg:p-8">
											{/* Status Badge */}
											<div className="flex items-center justify-between gap-4">
												<div
													className={cn(
														"inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] font-montserrat",
														agent.status === "available"
															? "bg-emerald-50 text-emerald-700 border border-emerald-200"
															: "bg-amber-50 text-amber-700 border border-amber-200",
													)}>
													<div
														className={cn(
															"w-2 h-2 rounded-full",
															agent.status === "available"
																? "bg-emerald-600"
																: "bg-amber-600",
														)}
													/>
													{agent.status === "available"
														? "Available"
														: "Coming Soon"}
												</div>

												<ArrowRight className="w-5 h-5 text-gray-300" />
											</div>

											<div className="mt-6 w-12 h-12 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center text-blue-600">
												{agent.icon}
											</div>

											{/* Content */}
											<div className="pt-4">
												<h3 className="text-xl font-black text-gray-900 mb-2 font-mclaren">
													{agent.title}
												</h3>
												<p className="text-sm leading-7 text-gray-600 font-montserrat">
													{agent.description}
												</p>
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
													"mt-5 w-full rounded-full px-4 py-3 text-[10px] font-black uppercase tracking-[0.35em] transition-colors duration-300 flex items-center justify-center gap-2 font-montserrat",
													agent.status === "available"
														? "bg-blue-600 text-white hover:bg-blue-700"
														: "border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed",
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
							) : (
								<motion.div className="relative h-full rounded-3xl border border-gray-200 bg-white p-6 opacity-90 shadow-sm sm:p-7 lg:p-8">
									<div className="absolute right-5 top-5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-amber-700 font-montserrat">
										Coming Soon
									</div>
									<div className="mt-6 w-14 h-14 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center text-blue-600">
										{agent.icon}
									</div>
									<div className="pt-5">
										<h3 className="text-xl font-black text-gray-900 mb-2 font-mclaren">
											{agent.title}
										</h3>
										<p className="text-sm leading-7 text-gray-600 font-montserrat">
											{agent.description}
										</p>
									</div>
									<button
										disabled
										className="mt-6 w-full rounded-full border border-gray-200 bg-gray-100 px-4 py-3.5 text-[10px] font-black uppercase tracking-[0.35em] text-gray-400 font-montserrat cursor-not-allowed">
										Coming Soon
									</button>
								</motion.div>
							)}
						</motion.div>
					))}
				</div>

				{/* Info Section */}
				<motion.section
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.35 }}
					className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
					<div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
						<div>
							<p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-700 font-montserrat">
								Agent Framework
							</p>
							<h2 className="mt-3 text-3xl font-black text-gray-900 font-mclaren sm:text-4xl">
								How the agents operate
							</h2>
							<p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 font-montserrat sm:text-base">
								Each agent is tuned for a specific workflow: analysis, matching,
								verification, and future portfolio automation.
							</p>
						</div>

						<div className="grid gap-3 sm:grid-cols-2">
							{[
								"Processes structured input data",
								"Returns transparent explanations",
								"Validates output with schemas",
								"Handles errors gracefully",
								"Tracks token usage and latency",
								"Designed for real estate workflows",
							].map((item, i) => (
								<div
									key={i}
									className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 font-montserrat">
									<span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-black">
										✓
									</span>
									<span>{item}</span>
								</div>
							))}
						</div>
					</div>
				</motion.section>
			</div>
		</div>
	);
}

function cn(...classes: (string | boolean | undefined)[]) {
	return classes.filter(Boolean).join(" ");
}
