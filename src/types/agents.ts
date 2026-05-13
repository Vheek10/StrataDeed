/** @format */

/**
 * Comprehensive type definitions for StrataDeed AI Agents
 * Used across all 4 agents (Valuation, Matching, Due Diligence, Portfolio)
 */

// ============================================================================
// PROPERTY VALUATION AGENT TYPES
// ============================================================================

export interface ValuationRequest {
	propertyAddress: string;
	propertyType:
		| "residential"
		| "commercial"
		| "mixed-use"
		| "industrial"
		| "land";
	size?: number; // sqft
	bedrooms?: number;
	bathrooms?: number;
	lotSize?: number; // sqft
	yearBuilt?: number;
	condition?: "excellent" | "good" | "fair" | "poor";
	imageBase64?: string[]; // Base64-encoded images
	documentContent?: string; // Text extracted from documents
	marketContext?: string; // Additional market info
}

export interface ValuationResult {
	propertyAddress: string;
	estimatedValue: {
		min: number;
		max: number;
		midpoint: number;
		confidence: number; // 0-1
		currency: string;
	};
	riskScore: {
		overall: number; // 0-1
		breakdown: {
			structural: number;
			legal: number;
			market: number;
			environmental?: number;
		};
	};
	investmentRating: number; // 1-5 stars
	investmentSuitability: "excellent" | "good" | "fair" | "poor";
	reasoning: string[]; // Chain of thought
	marketComparables?: Array<{
		address: string;
		soldPrice: number;
		soldDate: string;
		similarity: number; // 0-1
	}>;
	sources: string[];
	timestamp: string;
}

// ============================================================================
// INVESTOR MATCHING AGENT TYPES
// ============================================================================

export interface InvestorProfile {
	riskTolerance: "conservative" | "moderate" | "aggressive";
	budget: number; // USD
	investmentPreferences: string[]; // e.g., ["residential", "strong_yield", "urban"]
	excludeGeographies?: string[];
	desiredYieldTarget?: number; // e.g., 6.5
	portfolioCompleteness?: "diversified" | "concentrated";
	investmentHorizon?: "short" | "medium" | "long";
}

export interface MatchedProperty {
	propertyId: string; // On-chain object ID
	address: string;
	fitScore: number; // 0-1
	reasoning: string; // Why it matched
	expectedYield: number; // Percentage
	riskLevel: "low" | "medium" | "high";
	tokenPrice: number;
	fractionalShares: number; // Min fractional ownership
	valuation: number;
	matchDetails: {
		riskAlignment: number;
		yieldAlignment: number;
		geographicPreference: number;
		diversificationBenefit: number;
	};
}

export interface InvestorMatchingResult {
	investorProfile: InvestorProfile;
	matches: MatchedProperty[];
	totalAvailableProperties: number;
	summary: string;
	timestamp: string;
}

// ============================================================================
// DUE DILIGENCE & DOCUMENT INTELLIGENCE AGENT TYPES
// ============================================================================

export interface DocumentAnalysisRequest {
	documentContent: string; // OCR'd or extracted text
	documentType:
		| "deed"
		| "title_report"
		| "inspection_report"
		| "contract"
		| "survey"
		| "other";
	propertyAddress?: string;
	documentDate?: string;
}

export interface RiskItem {
	severity: "critical" | "high" | "medium" | "low";
	type: string; // e.g., "Lien", "Easement", "Zoning Violation"
	description: string;
	recommendation: string;
	potentialCost?: number;
}

export interface KeyTerm {
	label: string;
	value: string | number | boolean;
}

export interface DueDiligenceResult {
	documentSummary: {
		title: string;
		date?: string;
		parties: string[];
		propertyDescription: string;
	};
	risks: RiskItem[];
	keyTerms: KeyTerm[];
	overallRiskScore: number; // 0-1
	riskCategory: "low_risk" | "moderate_risk" | "high_risk" | "critical_risk";
	reasoning: string[]; // Chain of thought
	recommendedActions: string[];
	timestamp: string;
}

// ============================================================================
// PORTFOLIO MANAGER AGENT TYPES
// ============================================================================

export interface PortfolioToken {
	propertyId: string;
	address: string;
	ownershipShare: number; // 0-1
	currentValue: number;
	tokenQuantity: number;
	tokenPrice: number;
	expectedYield: number;
	riskLevel: "low" | "medium" | "high";
	acquiredDate: string;
	performance: {
		valueGain: number; // Percentage
		yieldEarned: number; // USD
		timeHeld: string; // e.g., "6 months"
	};
}

export interface PortfolioAnalysis {
	totalValue: number;
	tokens: PortfolioToken[];
	allocation: Record<string, number>; // e.g., { "residential": 0.55, "commercial": 0.25 }
	targetAllocation?: Record<string, number>;
	allocationDrift: number; // Percentage deviation from target
	diversificationScore: number; // 0-1
	totalExpectedYield: number; // Percentage
	performanceMetrics: {
		currentYield: number; // Percentage
		averageHoldingPeriod: string;
		totalGain: number;
		totalLoss: number;
	};
}

export interface RebalancingRecommendation {
	action: "buy" | "sell" | "hold";
	propertyId: string;
	address: string;
	reason: string;
	targetShare?: number;
	currentShare: number;
	suggestedQuantity?: number;
	expectedImpact: string;
}

export interface PortfolioOpportunity {
	type:
		| "new_property"
		| "yield_improvement"
		| "diversification"
		| "risk_reduction";
	message: string;
	propertyId?: string;
	detailedAnalysis: string;
}

export interface PortfolioManagerResult {
	walletAddress: string;
	portfolio: PortfolioAnalysis;
	recommendations: RebalancingRecommendation[];
	opportunities: PortfolioOpportunity[];
	alerts: Array<{
		severity: "info" | "warning" | "critical";
		message: string;
		actionRequired?: boolean;
	}>;
	reasoning: string[]; // Chain of thought
	nextReviewDate: string;
	timestamp: string;
}

// ============================================================================
// SHARED AGENT TYPES
// ============================================================================

export interface AgentMemory {
	agentType: "valuation" | "matching" | "due_diligence" | "portfolio";
	conversationHistory: Array<{
		role: "user" | "assistant";
		content: string;
		timestamp: string;
	}>;
	userPreferences: Record<string, any>;
	analysisCache: Record<string, any>;
	lastUpdated: string;
}

export interface AgentAPIResponse<T> {
	success: boolean;
	data?: T;
	error?: {
		code: string;
		message: string;
		details?: string;
	};
	metadata?: {
		processingTimeMs: number;
		tokensUsed?: number;
	};
}

// ============================================================================
// UI & COMPONENT TYPES
// ============================================================================

export interface ReasoningStep {
	step: number;
	title: string;
	content: string;
	confidence?: number;
}

export interface ConfidenceLevel {
	score: number; // 0-1
	label: "low" | "moderate" | "high" | "very_high";
	explanation: string;
}

export interface LoadingState {
	isLoading: boolean;
	progress: number; // 0-100
	currentStep: string;
	estimatedTimeMs?: number;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export class AgentError extends Error {
	constructor(
		public code: string,
		message: string,
		public statusCode: number = 500,
		public details?: string,
	) {
		super(message);
		this.name = "AgentError";
	}
}

export class ValidationError extends AgentError {
	constructor(message: string, details?: string) {
		super("VALIDATION_ERROR", message, 400, details);
		this.name = "ValidationError";
	}
}

export class OpenAIError extends AgentError {
	constructor(message: string, details?: string) {
		super("OPENAI_ERROR", message, 503, details);
		this.name = "OpenAIError";
	}
}

export class BlockchainError extends AgentError {
	constructor(message: string, details?: string) {
		super("BLOCKCHAIN_ERROR", message, 502, details);
		this.name = "BlockchainError";
	}
}
