/** @format */

/**
 * API Route: POST /api/agents/valuate
 * Property Valuation & Analysis Agent
 */

import { NextRequest, NextResponse } from "next/server";
import { sendJSONCompletion } from "@/lib/agents/openai-client";
import {
	formatPrompt,
	createSystemPrompt,
	VALUATION_PROMPT_TEMPLATE,
} from "@/lib/agents/prompts";
import {
	validateData,
	ValuationRequestSchema,
	ValuationResultSchema,
} from "@/lib/agents/validators";
import {
	ValuationRequest,
	ValuationResult,
	AgentAPIResponse,
	AgentError,
	ValidationError,
	OpenAIError,
} from "@/types/agents";

/**
 * POST /api/agents/valuate
 * Analyze a property and provide valuation estimate and risk assessment
 */
export async function POST(
	request: NextRequest,
): Promise<NextResponse<AgentAPIResponse<ValuationResult>>> {
	const startTime = Date.now();

	try {
		// Parse request body
		const body = await request.json();

		// Validate input
		const valuationRequest = validateData<ValuationRequest>(
			body,
			ValuationRequestSchema,
			"Valuation Request",
		);

		console.log(
			`[Valuation Agent] Processing: ${valuationRequest.propertyAddress}`,
		);

		// Create system prompt
		const systemPrompt = createSystemPrompt("valuation", {
			timestamp: new Date().toISOString(),
			model: "gpt-4-turbo",
		});

		// Format user prompt with property details
		const userPrompt = formatPrompt(VALUATION_PROMPT_TEMPLATE, {
			address: valuationRequest.propertyAddress,
			propertyType: valuationRequest.propertyType,
			size: valuationRequest.size || "Not specified",
			bedrooms: valuationRequest.bedrooms || "Not specified",
			bathrooms: valuationRequest.bathrooms || "Not specified",
			lotSize: valuationRequest.lotSize || "Not specified",
			yearBuilt: valuationRequest.yearBuilt || "Not specified",
			condition: valuationRequest.condition || "Not specified",
			marketContext:
				valuationRequest.marketContext || "Standard market analysis",
		});

		// Call OpenAI with JSON response format
		const { data: valuationResult, tokensUsed } =
			await sendJSONCompletion<ValuationResult>(
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

		// Validate output
		const validatedResult = validateData<ValuationResult>(
			valuationResult,
			ValuationResultSchema,
			"Valuation Result",
		);

		// Add timestamp if missing
		if (!validatedResult.timestamp) {
			validatedResult.timestamp = new Date().toISOString();
		}

		const processingTime = Date.now() - startTime;
		console.log(
			`[Valuation Agent] Completed in ${processingTime}ms (${tokensUsed} tokens)`,
		);

		return NextResponse.json({
			success: true,
			data: validatedResult,
			metadata: {
				processingTimeMs: processingTime,
				tokensUsed,
			},
		});
	} catch (error) {
		const processingTime = Date.now() - startTime;

		if (error instanceof ValidationError) {
			console.error(`[Valuation Agent] Validation error:`, error.message);
			return NextResponse.json(
				{
					success: false,
					error: {
						code: error.code,
						message: error.message,
						details: error.details,
					},
					metadata: {
						processingTimeMs: processingTime,
					},
				},
				{ status: error.statusCode },
			);
		}

		if (error instanceof OpenAIError) {
			console.error(`[Valuation Agent] OpenAI error:`, error.message);
			return NextResponse.json(
				{
					success: false,
					error: {
						code: error.code,
						message: error.message,
						details: error.details,
					},
					metadata: {
						processingTimeMs: processingTime,
					},
				},
				{ status: error.statusCode },
			);
		}

		if (error instanceof AgentError) {
			console.error(`[Valuation Agent] Agent error:`, error.message);
			return NextResponse.json(
				{
					success: false,
					error: {
						code: error.code,
						message: error.message,
						details: error.details,
					},
					metadata: {
						processingTimeMs: processingTime,
					},
				},
				{ status: error.statusCode },
			);
		}

		console.error(`[Valuation Agent] Unexpected error:`, error);
		return NextResponse.json(
			{
				success: false,
				error: {
					code: "INTERNAL_ERROR",
					message: "An unexpected error occurred",
					details: error instanceof Error ? error.message : "Unknown error",
				},
				metadata: {
					processingTimeMs: processingTime,
				},
			},
			{ status: 500 },
		);
	}
}
