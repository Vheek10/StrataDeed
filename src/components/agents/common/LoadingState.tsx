/** @format */

/**
 * LoadingState Component
 * Shows animated loading indicators with progress
 */

import React from "react";
import { motion } from "framer-motion";

interface LoadingStateProps {
	progress: number; // 0-100
	currentStep: string;
	estimatedTimeMs?: number;
	variant?: "default" | "compact" | "minimal";
}

export const LoadingState: React.FC<LoadingStateProps> = ({
	progress,
	currentStep,
	estimatedTimeMs,
	variant = "default",
}) => {
	const getProgressColor = () => {
		if (progress >= 80) return "bg-gradient-to-r from-green-500 to-emerald-500";
		if (progress >= 50) return "bg-gradient-to-r from-blue-500 to-cyan-500";
		if (progress >= 25) return "bg-gradient-to-r from-amber-500 to-orange-500";
		return "bg-gradient-to-r from-blue-600 to-blue-400";
	};

	const estimatedSeconds = estimatedTimeMs
		? Math.round(estimatedTimeMs / 1000)
		: null;

	if (variant === "minimal") {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="flex items-center gap-2">
				<div className="flex gap-1">
					{[0, 1, 2].map((i) => (
						<motion.div
							key={i}
							animate={{ scale: [1, 1.3, 1] }}
							transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
							className="w-2 h-2 bg-blue-600 rounded-full"
						/>
					))}
				</div>
				<span className="text-xs font-medium text-gray-600 font-montserrat">
					{currentStep}
				</span>
			</motion.div>
		);
	}

	if (variant === "compact") {
		return (
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className="bg-gray-50 border border-gray-200/60 rounded-xl p-4 space-y-3">
				<div className="flex items-center justify-between gap-2">
					<span className="text-xs font-black uppercase tracking-widest text-gray-400 font-montserrat">
						Processing
					</span>
					<span className="text-xs font-black text-gray-700 font-mclaren">
						{progress}%
					</span>
				</div>

				<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
					<motion.div
						animate={{ width: `${progress}%` }}
						transition={{ duration: 0.3 }}
						className={getProgressColor()}
					/>
				</div>

				<p className="text-xs font-medium text-gray-600 font-montserrat">
					{currentStep}
				</p>

				{estimatedSeconds && (
					<p className="text-[10px] text-gray-400 font-montserrat">
						Estimated: {estimatedSeconds}s remaining
					</p>
				)}
			</motion.div>
		);
	}

	// Default variant
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/60 rounded-2xl p-8 lg:p-12 space-y-6">
			{/* Loading Animation */}
			<div className="flex justify-center">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					className="w-16 h-16 border-4 border-gray-100 border-t-blue-600 rounded-full"
				/>
			</div>

			{/* Progress Section */}
			<div className="space-y-4">
				<div>
					<div className="flex items-center justify-between gap-2 mb-2">
						<span className="text-sm lg:text-base font-black uppercase tracking-widest text-gray-400 font-montserrat">
							Analyzing Property
						</span>
						<motion.span
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 1.5, repeat: Infinity }}
							className="text-sm lg:text-base font-black text-blue-600 font-mclaren">
							{progress}%
						</motion.span>
					</div>

					<div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-sm">
						<motion.div
							animate={{ width: `${progress}%` }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className={getProgressColor()}
						/>
					</div>
				</div>

				{/* Current Step */}
				<div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/60">
					<p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-2 font-montserrat">
						Current Step
					</p>
					<motion.div
						key={currentStep}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3 }}
						className="flex items-center gap-2">
						<motion.div
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ duration: 0.8, repeat: Infinity }}
							className="w-2 h-2 bg-blue-600 rounded-full"
						/>
						<span className="text-sm lg:text-base font-bold text-gray-700 font-montserrat">
							{currentStep}
						</span>
					</motion.div>
				</div>

				{/* Estimated Time */}
				{estimatedSeconds && (
					<div className="text-center pt-2">
						<p className="text-xs text-gray-500 font-medium font-montserrat">
							Estimated time:{" "}
							<span className="font-bold text-gray-700">
								{estimatedSeconds}s
							</span>
						</p>
					</div>
				)}
			</div>

			{/* Animated Tips */}
			<div className="pt-4 border-t border-blue-200/40">
				<p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3 font-montserrat">
					What's happening
				</p>
				<ul className="space-y-2 text-xs text-gray-600 font-medium font-montserrat">
					{progress < 40 && (
						<>
							<li>✓ Validating property data</li>
							<li>→ Extracting property features</li>
						</>
					)}
					{progress >= 40 && progress < 70 && (
						<>
							<li>✓ Property data validated</li>
							<li>✓ Features extracted</li>
							<li>→ Analyzing market comparables</li>
						</>
					)}
					{progress >= 70 && (
						<>
							<li>✓ Property data validated</li>
							<li>✓ Features extracted</li>
							<li>✓ Market analysis complete</li>
							<li>→ Generating valuation estimate</li>
						</>
					)}
					{progress === 100 && (
						<>
							<li>✓ Property data validated</li>
							<li>✓ Features extracted</li>
							<li>✓ Market analysis complete</li>
							<li>✓ Valuation complete</li>
						</>
					)}
				</ul>
			</div>
		</motion.div>
	);
};

/**
 * Skeleton Loader for results cards
 */
export const ResultSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
	return (
		<motion.div className="space-y-4">
			{[...Array(count)].map((_, i) => (
				<motion.div
					key={i}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: i * 0.1 }}
					className="bg-gray-50 border border-gray-200/60 rounded-2xl p-6 space-y-4">
					{/* Header */}
					<div className="flex items-center gap-4">
						<motion.div
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 1.5, repeat: Infinity }}
							className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg"
						/>
						<div className="flex-1 space-y-2">
							<motion.div
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 1.5, repeat: Infinity }}
								className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/3"
							/>
							<motion.div
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
								className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/4"
							/>
						</div>
					</div>

					{/* Content lines */}
					{[...Array(2)].map((_, j) => (
						<motion.div
							key={j}
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								delay: (j + 2) * 0.1,
							}}
							className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded"
						/>
					))}

					{/* Last line shorter */}
					<motion.div
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
						className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-2/3"
					/>
				</motion.div>
			))}
		</motion.div>
	);
};
