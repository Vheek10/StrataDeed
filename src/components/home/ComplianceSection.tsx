/** @format */
"use client";

import { FileCheck, Shield, Eye, Globe, TrendingUp } from "lucide-react";

const complianceFeatures = [
	{
		icon: FileCheck,
		title: "Verified Ownership",
		description: "Document checks",
	},
	{
		icon: Shield,
		title: "Escrow-Protected",
		description: "Transactions",
	},
	{
		icon: Eye,
		title: "Blockchain-Based",
		description: "Title stamping",
	},
	{
		icon: Globe,
		title: "Immutable Logs",
		description: "All transfers recorded",
	},
	{
		icon: TrendingUp,
		title: "Automated Reporting",
		description: "For all stakeholders",
	},
];

export default function ComplianceSection() {
	return (
		<section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						Compliance at the Core
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
						StrataDeed is engineered around Africa's real estate and fintech
						regulations
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
					{complianceFeatures.map((feature) => {
						const Icon = feature.icon;
						return (
							<div
								key={feature.title}
								className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
								<div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
									<Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<h3 className="font-semibold text-gray-900 dark:text-white">
									{feature.title}
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>

				<div className="text-center max-w-3xl mx-auto">
					<p className="text-2xl text-gray-800 dark:text-gray-200 font-semibold mb-6">
						This isn't a shortcut. It's an upgrade for the entire value chain.
					</p>
				</div>
			</div>
		</section>
	);
}
