/** @format */

import { sampleProperties } from "../../lib/dummy-data";
export default function Dashboard() {
	return (
		<section className="max-w-5xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">Dashboard</h2>

			<div className="card-glass p-6 mb-6">
				<h3 className="font-semibold mb-3">Owned Properties</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{sampleProperties.slice(0, 2).map((p) => (
						<div
							key={p.id}
							className="p-3 border border-gray-100 rounded-lg">
							<div className="text-sm font-medium">{p.title}</div>
							<div className="text-xs text-strata-stone-light">
								{p.location}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
