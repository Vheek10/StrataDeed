/** @format */

import { NextRequest, NextResponse } from "next/server";
import {
	InvestorProfile,
	InvestorMatchingResult,
	AgentAPIResponse,
} from "@/types/agents";
import {
	InvestorProfileSchema,
	InvestorMatchingResultSchema,
} from "@/lib/agents/validators";
import { sendJSONCompletion } from "@/lib/agents/openai-client";
import { formatPrompt, createSystemPrompt } from "@/lib/agents/prompts";

export async function POST(request: NextRequest) {
	const startTime = Date.now();
	console.log("[Investor Matching] Processing request...");

	try {
		const body = await request.json();
		console.log("[Investor Matching] Received profile:", {
			riskTolerance: body.riskTolerance,
			budget: body.budget,
		});

		// Validate input
		let profile: InvestorProfile;
		try {
			profile = InvestorProfileSchema.parse(body);
			console.log("[Investor Matching] Profile validation: SUCCESS");
		} catch (validationErr) {
			console.error("[Investor Matching] Validation error:", validationErr);
			return NextResponse.json(
				{
					success: false,
					error: {
						message: "Invalid investor profile",
						details: String(validationErr),
					},
				},
				{ status: 400 },
			);
		}

		// Format prompts
		console.log("[Investor Matching] Formatting prompts...");
		const systemPrompt = createSystemPrompt("matching", {
			riskTolerance: profile.riskTolerance,
			investmentHorizon: profile.investmentHorizon,
		});

		const userPrompt = formatPrompt("MATCHING_PROMPT_TEMPLATE", {
			budget: profile.budget,
			riskTolerance: profile.riskTolerance,
			excludeGeographies: profile.excludeGeographies?.join(", ") || "None",
			investmentPreferences: profile.investmentPreferences?.join(", ") || "Any",
			investmentHorizon: profile.investmentHorizon,
			desiredYieldTarget: profile.desiredYieldTarget,
			portfolioCompleteness: profile.portfolioCompleteness || "diversified",
		});

		// Call OpenAI
		console.log("[Investor Matching] Calling OpenAI API...");
		const result = await sendJSONCompletion<InvestorMatchingResult>(
			[
				{ role: "system", content: systemPrompt },
				{ role: "user", content: userPrompt },
			],
			undefined,
			{
				temperature: 0.7,
				maxTokens: 3000,
			},
		);

		console.log("[Investor Matching] OpenAI response received");

		// Validate output
		let validatedResult: InvestorMatchingResult;
		try {
			validatedResult = InvestorMatchingResultSchema.parse(result);
			console.log("[Investor Matching] Output validation: SUCCESS");
		} catch (validationErr) {
			console.error(
				"[Investor Matching] Output validation error:",
				validationErr,
			);
			return NextResponse.json(
				{
					success: false,
					error: {
						message: "Failed to validate matching results",
						details: String(validationErr),
					},
				},
				{ status: 500 },
			);
		}

		const processingTime = Date.now() - startTime;
		console.log(
			`[Investor Matching] Processing complete in ${processingTime}ms`,
		);

		return NextResponse.json({
			success: true,
			data: validatedResult,
			metadata: {
				processingTimeMs: processingTime,
				tokensUsed: Math.ceil(userPrompt.length / 4),
			},
		} as AgentAPIResponse<InvestorMatchingResult>);
	} catch (err) {
		console.error("[Investor Matching] Unexpected error:", err);

		if (err instanceof Error && err.message.includes("OpenAI")) {
			return NextResponse.json(
				{
					success: false,
					error: {
						message: "OpenAI service error",
						details: err.message,
					},
				},
				{ status: 503 },
			);
		}

		return NextResponse.json(
			{
				success: false,
				error: {
					message: "Internal server error",
					details: err instanceof Error ? err.message : "Unknown error",
				},
			},
			{ status: 500 },
		);
	}
}
