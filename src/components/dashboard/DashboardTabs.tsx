/** @format */

"use client";

import {
	LayoutDashboard,
	Home,
	BarChart3,
	CreditCard,
	FileText,
	Settings,
	TrendingUp,
	Briefcase,
	DollarSign,
	Shield,
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
			id: "analytics",
			label: "Analytics",
			icon: BarChart3,
			color: "text-purple-600 dark:text-purple-400",
		},
		{
			id: "transactions",
			label: "Transactions",
			icon: CreditCard,
			color: "text-amber-600 dark:text-amber-400",
		},
		{
			id: "investments",
			label: "Investments",
			icon: TrendingUp,
			color: "text-cyan-600 dark:text-cyan-400",
		},
		{
			id: "documents",
			label: "Documents",
			icon: FileText,
			color: "text-violet-600 dark:text-violet-400",
		},
		{
			id: "security",
			label: "Security",
			icon: Shield,
			color: "text-red-600 dark:text-red-400",
		},
		{
			id: "settings",
			label: "Settings",
			icon: Settings,
			color: "text-gray-600 dark:text-gray-400",
		},
	];

	return (
		<div className="mb-8">
			{/* Desktop Tabs */}
			<div className="hidden md:flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
				{tabs.map((tab) => {
					const Icon = tab.icon;
					return (
						<button
							key={tab.id}
							onClick={() => onTabChange(tab.id)}
							className={`flex items-center gap-2 flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-all ${
								activeTab === tab.id
									? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
									: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
							}`}>
							<Icon
								className={`w-4 h-4 ${activeTab === tab.id ? tab.color : ""}`}
							/>
							{tab.label}
						</button>
					);
				})}
			</div>

			{/* Mobile Tabs - Scrollable */}
			<div className="md:hidden">
				<div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
					{tabs.map((tab) => {
						const Icon = tab.icon;
						return (
							<button
								key={tab.id}
								onClick={() => onTabChange(tab.id)}
								className={`flex flex-col items-center flex-shrink-0 px-4 py-2 rounded-lg transition-all ${
									activeTab === tab.id
										? "bg-blue-600 text-white shadow-sm"
										: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
								}`}>
								<Icon
									className={`w-5 h-5 mb-1 ${
										activeTab === tab.id ? "text-white" : tab.color
									}`}
								/>
								<span className="text-xs font-medium">{tab.label}</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
