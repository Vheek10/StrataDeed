/** @format */

/**
 * OpenAI API Client Wrapper for StrataDeed Agents
 * Handles all LLM calls with retry logic, error handling, and structured output
 */

import OpenAI from "openai";
import { OpenAIError } from "@/types/agents";

// Initialize OpenAI client
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	timeout: 60000, // 60 second timeout
});

const MODEL = process.env.OPENAI_MODEL || "gpt-4-turbo";
const TEMPERATURE = 0.7;
const MAX_TOKENS = 2000;

// ============================================================================
// TYPES
// ============================================================================

export interface ChatMessage {
	role: "system" | "user" | "assistant";
	content: string | ContentBlock[];
}

type ContentBlock =
	| { type: "text"; text: string }
	| { type: "image_url"; image_url: { url: string } };

export interface CompletionOptions {
	temperature?: number;
	maxTokens?: number;
	topP?: number;
	frequencyPenalty?: number;
	presencePenalty?: number;
}

export interface CompletionResult {
	content: string;
	tokensUsed: number;
	stopReason: string;
	finishDetails?: any;
}

// ============================================================================
// MAIN CLIENT FUNCTIONS
// ============================================================================

/**
 * Send a chat completion request to OpenAI with retry logic
 */
export async function sendChatCompletion(
	messages: ChatMessage[],
	options: CompletionOptions = {},
	retries: number = 3,
): Promise<CompletionResult> {
	const {
		temperature = TEMPERATURE,
		maxTokens = MAX_TOKENS,
		topP = 1,
		frequencyPenalty = 0,
		presencePenalty = 0,
	} = options;

	let lastError: Error | null = null;

	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			console.log(
				`[OpenAI] Sending completion request (attempt ${attempt + 1}/${retries})`,
			);

			const response = await openai.chat.completions.create({
				model: MODEL,
				messages: messages as any,
				temperature,
				max_tokens: maxTokens,
				top_p: topP,
				frequency_penalty: frequencyPenalty,
				presence_penalty: presencePenalty,
			});

			const content = response.choices[0]?.message?.content || "";
			const tokensUsed =
				(response.usage?.prompt_tokens || 0) +
				(response.usage?.completion_tokens || 0);

			console.log(`[OpenAI] Completion successful (${tokensUsed} tokens used)`);

			return {
				content,
				tokensUsed,
				stopReason: response.choices[0]?.finish_reason || "unknown",
				finishDetails: response.choices[0]?.message,
			};
		} catch (error: any) {
			lastError = error;
			console.error(`[OpenAI] Attempt ${attempt + 1} failed:`, error.message);

			// Check if error is retryable
			if (error.status === 429) {
				// Rate limited - wait and retry
				const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
				console.log(
					`[OpenAI] Rate limited. Waiting ${waitTime}ms before retry...`,
				);
				await new Promise((resolve) => setTimeout(resolve, waitTime));
			} else if (error.status && error.status >= 500) {
				// Server error - retry with backoff
				const waitTime = Math.pow(2, attempt) * 500;
				console.log(
					`[OpenAI] Server error (${error.status}). Waiting ${waitTime}ms...`,
				);
				await new Promise((resolve) => setTimeout(resolve, waitTime));
			} else {
				// Non-retryable error
				break;
			}
		}
	}

	throw new OpenAIError(
		"Failed to get completion from OpenAI",
		lastError?.message || "Unknown error after retries",
	);
}

/**
 * Send a structured JSON completion request
 * Expects the model to return valid JSON
 */
export async function sendJSONCompletion<T = Record<string, any>>(
	messages: ChatMessage[],
	schema?: string,
	options: CompletionOptions = {},
): Promise<{ data: T; tokensUsed: number }> {
	// Add schema instruction to system prompt if provided
	const messagesWithSchema = schema
		? [
				...messages.slice(0, -1),
				{
					role: "user" as const,
					content: `${messages[messages.length - 1].content}\n\nPlease respond with valid JSON matching this schema:\n${schema}`,
				},
			]
		: messages;

	const result = await sendChatCompletion(messagesWithSchema, {
		...options,
		maxTokens: options.maxTokens || 3000,
	});

	try {
		// Try to extract JSON from the response
		const jsonMatch = result.content.match(/\{[\s\S]*\}/);
		if (!jsonMatch) {
			throw new Error("No JSON object found in response");
		}

		const parsed = JSON.parse(jsonMatch[0]) as T;
		return {
			data: parsed,
			tokensUsed: result.tokensUsed,
		};
	} catch (error: any) {
		throw new OpenAIError(
			"Failed to parse JSON from OpenAI response",
			`Response was: ${result.content}`,
		);
	}
}

/**
 * Send a completion request with vision capability (image analysis)
 */
export async function sendVisionCompletion(
	imageBase64: string | string[],
	prompt: string,
	options: CompletionOptions = {},
): Promise<CompletionResult> {
	const images = Array.isArray(imageBase64) ? imageBase64 : [imageBase64];

	const contentBlocks: ContentBlock[] = [
		...images.map((img) => ({
			type: "image_url" as const,
			image_url: { url: `data:image/jpeg;base64,${img}` },
		})),
		{
			type: "text" as const,
			text: prompt,
		},
	];

	const messages: ChatMessage[] = [
		{
			role: "user",
			content: contentBlocks,
		},
	];

	return sendChatCompletion(messages, options);
}

/**
 * Count tokens in a message (approximation)
 * OpenAI charges by tokens: ~4 characters = 1 token (rough estimate)
 */
export function estimateTokens(content: string): number {
	return Math.ceil(content.length / 4);
}

/**
 * Format messages for display in reasoning chains
 */
export function formatMessageForDisplay(content: string): string {
	return content
		.trim()
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0)
		.join("\n");
}

/**
 * Extract reasoning steps from a numbered list response
 */
export function extractReasoningSteps(content: string): string[] {
	const lines = content.split("\n");
	const steps: string[] = [];
	let currentStep = "";

	for (const line of lines) {
		// Check if line starts with a number (e.g., "1.", "2.", "1)", "2)")
		if (/^\d+[\.\)]\s/.test(line.trim())) {
			if (currentStep) {
				steps.push(currentStep.trim());
			}
			currentStep = line.replace(/^\d+[\.\)]\s/, "").trim();
		} else if (line.trim() && currentStep) {
			currentStep += " " + line.trim();
		}
	}

	if (currentStep) {
		steps.push(currentStep.trim());
	}

	return steps;
}

/**
 * Health check - verify OpenAI API key is valid
 */
export async function verifyOpenAIConnection(): Promise<boolean> {
	try {
		await openai.models.list();
		console.log("[OpenAI] API connection verified");
		return true;
	} catch (error) {
		console.error("[OpenAI] API connection failed:", error);
		return false;
	}
}

export default openai;
