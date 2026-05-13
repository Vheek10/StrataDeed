/** @format */

/**
 * Valuation Agent Page
 * Route: /agents/valuation
 */

import { Metadata } from "next";
import ValuationAgent from "@/components/agents/ValuationAgent";

export const metadata: Metadata = {
	title: "Property Valuation Agent | StrataDeed",
	description:
		"AI-powered property valuation analysis with market assessment, risk scoring, and investment rating for tokenized real estate.",
};

export default function ValuationAgentPage() {
	return <ValuationAgent />;
}
