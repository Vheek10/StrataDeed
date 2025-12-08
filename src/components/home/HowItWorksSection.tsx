/** @format */
"use client";

import { FileCheck, Shield, Clock } from "lucide-react";

const steps = [
	{
		number: "01",
		icon: FileCheck,
		title: "Property Owners Tokenize Their Deeds",
		description:
			"Each property goes through compliance checks, title verification, and digital authentication before being minted as an on-chain deed.",
	},
	{
		number: "02",
		icon: Shield,
		title: "Investors Buy Fractions Securely",
		description:
			"Ownership units are purchased using verified payment channels, held in a protected smart-escrow, and released only after settlement.",
	},
	{
		number: "03",
		icon: Clock,
		title: "Everyone Tracks Ownership in Real Time",
		description:
			"Every update is timestamped, verifiable, and permanently recorded. No confusion, no hidden edits, no disputes.",
	},
];

export default function HowItWorksSection() {
	return (
		<section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						How StrataDeed Works
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
						A seamless three-step process that transforms traditional real
						estate into digital assets
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 lg:gap-12">
					{steps.map((step) => {
						const Icon = step.icon;
						return (
							<div
								key={step.number}
								className="relative">
								<div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
									{step.number}
								</div>
								<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg shadow-gray-200/50 dark:shadow-black/20 h-full">
									<div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
										<Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
									</div>
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
										{step.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-400">
										{step.description}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
