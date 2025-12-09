/** @format */

import { Clock, Wallet, Eye, Target, Shield } from "lucide-react";
import { RecentActivity } from "../types";

interface RecentActivitiesProps {
	activities: RecentActivity[];
}

export default function RecentActivities({
	activities,
}: RecentActivitiesProps) {
	const getIcon = (type: RecentActivity["type"]) => {
		switch (type) {
			case "purchase":
				return {
					icon: Wallet,
					color: "text-emerald-600 dark:text-emerald-400",
				};
			case "viewing":
				return { icon: Eye, color: "text-blue-600 dark:text-blue-400" };
			case "offer":
				return { icon: Target, color: "text-amber-600 dark:text-amber-400" };
			case "document":
				return { icon: Shield, color: "text-purple-600 dark:text-purple-400" };
		}
	};

	const getStatusColor = (status: RecentActivity["status"]) => {
		switch (status) {
			case "completed":
				return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
			case "pending":
				return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400";
			case "scheduled":
				return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
		}
	};

	const getBgColor = (status: RecentActivity["status"]) => {
		switch (status) {
			case "completed":
				return "bg-emerald-100 dark:bg-emerald-900/20";
			case "pending":
				return "bg-amber-100 dark:bg-amber-900/20";
			case "scheduled":
				return "bg-blue-100 dark:bg-blue-900/20";
		}
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className="font-bold text-gray-900 dark:text-white">
						Recent Activities
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Latest transactions and updates
					</p>
				</div>
				<Clock className="w-5 h-5 text-gray-400" />
			</div>

			<div className="space-y-4">
				{activities.map((activity) => {
					const { icon: Icon, color } = getIcon(activity.type);
					return (
						<div
							key={activity.id}
							className="flex items-start gap-3">
							<div className={`p-2 rounded-lg ${getBgColor(activity.status)}`}>
								<Icon className={`w-4 h-4 ${color}`} />
							</div>

							<div className="flex-1">
								<div className="flex items-center justify-between mb-1">
									<span className="font-medium text-gray-900 dark:text-white capitalize">
										{activity.type}
									</span>
									{activity.amount && (
										<span className="font-bold text-gray-900 dark:text-white">
											{activity.amount}
										</span>
									)}
								</div>
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
									{activity.property}
								</p>
								<div className="flex items-center justify-between">
									<span className="text-xs text-gray-500">{activity.date}</span>
									<span
										className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(
											activity.status,
										)}`}>
										{activity.status}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<button className="w-full mt-6 py-2 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
				View All Activities
			</button>
		</div>
	);
}
