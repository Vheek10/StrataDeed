/** @format */
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import ForInvestorsSection from "@/components/home/ForInvestorsSection";
import ForPropertyOwnersSection from "@/components/home/ForPropertyOwnersSection";
import ComplianceSection from "@/components/home/ComplianceSection";
import MissionVisionSection from "@/components/home/MissionVisionSection";
import FinalCTASection from "@/components/home/FinalCTASection";

export default function Homepage() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-950">
			<HeroSection />
			<HowItWorksSection />
			<ComparisonSection />
			<ForInvestorsSection />
			<ForPropertyOwnersSection />
			<ComplianceSection />
			<MissionVisionSection />
			<FinalCTASection />
		</div>
	);
}
