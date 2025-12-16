/** @format */

import {
	Plus,
	MapPin,
	Building,
	Home,
	MoreVertical,
	ChevronRight,
	Bath,
	Square,
	Star,
} from "lucide-react";
import { Property } from "./types";

interface PropertiesListProps {
	properties: Property[];
}

export default function PropertiesList({ properties }: PropertiesListProps) {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
				<div>
					<h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
						Your Properties
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Recent acquisitions and listings
					</p>
				</div>
				<button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
					<Plus className="w-4 h-4" />
					Add Property
				</button>
			</div>

			<div className="space-y-4">
				{properties.slice(0, 3).map((property, index) => (
					<div
						key={property.id}
						className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
						<div className="flex w-full sm:w-auto items-center gap-4">
							<div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
								<img
									src={property.image}
									alt={property.title}
									className="w-full h-full object-cover"
								/>
								{property.isFeatured && (
									<div className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-600 text-white text-[10px] rounded">
										<Star className="w-2.5 h-2.5 fill-current" />
									</div>
								)}
							</div>
							
							{/* Mobile: Title & Price shown here */}
							<div className="sm:hidden flex-1">
								<h4 className="font-semibold text-gray-900 dark:text-white text-sm">
									{property.title}
								</h4>
								<div className="text-base font-bold text-gray-900 dark:text-white">
									${property.price.toLocaleString()}
								</div>
							</div>

							<button className="sm:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
								<MoreVertical className="w-5 h-5 text-gray-400" />
							</button>
						</div>

						<div className="flex-1 w-full">
							{/* Desktop: Title & Price */}
							<div className="hidden sm:flex items-center justify-between mb-1">
								<h4 className="font-semibold text-gray-900 dark:text-white">
									{property.title}
								</h4>
								<div className="text-lg font-bold text-gray-900 dark:text-white">
									${property.price.toLocaleString()}
								</div>
							</div>

							<div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
								<div className="flex items-center gap-1">
									<MapPin className="w-3.5 h-3.5" />
									{property.location}
								</div>
								<div className="flex items-center gap-1">
									<Building className="w-3.5 h-3.5" />
									{property.type}
								</div>
							</div>

							<div className="flex items-center gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100 dark:border-gray-700 w-full sm:w-auto">
								<div className="flex items-center gap-1 text-xs sm:text-sm">
									<Home className="w-3.5 h-3.5 text-gray-400" />
									<span className="font-medium text-gray-900 dark:text-white">
										{property.bedrooms}
									</span>
									<span className="text-gray-500">beds</span>
								</div>
								<div className="flex items-center gap-1 text-xs sm:text-sm">
									<Bath className="w-3.5 h-3.5 text-gray-400" />
									<span className="font-medium text-gray-900 dark:text-white">
										{property.bathrooms}
									</span>
									<span className="text-gray-500">baths</span>
								</div>
								<div className="flex items-center gap-1 text-xs sm:text-sm">
									<Square className="w-3.5 h-3.5 text-gray-400" />
									<span className="font-medium text-gray-900 dark:text-white">
										{property.squareFeet.toLocaleString()}
									</span>
									<span className="text-gray-500">sqft</span>
								</div>
							</div>
						</div>

						<button className="hidden sm:block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
							<MoreVertical className="w-5 h-5 text-gray-400" />
						</button>
					</div>
				))}
			</div>

			<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
				<button className="w-full flex items-center justify-center gap-2 py-2 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
					View All Properties
					<ChevronRight className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
}
