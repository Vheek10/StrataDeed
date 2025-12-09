/** @format */

import { PieChart, Shield } from "lucide-react";
import { PortfolioDistribution as PortfolioDistributionType } from "./data/dashboard-data";

interface PortfolioDistributionProps {
	data: PortfolioDistributionType[];
}

export default function PortfolioDistribution({
	data,
}: PortfolioDistributionProps) {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className="font-bold text-gray-900 dark:text-white">
						Portfolio Distribution
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						By property type
					</p>
				</div>
				<PieChart className="w-5 h-5 text-gray-400" />
			</div>

			<div className="space-y-4 mb-6">
				{data.map((item) => (
					<div
						key={item.type}
						className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-gray-900 dark:text-white">
								{item.type}
							</span>
							<span className="text-sm font-bold text-gray-900 dark:text-white">
								{item.value}%
							</span>
						</div>
						<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
							<div
								className={`h-full ${item.color} rounded-full transition-all duration-500`}
								style={{ width: `${item.value}%` }}></div>
						</div>
					</div>
				))}
			</div>

			<div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
				<div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400">
					<Shield className="w-4 h-4" />
					<span>Your portfolio is well-diversified across property types</span>
				</div>
			</div>
		</div>
	);
}
