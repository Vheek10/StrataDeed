/** @format */

"use client";

import {
	LayoutDashboard,
	Home,
	CreditCard,
	FileText,
	Briefcase,
} from "lucide-react";

interface DashboardTabsProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
}

export default function DashboardTabs({
	activeTab,
	onTabChange,
}: DashboardTabsProps) {
	const tabs = [
		{
			id: "overview",
			label: "Overview",
			icon: LayoutDashboard,
			color: "text-blue-600 dark:text-blue-400",
		},
		{
			id: "portfolio",
			label: "Portfolio",
			icon: Briefcase,
			color: "text-emerald-600 dark:text-emerald-400",
		},
		{
			id: "transactions",
			label: "Transactions",
			icon: CreditCard,
			color: "text-amber-600 dark:text-amber-400",
		},
		{
			id: "documents",
			label: "Documents",
			icon: FileText,
			color: "text-violet-600 dark:text-violet-400",
		},
	];

	return (
		<div className="mb-6 md:mb-8 sticky top-14 md:top-20 z-10 bg-gradient-to-b from-gray-50/95 to-gray-50/95 dark:from-gray-950/95 dark:to-gray-950/95 backdrop-blur-sm -mx-4 px-4 py-2 md:mx-0 md:px-0 md:py-0 md:static md:bg-none">
			{/* Desktop Tabs */}
			<div className="hidden md:flex items-center gap-1 p-1 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-800/50 shadow-sm">
				{tabs.map((tab) => {
					const Icon = tab.icon;
					return (
						<button
							key={tab.id}
							onClick={() => onTabChange(tab.id)}
							className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
								activeTab === tab.id
									? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
									: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
							}`}>
							<Icon className="w-4 h-4" />
							{tab.label}
						</button>
					);
				})}
			</div>

			{/* Mobile Tabs - Horizontal Scroll */}
			<div className="md:hidden">
				<div className="flex overflow-x-auto scrollbar-hide gap-3 py-1">
					{tabs.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;
						return (
							<button
								key={tab.id}
								onClick={() => onTabChange(tab.id)}
								className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium border transition-all ${
									isActive
										? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25"
										: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
								}`}>
								<Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
								{tab.label}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
