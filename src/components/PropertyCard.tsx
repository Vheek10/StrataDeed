/** @format */

import Link from "next/link";

export default function PropertyCard({ property }: any) {
	return (
		<article className="card-glass overflow-hidden">
			<img
				src={property.image}
				alt={property.title}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<h3 className="font-semibold text-lg">{property.title}</h3>
				<p className="text-sm text-strata-stone-light">{property.location}</p>
				<div className="mt-3 flex items-center justify-between">
					<div>
						<div className="text-sm text-strata-stone-light">Valuation</div>
						<div className="font-medium">{property.valuation}</div>
					</div>
					<Link
						href={`/property/${property.id}`}
						className="inline-block px-3 py-2 rounded-lg bg-mantle-amber text-white text-sm">
						View
					</Link>
				</div>
			</div>
		</article>
	);
}
