/** @format */
"use client";

import {
	Building2,
	Shield,
	Globe,
	Users,
	Target,
	Eye,
	Zap,
	CheckCircle,
	ArrowRight,
	Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
	const features = [
		{
			icon: Shield,
			title: "Blockchain Security",
			description:
				"Immutable property records on distributed ledger technology",
		},
		{
			icon: Globe,
			title: "Global Access",
			description: "Borderless real estate investment opportunities",
		},
		{
			icon: Users,
			title: "Community Driven",
			description: "Built for investors, property owners, and developers",
		},
		{
			icon: Zap,
			title: "Instant Transactions",
			description: "Near-instant property transfers and settlements",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
			{/* Hero Section */}
			<section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
				{/* Background Image */}
				<div className="absolute inset-0">
					<Image
						src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
						alt="Modern city skyline"
						fill
						className="object-cover"
						priority
						sizes="100vw"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/70 to-cyan-900/70" />
				</div>

				<div className="relative max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Left Column */}
						<div>
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
								<Building2 className="w-4 h-4 text-white" />
								<span className="text-sm font-medium text-white">
									ABOUT STRATADEED
								</span>
							</div>

							<h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
								Redefining{" "}
								<span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
									Real Estate
								</span>
								<br />
								Ownership
							</h1>

							<p className="text-lg text-blue-100 mb-8 leading-relaxed">
								StrataDeed transforms traditional property ownership into
								secure, transparent, and accessible digital assets using
								blockchain technology.
							</p>

							<div className="flex flex-col sm:flex-row gap-4">
								<Link
									href="/signup"
									className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
									<span>Get Started</span>
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</Link>
								<Link
									href="/contact"
									className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
									Contact Team
								</Link>
							</div>
						</div>

						{/* Right Column - Stats */}
						<div className="grid grid-cols-2 gap-6">
							<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
								<div className="text-3xl font-bold text-white mb-2">MVP</div>
								<div className="text-blue-200 text-sm">Prototype Version</div>
								<div className="mt-4 text-xs text-blue-300">
									Built for Mantle Hackathon
								</div>
							</div>
							<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
								<div className="text-3xl font-bold text-white mb-2">2024</div>
								<div className="text-blue-200 text-sm">Founded</div>
								<div className="mt-4 text-xs text-blue-300">
									Next-gen real estate platform
								</div>
							</div>
							<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
								<div className="text-3xl font-bold text-white mb-2">100%</div>
								<div className="text-blue-200 text-sm">Secure</div>
								<div className="mt-4 text-xs text-blue-300">
									Blockchain verified
								</div>
							</div>
							<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
								<div className="text-3xl font-bold text-white mb-2">45+</div>
								<div className="text-blue-200 text-sm">Countries</div>
								<div className="mt-4 text-xs text-blue-300">Global reach</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
						{/* Image */}
						<div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
							<Image
								src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
								alt="Modern transparent building"
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
						</div>

						{/* Content */}
						<div>
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
								<Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
								<span className="text-sm font-medium text-blue-600 dark:text-blue-400">
									OUR MISSION
								</span>
							</div>

							<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
								Building the Future of Property Ownership
							</h2>

							<div className="space-y-4">
								<p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
									StrataDeed is a prototype UI that demonstrates how property
									deeds can be tokenized, listed and transacted using blockchain
									infrastructure.
								</p>
								<p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
									This frontend is the light-themed MVP interface for the Mantle
									Hackathon project, focusing on clean UX, asset upload flows,
									and a modern marketplace layout.
								</p>
							</div>

							<div className="mt-8 flex items-center gap-4">
								<CheckCircle className="w-5 h-5 text-emerald-500" />
								<span className="font-medium text-gray-900 dark:text-white">
									Live prototype • Active development • Real-world testing
								</span>
							</div>
						</div>
					</div>

					{/* Features Grid */}
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
						{features.map((feature, index) => {
							const Icon = feature.icon;
							return (
								<div
									key={feature.title}
									className="group relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:scale-[1.02]">
									<div className="inline-flex p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4">
										<Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
									</div>
									<h3 className="font-bold text-gray-900 dark:text-white mb-2">
										{feature.title}
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{feature.description}
									</p>
								</div>
							);
						})}
					</div>

					{/* Vision Section */}
					<div className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 lg:p-12">
						<div className="grid lg:grid-cols-2 gap-8 items-center">
							<div>
								<div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full mb-6 border border-cyan-500/30">
									<Eye className="w-4 h-4 text-cyan-400" />
									<span className="text-sm font-medium text-cyan-300">
										OUR VISION
									</span>
								</div>

								<h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
									A World Where Property Ownership is{" "}
									<span className="text-cyan-300">Accessible to All</span>
								</h3>

								<p className="text-lg text-gray-300 leading-relaxed mb-6">
									We envision a future where anyone, anywhere can invest in
									verified real estate through secure digital tokens,
									democratizing property ownership for the digital age.
								</p>

								<div className="flex items-center gap-3">
									<div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
									<span className="text-cyan-200 font-medium">
										Join us in building this future
									</span>
								</div>
							</div>

							{/* Vision Stats */}
							<div className="grid grid-cols-2 gap-4">
								<div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
									<div className="text-2xl font-bold text-white mb-2">
										$2.5B+
									</div>
									<div className="text-sm text-cyan-200">
										Target Market Volume
									</div>
								</div>
								<div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
									<div className="text-2xl font-bold text-white mb-2">
										100K+
									</div>
									<div className="text-sm text-cyan-200">Target Users</div>
								</div>
								<div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
									<div className="text-2xl font-bold text-white mb-2">
										&lt;2s
									</div>
									<div className="text-sm text-cyan-200">Transaction Speed</div>
								</div>
								<div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
									<div className="text-2xl font-bold text-white mb-2">0</div>
									<div className="text-sm text-cyan-200">Title Disputes</div>
								</div>
							</div>
						</div>
					</div>

					{/* CTA Section */}
					<div className="mt-20 text-center">
						<div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl mb-8">
							<Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							<p className="text-lg font-semibold text-gray-900 dark:text-white">
								Ready to experience the future of real estate?
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href="/signup"
								className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
								<span>Start Investing</span>
								<ArrowRight className="w-5 h-5" />
							</Link>
							<Link
								href="/contact"
								className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
								Learn More
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
