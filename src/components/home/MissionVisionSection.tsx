/** @format */
"use client";

export default function MissionVisionSection() {
	return (
		<section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-12">
					<div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-2xl p-8 lg:p-12">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
							Our Mission
						</h3>
						<p className="text-lg text-gray-700 dark:text-gray-300">
							To rebuild trust in African real estate by merging legal rigor
							with modern technology.
						</p>
					</div>
					<div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-2xl p-8 lg:p-12">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
							Our Vision
						</h3>
						<p className="text-lg text-gray-700 dark:text-gray-300">
							A continent where property ownership is liquid, transparent, and
							accessible to anyone with a mobile phone.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
