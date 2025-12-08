/** @format */
"use client";

import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";

export default function ForInvestorsSection() {
	const benefits = [
		"Buy fractions or full ownership with modern settlement rails",
		"Track your holdings instantly inside a unified dashboard",
		"Enjoy secure, compliant transfers powered by audited smart contracts",
		"Expand your portfolio with assets that feel tangible, not abstract",
	];

	return (
		<section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10">
			<div className="max-w-7xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full mb-6">
							<Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
							<span className="text-sm font-medium text-blue-700 dark:text-blue-300">
								For Investors
							</span>
						</div>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
							Access real, verified property deeds across Africa
						</h2>
						<ul className="space-y-4 mb-8">
							{benefits.map((benefit, index) => (
								<li
									key={index}
									className="flex items-start gap-3">
									<div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
										<div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
									</div>
									<span className="text-gray-700 dark:text-gray-300">
										{benefit}
									</span>
								</li>
							))}
						</ul>
						<Link
							href="/invest"
							className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-400 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/20 hover:scale-105 transition-all duration-300">
							Start Investing
							<ArrowRight className="w-5 h-5" />
						</Link>
					</div>
					<div className="relative">
						<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 dark:shadow-blue-400/5">
							<div className="aspect-video bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl mb-6" />
							<div className="space-y-4">
								<div className="h-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full" />
								<div className="h-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full w-3/4" />
								<div className="h-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full w-1/2" />
							</div>
						</div>
						<div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl -rotate-12" />
						<div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl rotate-12" />
					</div>
				</div>
			</div>
		</section>
	);
}
