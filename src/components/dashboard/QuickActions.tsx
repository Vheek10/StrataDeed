/** @format */

import { Plus, Download, BarChart3, Users } from "lucide-react";

interface QuickAction {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface QuickActionsProps {
	actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
	return (
		<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 text-white">
			<h3 className="font-bold mb-4">Quick Actions</h3>
			<div className="grid grid-cols-2 gap-3">
				{actions.map((action) => {
					const Icon = action.icon;
					return (
						<button
							key={action.id}
							className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex flex-col items-center justify-center">
							<Icon className="w-5 h-5 mb-2" />
							<span className="text-xs font-medium">{action.label}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
