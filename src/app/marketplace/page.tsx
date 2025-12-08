/** @format */

import PropertyCard from "../../components/PropertyCard";
import { sampleProperties } from "../../lib/dummy-data";

export default function MarketplacePage() {
	return (
		<section className="max-w-6xl mx-auto">
			<h2 className="text-2xl font-bold mb-6">Marketplace</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{sampleProperties.map((p) => (
					<PropertyCard
						key={p.id}
						property={p}
					/>
				))}
			</div>
		</section>
	);
}
