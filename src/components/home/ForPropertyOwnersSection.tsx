/** @format */
"use client";

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

export default function ForPropertyOwnersSection() {
	const benefits = [
		"Pass through a guided verification process that builds trust",
		"Receive payments in secure, milestone-based releases",
		"Manage investor relations, documents, disputes, and updates from one place",
		"Step confidently into the new digital property economy",
	];

	return (
		<section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div className="order-2 lg:order-1">
						<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 dark:shadow-blue-400/5">
							<div className="aspect-video bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl mb-6" />
							<div className="grid grid-cols-3 gap-4">
								<div className="h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg" />
								<div className="h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg" />
								<div className="h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg" />
							</div>
						</div>
					</div>
					<div className="order-1 lg:order-2">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full mb-6">
							<Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
							<span className="text-sm font-medium text-blue-700 dark:text-blue-300">
								For Property Owners & Developers
							</span>
						</div>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
							Unlock liquidity by digitizing and listing property deeds
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
							href="/list-property"
							className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-400 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/20 hover:scale-105 transition-all duration-300">
							List Your Property
							<ArrowRight className="w-5 h-5" />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
