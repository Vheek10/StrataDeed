/** @format */

import { Bell, Settings, Filter, Download } from "lucide-react";

interface DashboardHeaderProps {
	title: string;
	subtitle: string;
}

export default function DashboardHeader({
	title,
	subtitle,
}: DashboardHeaderProps) {
	return (
		<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
			<div>
				<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
					{title}
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
			</div>

			<div className="flex items-center gap-3">
				<button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow transition-all">
					<Filter className="w-4 h-4" />
					<span className="text-sm font-medium">Filter</span>
				</button>
				<button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow transition-all">
					<Download className="w-4 h-4" />
					<span className="text-sm font-medium">Export</span>
				</button>
				<div className="relative">
					<Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 cursor-pointer" />
					<span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
				</div>
				<button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
					<Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
				</button>
			</div>
		</div>
	);
}
