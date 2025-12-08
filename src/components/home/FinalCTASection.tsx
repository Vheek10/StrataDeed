/** @format */
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTASection() {
	return (
		<section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
					A property ecosystem that finally behaves like modern infrastructure.
				</h2>
				<p className="text-xl text-blue-100 mb-10">
					No hidden processes. No manual errors. No silent title issues.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href="/signup"
						className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300">
						Get Started Free
						<ArrowRight className="w-5 h-5" />
					</Link>
					<Link
						href="/contact"
						className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300">
						Schedule a Demo
					</Link>
				</div>
			</div>
		</section>
	);
}
