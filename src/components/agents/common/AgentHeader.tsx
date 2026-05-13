/** @format */

/**
 * AgentHeader Component
 * Shared header for all agent components
 */

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AgentHeaderProps {
	title: string;
	description: string;
	icon?: React.ReactNode;
	badge?: string;
}

export const AgentHeader: React.FC<AgentHeaderProps> = ({
	title,
	description,
	icon,
	badge,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="mb-8 lg:mb-12">
			<div className="flex items-start justify-between gap-4 mb-4">
				<div className="flex items-center gap-3">
					{icon ? (
						<div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
							{icon}
						</div>
					) : (
						<div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
							<Sparkles className="w-6 h-6 lg:w-7 lg:h-7" />
						</div>
					)}
					<div>
						<h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-mclaren">
							{title}
						</h1>
						{badge && (
							<span className="inline-block mt-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest font-montserrat">
								{badge}
							</span>
						)}
					</div>
				</div>
			</div>
			<p className="text-sm lg:text-base text-gray-600 font-medium font-montserrat max-w-2xl">
				{description}
			</p>
		</motion.div>
	);
};
