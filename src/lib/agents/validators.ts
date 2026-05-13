/** @format */

/**
 * Input/Output validation schemas for all agents
 * Uses Zod for type-safe validation
 */

import { z } from "zod";
import { ValidationError } from "@/types/agents";

// ============================================================================
// PROPERTY VALUATION AGENT SCHEMAS
// ============================================================================

export const ValuationRequestSchema = z.object({
	propertyAddress: z.string().min(5, "Address must be at least 5 characters"),
	propertyType: z.enum([
		"residential",
		"commercial",
		"mixed-use",
		"industrial",
		"land",
	]),
	size: z.number().positive("Size must be positive").optional(),
	bedrooms: z.number().int().nonnegative().optional(),
	bathrooms: z.number().nonnegative().optional(),
	lotSize: z.number().positive().optional(),
	yearBuilt: z.number().int().min(1800).max(2050).optional(),
	condition: z.enum(["excellent", "good", "fair", "poor"]).optional(),
	imageBase64: z.array(z.string()).optional(),
	documentContent: z.string().optional(),
	marketContext: z.string().optional(),
});

export const ValuationResultSchema = z.object({
	propertyAddress: z.string(),
	estimatedValue: z.object({
		min: z.number(),
		max: z.number(),
		midpoint: z.number(),
		confidence: z.number().min(0).max(1),
		currency: z.string(),
	}),
	riskScore: z.object({
		overall: z.number().min(0).max(1),
		breakdown: z.object({
			structural: z.number(),
			legal: z.number(),
			market: z.number(),
			environmental: z.number().optional(),
		}),
	}),
	investmentRating: z.number().min(1).max(5),
	investmentSuitability: z.enum(["excellent", "good", "fair", "poor"]),
	reasoning: z.array(z.string()),
	marketComparables: z
		.array(
			z.object({
				address: z.string(),
				soldPrice: z.number(),
				soldDate: z.string(),
				similarity: z.number().min(0).max(1),
			}),
		)
		.optional(),
	sources: z.array(z.string()),
	timestamp: z.string(),
});

// ============================================================================
// INVESTOR MATCHING AGENT SCHEMAS
// ============================================================================

export const InvestorProfileSchema = z.object({
	riskTolerance: z.enum(["conservative", "moderate", "aggressive"]),
	budget: z.number().positive("Budget must be greater than 0"),
	investmentPreferences: z
		.array(z.string())
		.min(1, "Must have at least one preference"),
	excludeGeographies: z.array(z.string()).optional(),
	desiredYieldTarget: z.number().nonnegative().optional(),
	portfolioCompleteness: z.enum(["diversified", "concentrated"]).optional(),
	investmentHorizon: z.enum(["short", "medium", "long"]).optional(),
});

export const MatchedPropertySchema = z.object({
	propertyId: z.string(),
	address: z.string(),
	fitScore: z.number().min(0).max(1),
	reasoning: z.string(),
	expectedYield: z.number(),
	riskLevel: z.enum(["low", "medium", "high"]),
	tokenPrice: z.number(),
	fractionalShares: z.number(),
	valuation: z.number(),
	matchDetails: z.object({
		riskAlignment: z.number(),
		yieldAlignment: z.number(),
		geographicPreference: z.number(),
		diversificationBenefit: z.number(),
	}),
});

export const InvestorMatchingResultSchema = z.object({
	investorProfile: InvestorProfileSchema,
	matches: z.array(MatchedPropertySchema),
	totalAvailableProperties: z.number(),
	summary: z.string(),
	timestamp: z.string(),
});

// ============================================================================
// DUE DILIGENCE AGENT SCHEMAS
// ============================================================================

export const DocumentAnalysisRequestSchema = z.object({
	documentContent: z
		.string()
		.min(50, "Document must be at least 50 characters"),
	documentType: z.enum([
		"deed",
		"title_report",
		"inspection_report",
		"contract",
		"survey",
		"other",
	]),
	propertyAddress: z.string().optional(),
	documentDate: z.string().optional(),
});

export const RiskItemSchema = z.object({
	severity: z.enum(["critical", "high", "medium", "low"]),
	type: z.string(),
	description: z.string(),
	recommendation: z.string(),
	potentialCost: z.number().optional(),
});

export const DueDiligenceResultSchema = z.object({
	documentSummary: z.object({
		title: z.string(),
		date: z.string().optional(),
		parties: z.array(z.string()),
		propertyDescription: z.string(),
	}),
	risks: z.array(RiskItemSchema),
	keyTerms: z.array(
		z.object({
			label: z.string(),
			value: z.union([z.string(), z.number(), z.boolean()]),
		}),
	),
	overallRiskScore: z.number().min(0).max(1),
	riskCategory: z.enum([
		"low_risk",
		"moderate_risk",
		"high_risk",
		"critical_risk",
	]),
	reasoning: z.array(z.string()),
	recommendedActions: z.array(z.string()),
	timestamp: z.string(),
});

// ============================================================================
// PORTFOLIO MANAGER AGENT SCHEMAS
// ============================================================================

export const PortfolioTokenSchema = z.object({
	propertyId: z.string(),
	address: z.string(),
	ownershipShare: z.number().min(0).max(1),
	currentValue: z.number(),
	tokenQuantity: z.number(),
	tokenPrice: z.number(),
	expectedYield: z.number(),
	riskLevel: z.enum(["low", "medium", "high"]),
	acquiredDate: z.string(),
	performance: z.object({
		valueGain: z.number(),
		yieldEarned: z.number(),
		timeHeld: z.string(),
	}),
});

export const PortfolioManagerResultSchema = z.object({
	walletAddress: z.string(),
	portfolio: z.object({
		totalValue: z.number(),
		tokens: z.array(PortfolioTokenSchema),
		allocation: z.record(z.string(), z.number()),
		targetAllocation: z.record(z.string(), z.number()).optional(),
		allocationDrift: z.number(),
		diversificationScore: z.number().min(0).max(1),
		totalExpectedYield: z.number(),
		performanceMetrics: z.object({
			currentYield: z.number(),
			averageHoldingPeriod: z.string(),
			totalGain: z.number(),
			totalLoss: z.number(),
		}),
	}),
	recommendations: z.array(
		z.object({
			action: z.enum(["buy", "sell", "hold"]),
			propertyId: z.string(),
			address: z.string(),
			reason: z.string(),
			targetShare: z.number().optional(),
			currentShare: z.number(),
		}),
	),
	opportunities: z.array(
		z.object({
			type: z.enum([
				"new_property",
				"yield_improvement",
				"diversification",
				"risk_reduction",
			]),
			message: z.string(),
			propertyId: z.string().optional(),
			detailedAnalysis: z.string(),
		}),
	),
	alerts: z.array(
		z.object({
			severity: z.enum(["info", "warning", "critical"]),
			message: z.string(),
			actionRequired: z.boolean().optional(),
		}),
	),
	reasoning: z.array(z.string()),
	nextReviewDate: z.string(),
	timestamp: z.string(),
});

// ============================================================================
// VALIDATION HELPER FUNCTIONS
// ============================================================================

/**
 * Safely validate data against a schema
 */
export function validateData<T>(
	data: unknown,
	schema: z.ZodSchema<T>,
	contextName: string,
): T {
	try {
		return schema.parse(data);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.issues
				.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
				.join("; ");
			throw new ValidationError(
				`${contextName} validation failed: ${errorMessages}`,
			);
		}
		throw new ValidationError(
			`${contextName} validation failed: ${String(error)}`,
		);
	}
}

/**
 * Partial validation (allows extra fields)
 */
export function validateDataPartial<T>(
	data: unknown,
	schema: z.ZodSchema<T> | z.ZodObject<any>,
	contextName: string,
): Partial<T> {
	try {
		let partialSchema = schema;
		if ("partial" in schema && typeof (schema as any).partial === "function") {
			partialSchema = (schema as z.ZodObject<any>).partial();
		}
		return (partialSchema as z.ZodSchema<T>).parse(data) as Partial<T>;
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.issues
				.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
				.join("; ");
			throw new ValidationError(
				`${contextName} validation failed: ${errorMessages}`,
			);
		}
		throw new ValidationError(
			`${contextName} validation failed: ${String(error)}`,
		);
	}
}
