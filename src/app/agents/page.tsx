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
	ArrowRight,
	Sparkles,
	ShieldCheck,
	Zap,
	Bot,
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

const FEATURES = [
	{
		icon: Zap,
		title: "Real-Time Processing",
		desc: "Instantly process structured market data with sub-second latency.",
	},
	{
		icon: ShieldCheck,
		title: "Deterministic Output",
		desc: "Strict schema validation ensures consistent and reliable evaluations.",
	},
	{
		icon: Bot,
		title: "Autonomous Workflows",
		desc: "Agents communicate and cross-verify findings automatically.",
	},
];

export default function AgentsPage() {
	return (
		<div className="min-h-screen bg-[#fafbfc] relative overflow-hidden pt-24 pb-32">
			{/* Ambient Background Blurs */}
			<div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#4DA2FF]/10 blur-[120px] pointer-events-none" />
			<div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-400/5 blur-[120px] pointer-events-none" />

			<div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Hero Section */}
				<div className="flex flex-col items-center text-center mb-24 sm:mb-32">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="inline-flex items-center gap-2 rounded-full border border-[#4DA2FF]/20 bg-[#4DA2FF]/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#4DA2FF] font-montserrat mb-8 shadow-sm">
						<Sparkles className="w-3.5 h-3.5" />
						AI Intelligence Suite
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
						className="max-w-4xl text-5xl font-black tracking-tight text-gray-900 sm:text-6xl lg:text-7xl font-mclaren mb-8 leading-[1.1]">
						The Future of{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA2FF] to-cyan-400">
							Real Estate
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
						className="max-w-2xl text-base sm:text-lg leading-relaxed text-gray-500 font-montserrat">
						Experience the next generation of property valuation and investor
						matching, powered by autonomous AI agents designed for institutional
						accuracy.
					</motion.p>
				</div>

				{/* Agents Grid */}
				<div className="grid gap-6 md:grid-cols-2 lg:gap-10 mb-32">
					{AGENTS.map((agent, index) => (
						<motion.div
							key={agent.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.7, delay: index * 0.1 }}
							className="group relative h-full">
							<Link
								href={agent.href}
								onClick={(e) => {
									if (agent.status === "coming-soon") e.preventDefault();
								}}
								className={`block h-full ${agent.status === "coming-soon" ? "cursor-default" : ""}`}>
								<div
									className={`relative h-full rounded-[2.5rem] border bg-white/80 backdrop-blur-xl p-8 sm:p-10 transition-all duration-500 flex flex-col ${
										agent.status === "available"
											? "border-gray-100 hover:border-[#4DA2FF]/30 hover:shadow-[0_20px_40px_-15px_rgba(77,162,255,0.15)] hover:-translate-y-2"
											: "border-gray-100 opacity-60"
									}`}>
									{/* Top row: Icon & Badge */}
									<div className="flex items-start justify-between mb-10">
										<div
											className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
												agent.status === "available"
													? "bg-gradient-to-br from-[#4DA2FF]/20 to-cyan-400/20 text-[#4DA2FF]"
													: "bg-gray-100 text-gray-400"
											}`}>
											{agent.icon}
										</div>

										<div
											className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] font-montserrat ${
												agent.status === "available"
													? "bg-emerald-50 text-emerald-600"
													: "bg-amber-50 text-amber-600"
											}`}>
											<span
												className={`w-1.5 h-1.5 rounded-full ${
													agent.status === "available"
														? "bg-emerald-500 animate-pulse"
														: "bg-amber-500"
												}`}
											/>
											{agent.status === "available"
												? "Active"
												: "In Development"}
										</div>
									</div>

									{/* Content */}
									<h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 font-mclaren tracking-tight">
										{agent.title}
									</h3>
									<p className="text-sm sm:text-base leading-relaxed text-gray-500 font-montserrat flex-1">
										{agent.description}
									</p>

									{/* CTA */}
									<div className="mt-12 flex items-center text-[10px] font-black uppercase tracking-[0.3em] font-montserrat">
										<span
											className={`transition-colors duration-300 ${
												agent.status === "available"
													? "text-[#4DA2FF] group-hover:text-cyan-500"
													: "text-gray-400"
											}`}>
											{agent.status === "available"
												? "Launch Agent"
												: "Coming Soon"}
										</span>
										{agent.status === "available" && (
											<ArrowRight className="w-4 h-4 ml-2 text-[#4DA2FF] group-hover:text-cyan-500 group-hover:translate-x-1 transition-all duration-300" />
										)}
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</div>

				{/* Framework Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.7 }}
					className="max-w-4xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl sm:text-4xl font-black text-gray-900 font-mclaren mb-6">
							Operational Framework
						</h2>
						<p className="text-gray-500 text-sm sm:text-base font-montserrat max-w-xl mx-auto leading-relaxed">
							Enterprise-grade architecture ensuring secure, transparent, and
							highly accurate AI operations for institutional real estate.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
						{FEATURES.map((f, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.15 }}
								className="rounded-[2rem] border border-gray-100 bg-white p-8 hover:shadow-[0_20px_40px_-15px_rgba(77,162,255,0.1)] hover:-translate-y-1 transition-all duration-300 text-center sm:text-left flex flex-col items-center sm:items-start">
								<div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
									<f.icon className="w-5 h-5 text-[#4DA2FF]" />
								</div>
								<h4 className="text-lg font-black text-gray-900 mb-3 font-mclaren tracking-tight">
									{f.title}
								</h4>
								<p className="text-xs sm:text-sm leading-relaxed text-gray-500 font-montserrat">
									{f.desc}
								</p>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
