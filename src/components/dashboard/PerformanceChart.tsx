/** @format */

"use client";

import { BarChart3 } from "lucide-react";

interface PerformanceChartProps {
	timeRange: string;
	onTimeRangeChange: (range: string) => void;
	monthlyGrowth: number;
	portfolioValue: number;
}

export default function PerformanceChart({
	timeRange,
	onTimeRangeChange,
	monthlyGrowth,
	portfolioValue,
}: PerformanceChartProps) {
	const timeRanges = ["weekly", "monthly", "quarterly", "yearly"];

	return (
		<div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
				<div>
					<h3 className="font-bold text-gray-900">
						Portfolio Performance
					</h3>
					<p className="text-sm text-gray-600">
						Value growth and rental yield trends
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-2">
					{timeRanges.map((range) => (
						<button
							key={range}
							onClick={() => onTimeRangeChange(range)}
							className={`px-3 py-1 rounded-lg text-xs sm:text-sm capitalize ${
								timeRange === range
									? "bg-blue-100 text-blue-600 font-medium"
									: "text-gray-600 hover:text-gray-900"
							}`}>
							{range}
						</button>
					))}
				</div>
			</div>

			<div className="h-64 relative bg-gradient-to-b from-gray-50 to-white rounded-lg border border-gray-200 flex items-center justify-center">
				<div className="text-center">
					<BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
					<p className="text-gray-600">
						Performance chart visualization
					</p>
					<p className="text-sm text-gray-500">
						Real-time value tracking
					</p>
				</div>
			</div>

			<div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
				<div>
					<div className="text-sm text-gray-600">
						Avg. Rental Yield
					</div>
					<div className="text-lg font-bold text-gray-900">
						+{monthlyGrowth}%
					</div>
				</div>
				<div>
					<div className="text-sm text-gray-600">
						Peak Value
					</div>
					<div className="text-lg font-bold text-gray-900">
						${((portfolioValue * 1.2) / 1000000).toFixed(2)}M
					</div>
				</div>
				<div>
					<div className="text-sm text-gray-600">
						Market Rank
					</div>
					<div className="text-lg font-bold text-gray-900">
						Top 5%
					</div>
				</div>
			</div>
		</div>
	);
}
