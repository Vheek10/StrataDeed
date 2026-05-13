/** @format */

/**
 * Custom Hook: useValuationAgent
 * Manages Property Valuation Agent state, API calls, and reasoning display
 */

import { useState, useCallback } from "react";
import {
	ValuationRequest,
	ValuationResult,
	LoadingState,
} from "@/types/agents";

interface UseValuationAgentState {
	result: ValuationResult | null;
	loading: LoadingState;
	error: { code: string; message: string; details?: string } | null;
	tokensUsed: number;
	processingTime: number;
}

interface UseValuationAgentActions {
	analyze: (request: ValuationRequest) => Promise<void>;
	reset: () => void;
	exportResult: () => string;
	saveToDraft: () => void;
}

/**
 * Hook for managing property valuation analysis
 */
export function useValuationAgent(): UseValuationAgentState &
	UseValuationAgentActions {
	const [result, setResult] = useState<ValuationResult | null>(null);
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

	/**
	 * Main analysis function
	 */
	const analyze = useCallback(async (request: ValuationRequest) => {
		setLoading({
			isLoading: true,
			progress: 10,
			currentStep: "Preparing property data...",
		});
		setError(null);
		setResult(null);

		const startTime = Date.now();

		try {
			// Simulate progress updates
			setTimeout(() => {
				setLoading({
					isLoading: true,
					progress: 30,
					currentStep: "Analyzing property features...",
				});
			}, 500);

			setTimeout(() => {
				setLoading({
					isLoading: true,
					progress: 60,
					currentStep: "Assessing market comparables...",
				});
			}, 1500);

			setTimeout(() => {
				setLoading({
					isLoading: true,
					progress: 80,
					currentStep: "Calculating valuation and risks...",
				});
			}, 2500);

			// Call API
			const response = await fetch("/api/agents/valuate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(request),
			});

			const responseData = await response.json();

			if (!response.ok) {
				throw new Error(responseData.error?.message || "Valuation failed");
			}

			if (!responseData.success) {
				setError(responseData.error);
				setLoading({ isLoading: false, progress: 0, currentStep: "" });
				return;
			}

			// Save result
			setResult(responseData.data);
			setTokensUsed(responseData.metadata?.tokensUsed || 0);
			setProcessingTime(responseData.metadata?.processingTimeMs || 0);

			// Cache to localStorage
			saveToDraft();

			setLoading({ isLoading: false, progress: 100, currentStep: "Complete" });
		} catch (err) {
			const message = err instanceof Error ? err.message : "An error occurred";
			setError({
				code: "ANALYSIS_ERROR",
				message,
			});
			setLoading({ isLoading: false, progress: 0, currentStep: "" });
		}
	}, []);

	/**
	 * Reset to initial state
	 */
	const reset = useCallback(() => {
		setResult(null);
		setError(null);
		setLoading({ isLoading: false, progress: 0, currentStep: "" });
		setTokensUsed(0);
		setProcessingTime(0);
		localStorage.removeItem("valuation_agent_draft");
	}, []);

	/**
	 * Export result as JSON
	 */
	const exportResult = useCallback(() => {
		if (!result) return "{}";
		return JSON.stringify(result, null, 2);
	}, [result]);

	/**
	 * Save result to browser cache (localStorage)
	 */
	const saveToDraft = useCallback(() => {
		if (result) {
			try {
				localStorage.setItem(
					"valuation_agent_draft",
					JSON.stringify({
						result,
						timestamp: new Date().toISOString(),
						tokensUsed,
						processingTime,
					}),
				);
			} catch (err) {
				console.warn("Failed to save to localStorage:", err);
			}
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
 * Hook to load cached valuation from localStorage
 */
export function useValuationCache() {
	const [cached, setCached] = useState<{
		result: ValuationResult;
		timestamp: string;
	} | null>(null);

	const loadFromCache = useCallback(() => {
		try {
			const cached = localStorage.getItem("valuation_agent_draft");
			if (cached) {
				const parsed = JSON.parse(cached);
				setCached(parsed);
				return parsed;
			}
		} catch (err) {
			console.warn("Failed to load from localStorage:", err);
		}
		return null;
	}, []);

	const clearCache = useCallback(() => {
		localStorage.removeItem("valuation_agent_draft");
		setCached(null);
	}, []);

	return { cached, loadFromCache, clearCache };
}

/**
 * Hook to format valuation result for display
 */
export function useValuationFormatter(result: ValuationResult | null) {
	const formatCurrency = (value: number): string => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(value);
	};

	const formatRating = (rating: number): { label: string; color: string } => {
		if (rating >= 4.5) return { label: "Excellent", color: "green" };
		if (rating >= 3.5) return { label: "Good", color: "blue" };
		if (rating >= 2.5) return { label: "Fair", color: "yellow" };
		return { label: "Poor", color: "red" };
	};

	const formatConfidence = (confidence: number): string => {
		const percent = Math.round(confidence * 100);
		if (percent >= 85) return "Very High";
		if (percent >= 70) return "High";
		if (percent >= 50) return "Moderate";
		return "Low";
	};

	const formatRiskScore = (score: number): { label: string; color: string } => {
		if (score <= 0.3) return { label: "Low Risk", color: "green" };
		if (score <= 0.5) return { label: "Moderate Risk", color: "blue" };
		if (score <= 0.7) return { label: "High Risk", color: "orange" };
		return { label: "Very High Risk", color: "red" };
	};

	return {
		result,
		formatCurrency,
		formatRating,
		formatConfidence,
		formatRiskScore,
	};
}
