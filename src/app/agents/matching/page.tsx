/** @format */

import { Metadata } from "next";
import InvestorMatchingAgent from "@/components/agents/InvestorMatchingAgent";

export const metadata: Metadata = {
	title: "Investor Matching | StrataDeed",
	description:
		"AI-powered property matching based on your investment profile. Find properties that align with your financial goals, risk tolerance, and preferences.",
	openGraph: {
		title: "Investor Matching | StrataDeed",
		description: "Discover properties matched to your investment profile",
		type: "website",
	},
};

export default function MatchingPage() {
	return <InvestorMatchingAgent />;
}
