/** @format */

/**
 * ReasoningDisplay Component
 * Shows agent's chain-of-thought reasoning with animation
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReasoningDisplayProps {
	steps: string[];
	isExpanded?: boolean;
	title?: string;
	className?: string;
}

export const ReasoningDisplay: React.FC<ReasoningDisplayProps> = ({
	steps,
	isExpanded = false,
	title = "Agent Reasoning",
	className,
}) => {
	const [expanded, setExpanded] = useState(isExpanded);

	if (!steps || steps.length === 0) {
		return null;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: 0.3 }}
			className={cn(
				"bg-gray-50 border border-gray-200/60 rounded-2xl overflow-hidden",
				className,
			)}>
			{/* Header */}
			<button
				onClick={() => setExpanded(!expanded)}
				className="w-full flex items-center justify-between gap-4 px-6 py-4 lg:py-5 text-left hover:bg-gray-100/50 transition-colors group">
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
						<span className="text-[11px] font-black font-montserrat">AI</span>
					</div>
					<span className="text-sm lg:text-[15px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors font-montserrat">
						{title}
					</span>
					<span className="text-[10px] font-black uppercase text-gray-400 px-2 py-1 bg-gray-100 rounded-full font-montserrat">
						{steps.length} steps
					</span>
				</div>
				<motion.div
					animate={{ rotate: expanded ? 180 : 0 }}
					transition={{ duration: 0.3 }}
					className="text-gray-400 group-hover:text-gray-600">
					<ChevronDown className="w-5 h-5" />
				</motion.div>
			</button>

			{/* Content */}
			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="overflow-hidden border-t border-gray-200/60">
						<div className="px-6 py-4 lg:py-5 space-y-3 lg:space-y-4">
							{steps.map((step, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1, duration: 0.3 }}
									className="flex gap-3 lg:gap-4">
									{/* Step number */}
									<div className="flex items-start justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-blue-600 text-white text-[11px] lg:text-xs font-black font-montserrat flex-shrink-0 mt-0.5">
										{index + 1}
									</div>

									{/* Step content */}
									<div className="flex-1 pt-0.5">
										<p className="text-xs lg:text-sm text-gray-700 leading-relaxed font-medium font-montserrat">
											{step}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

/**
 * Simplified step indicator (used in linear workflows)
 */
interface StepIndicatorProps {
	steps: string[];
	currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
	steps,
	currentStep,
}) => {
	return (
		<div className="space-y-3">
			{steps.map((step, index) => (
				<div
					key={index}
					className="flex items-center gap-3">
					<motion.div
						animate={{
							scale: index === currentStep ? 1.1 : 1,
							backgroundColor:
								index < currentStep
									? "#2563eb"
									: index === currentStep
										? "#0ea5e9"
										: "#e5e7eb",
						}}
						transition={{ duration: 0.2 }}
						className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 font-montserrat">
						{index < currentStep ? "✓" : index + 1}
					</motion.div>
					<span
						className={cn(
							"text-xs lg:text-sm font-medium transition-colors",
							index < currentStep
								? "text-gray-500 line-through"
								: index === currentStep
									? "text-blue-600 font-bold"
									: "text-gray-400",
						)}>
						{step}
					</span>
				</div>
			))}
		</div>
	);
};
