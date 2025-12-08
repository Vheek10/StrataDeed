/** @format */
"use client";

import { Building, TrendingUp, Layers } from "lucide-react";

const comparisons = [
	{
		icon: Building,
		title: "Land & House Listings",
		items: [
			"Simple listings with slow verification",
			"Zero liquidity",
			"Manual processes",
		],
		variant: "traditional" as const,
	},
	{
		icon: TrendingUp,
		title: "Real Estate Tokens (Unregulated)",
		items: [
			"High hype, weak fundamentals",
			"Unclear rights",
			"Unregulated processes",
		],
		variant: "speculative" as const,
	},
	{
		icon: Layers,
		title: "StrataDeed",
		items: [
			"Legal-backed digital deeds",
			"Regulated processes",
			"Verifiable ownership",
			"Transparent lifecycle",
			"Real value",
		],
		variant: "stratadeed" as const,
	},
];

export default function ComparisonSection() {
	return (
		<section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						Not Traditional. Not Speculative.{" "}
						<span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
							Something Real.
						</span>
					</h2>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{comparisons.map((comparison) => {
						const Icon = comparison.icon;
						const isStratadeed = comparison.variant === "stratadeed";

						return (
							<div
								key={comparison.title}
								className={`${
									isStratadeed
										? "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800 relative overflow-hidden"
										: "bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800"
								}`}>
								{isStratadeed && (
									<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16" />
								)}
								<div
									className={`flex items-center gap-3 mb-6 ${
										isStratadeed ? "relative z-10" : ""
									}`}>
									<Icon
										className={`w-6 h-6 ${
											isStratadeed
												? "text-blue-600 dark:text-blue-400"
												: "text-gray-500 dark:text-gray-400"
										}`}
									/>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										{comparison.title}
									</h3>
								</div>
								<ul
									className={`space-y-3 ${
										isStratadeed ? "relative z-10" : ""
									}`}>
									{comparison.items.map((item) => (
										<li
											key={item}
											className="flex items-start gap-2">
											<div
												className={`w-1.5 h-1.5 rounded-full mt-2 ${
													isStratadeed
														? "bg-blue-600 dark:bg-blue-400"
														: "bg-gray-400"
												}`}
											/>
											<span
												className={
													isStratadeed
														? "text-gray-900 dark:text-white font-medium"
														: "text-gray-600 dark:text-gray-400"
												}>
												{item}
											</span>
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
