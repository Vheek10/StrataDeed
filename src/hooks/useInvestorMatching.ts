/** @format */

import { useState, useCallback } from "react";
import {
	InvestorProfile,
	InvestorMatchingResult,
	LoadingState,
	AgentAPIResponse,
} from "@/types/agents";

/**
 * Main hook for managing investor matching agent state and API calls
 */
export function useInvestorMatching() {
	const [result, setResult] = useState<InvestorMatchingResult | null>(null);
	const [loading, setLoading] = useState<LoadingState>({
		isLoading: false,
		progress: 0,
		currentStep: "",
	});
	const [error, setError] = useState<{
		code: string;
		message: string;
		details?: string;
	} | null>(null);
	const [tokensUsed, setTokensUsed] = useState(0);
	const [processingTime, setProcessingTime] = useState(0);

	const analyze = useCallback(async (profile: InvestorProfile) => {
		setLoading({ isLoading: true, progress: 0, currentStep: "Initializing" });
		setError(null);
		setResult(null);
		const startTime = Date.now();

		// Simulate progress updates
		const progressSteps = [
			{ progress: 10, step: "Analyzing investor profile..." },
			{ progress: 30, step: "Scanning property database..." },
			{ progress: 60, step: "Calculating fit scores..." },
			{ progress: 80, step: "Finalizing matches..." },
		];

		let stepIndex = 0;

		const progressInterval = setInterval(() => {
			if (stepIndex < progressSteps.length) {
				const { progress, step } = progressSteps[stepIndex];
				setLoading({ isLoading: true, progress, currentStep: step });
				stepIndex++;
			}
		}, 800);

		try {
			const response = await fetch("/api/agents/match", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(profile),
			});

			clearInterval(progressInterval);

			if (!response.ok) {
				const data = await response.json();
				setLoading({ isLoading: false, progress: 0, currentStep: "" });
				setError({
					code: String(response.status),
					message: data.error?.message || "Failed to match properties",
					details: data.error?.details,
				});
				return;
			}

			const data: AgentAPIResponse<InvestorMatchingResult> =
				await response.json();

			setLoading({ isLoading: false, progress: 100, currentStep: "Complete" });
			setResult(data.data || null);
			setTokensUsed(data.metadata?.tokensUsed || 0);
			setProcessingTime(data.metadata?.processingTimeMs || 0);
		} catch (err) {
			clearInterval(progressInterval);
			setLoading({ isLoading: false, progress: 0, currentStep: "" });
			setError({
				code: "NETWORK_ERROR",
				message: "Failed to connect to matching service",
				details: err instanceof Error ? err.message : "Unknown error occurred",
			});
		}
	}, []);

	const reset = useCallback(() => {
		setResult(null);
		setLoading({ isLoading: false, progress: 0, currentStep: "" });
		setError(null);
		setTokensUsed(0);
		setProcessingTime(0);
	}, []);

	const exportResult = useCallback(() => {
		if (!result) return null;

		return {
			timestamp: result.timestamp,
			matches: result.matches,
			summary: {
				totalMatched: result.matches.length,
				averageFitScore: result.matches.length
					? (
							result.matches.reduce((sum: number, p) => sum + p.fitScore, 0) /
							result.matches.length
						).toFixed(2)
					: "0.00",
				summary: result.summary,
			},
		};
	}, [result]);

	const saveToDraft = useCallback(() => {
		if (!result) return;
		try {
			const draft = {
				result,
				timestamp: new Date().toISOString(),
				metadata: { tokensUsed, processingTime },
			};
			localStorage.setItem("investorMatching_draft", JSON.stringify(draft));
			return true;
		} catch {
			return false;
		}
	}, [result, tokensUsed, processingTime]);

	return {
		result,
		loading,
		error,
		tokensUsed,
		processingTime,
		analyze,
		reset,
		exportResult,
		saveToDraft,
	};
}

/**
 * Hook for managing cached matching results
 */
export function useInvestorMatchingCache() {
	const [cache, setCache] = useState<Map<string, InvestorMatchingResult>>(
		new Map(),
	);

	const getCached = useCallback(
		(key: string): InvestorMatchingResult | null => {
			return cache.get(key) || null;
		},
		[cache],
	);

	const setCached = useCallback(
		(key: string, result: InvestorMatchingResult) => {
			setCache((prev) => new Map(prev).set(key, result));
		},
		[],
	);

	const clearCache = useCallback(() => {
		setCache(new Map());
	}, []);

	return { getCached, setCached, clearCache, cache };
}

/**
 * Hook for formatting matching data for display
 */
export function useInvestorMatchingFormatter() {
	const formatPercentage = (value: number): string => {
		return `${(value * 100).toFixed(1)}%`;
	};

	const formatRating = (score: number): { label: string; color: string } => {
		if (score >= 4.5)
			return { label: "Excellent Match", color: "text-emerald-600" };
		if (score >= 3.5) return { label: "Strong Match", color: "text-blue-600" };
		if (score >= 2.5) return { label: "Good Match", color: "text-amber-600" };
		return { label: "Fair Match", color: "text-orange-600" };
	};

	const formatFitReason = (reason: string): string => {
		const reasons: { [key: string]: string } = {
			risk_alignment: "Risk profile matches investment goals",
			yield_potential: "Expected returns align with targets",
			location_preference: "Property in preferred location",
			asset_class_match: "Asset class diversifies portfolio",
			liquidity_match: "Timeline aligns with liquidity needs",
			market_conditions: "Favorable market conditions",
		};
		return reasons[reason] || reason;
	};

	const formatCurrency = (value: number): string => {
		return `$${Math.round(value).toLocaleString()}`;
	};

	const formatScore = (score: number): string => {
		return `${(score * 100).toFixed(0)}%`;
	};

	return {
		formatPercentage,
		formatRating,
		formatFitReason,
		formatCurrency,
		formatScore,
	};
}
