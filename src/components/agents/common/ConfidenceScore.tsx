/** @format */

/**
 * ConfidenceScore Component
 * Displays confidence/risk scores with visual gauges
 */

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConfidenceScoreProps {
	score: number; // 0-1
	label?: string;
	size?: "sm" | "md" | "lg";
	showPercentage?: boolean;
	explanation?: string;
}

export const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({
	score,
	label = "Confidence",
	size = "md",
	showPercentage = true,
	explanation,
}) => {
	const percentage = Math.round(score * 100);

	const getColor = () => {
		if (percentage >= 85) return "text-green-600";
		if (percentage >= 70) return "text-blue-600";
		if (percentage >= 50) return "text-amber-600";
		return "text-red-600";
	};

	const getGaugeColor = () => {
		if (percentage >= 85)
			return "bg-gradient-to-r from-green-500 to-emerald-500";
		if (percentage >= 70) return "bg-gradient-to-r from-blue-500 to-cyan-500";
		if (percentage >= 50)
			return "bg-gradient-to-r from-amber-500 to-orange-500";
		return "bg-gradient-to-r from-red-500 to-rose-500";
	};

	const getConfidenceLabel = () => {
		if (percentage >= 85) return "Very High";
		if (percentage >= 70) return "High";
		if (percentage >= 50) return "Moderate";
		return "Low";
	};

	const sizeClasses = {
		sm: {
			gauge: "h-1.5",
			text: "text-xs",
			number: "text-base lg:text-lg",
		},
		md: {
			gauge: "h-2",
			text: "text-sm",
			number: "text-lg lg:text-xl",
		},
		lg: {
			gauge: "h-3",
			text: "text-base",
			number: "text-2xl lg:text-3xl",
		},
	};

	const classes = sizeClasses[size];

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}>
			<div className="space-y-2">
				{/* Header */}
				<div className="flex items-baseline justify-between gap-2">
					<span
						className={cn(
							"font-black uppercase tracking-widest font-montserrat",
							classes.text,
						)}>
						{label}
					</span>
					{showPercentage && (
						<span
							className={cn(
								"font-black font-mclaren",
								classes.number,
								getColor(),
							)}>
							{percentage}%
						</span>
					)}
				</div>

				{/* Gauge */}
				<div
					className={cn(
						"w-full bg-gray-100 rounded-full overflow-hidden",
						classes.gauge,
					)}>
					<motion.div
						initial={{ width: "0%" }}
						animate={{ width: `${percentage}%` }}
						transition={{ duration: 1, ease: "easeOut" }}
						className={cn("h-full rounded-full", getGaugeColor())}
					/>
				</div>

				{/* Label */}
				<div className="flex items-center justify-between">
					<span
						className={cn(
							"font-bold text-gray-600 font-montserrat",
							classes.text,
						)}>
						{getConfidenceLabel()}
					</span>
					{explanation && (
						<span
							className={cn(
								"text-gray-500 font-medium font-montserrat",
								classes.text,
							)}>
							{explanation}
						</span>
					)}
				</div>
			</div>
		</motion.div>
	);
};

/**
 * Risk Score Component (inverse of confidence)
 */
interface RiskScoreProps {
	score: number; // 0-1
	label?: string;
	showBreakdown?: boolean;
	breakdown?: Record<string, number>;
}

export const RiskScore: React.FC<RiskScoreProps> = ({
	score,
	label = "Risk Score",
	showBreakdown = false,
	breakdown,
}) => {
	const percentage = Math.round(score * 100);

	const getColor = () => {
		if (percentage <= 30) return "text-green-600";
		if (percentage <= 50) return "text-blue-600";
		if (percentage <= 70) return "text-amber-600";
		return "text-red-600";
	};

	const getRiskLabel = () => {
		if (percentage <= 30) return "Low Risk";
		if (percentage <= 50) return "Moderate Risk";
		if (percentage <= 70) return "High Risk";
		return "Critical Risk";
	};

	const getGaugeColor = () => {
		if (percentage <= 30)
			return "bg-gradient-to-r from-green-500 to-emerald-500";
		if (percentage <= 50) return "bg-gradient-to-r from-blue-500 to-cyan-500";
		if (percentage <= 70)
			return "bg-gradient-to-r from-amber-500 to-orange-500";
		return "bg-gradient-to-r from-red-500 to-rose-500";
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}
			className="space-y-4">
			{/* Main Score */}
			<div className="space-y-2">
				<div className="flex items-baseline justify-between gap-2">
					<span className="font-black uppercase tracking-widest text-sm font-montserrat">
						{label}
					</span>
					<span className={cn("font-black text-2xl font-mclaren", getColor())}>
						{percentage}%
					</span>
				</div>

				<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
					<motion.div
						initial={{ width: "0%" }}
						animate={{ width: `${percentage}%` }}
						transition={{ duration: 1, ease: "easeOut" }}
						className={cn("h-full rounded-full", getGaugeColor())}
					/>
				</div>

				<span className="text-sm font-bold text-gray-600 font-montserrat">
					{getRiskLabel()}
				</span>
			</div>

			{/* Breakdown */}
			{showBreakdown && breakdown && (
				<div className="space-y-2 pt-4 border-t border-gray-200/60">
					<p className="text-[10px] font-black uppercase tracking-widest text-gray-400 font-montserrat">
						Risk Breakdown
					</p>
					<div className="space-y-2">
						{Object.entries(breakdown).map(([key, value]) => (
							<div
								key={key}
								className="flex items-center gap-2">
								<div className="flex-1">
									<div className="flex justify-between items-center mb-1">
										<span className="text-xs font-bold capitalize text-gray-600 font-montserrat">
											{key.replace(/_/g, " ")}
										</span>
										<span className="text-xs font-black text-gray-700 font-mclaren">
											{Math.round(value * 100)}%
										</span>
									</div>
									<div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
										<motion.div
											initial={{ width: "0%" }}
											animate={{ width: `${value * 100}%` }}
											transition={{ duration: 0.8, delay: 0.1 }}
											className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</motion.div>
	);
};

/**
 * Multi-score card (shows multiple metrics at once)
 */
interface MultiScoreProps {
	scores: Array<{
		label: string;
		value: number;
		type?: "confidence" | "risk";
	}>;
	title?: string;
}

export const MultiScore: React.FC<MultiScoreProps> = ({ scores, title }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="bg-white border border-gray-200/60 rounded-2xl p-6 lg:p-8">
			{title && (
				<h3 className="text-lg font-black text-gray-900 mb-6 font-mclaren">
					{title}
				</h3>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{scores.map((score, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}>
						{score.type === "risk" ? (
							<RiskScore
								score={score.value}
								label={score.label}
							/>
						) : (
							<ConfidenceScore
								score={score.value}
								label={score.label}
							/>
						)}
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};
