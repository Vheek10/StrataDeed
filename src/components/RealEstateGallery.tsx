/** @format */
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
	REAL_ESTATE_IMAGES,
	ImageCategory,
	CATEGORY_DESCRIPTIONS,
} from "@/utils/realEstateImages";
import { Search, Filter, X, Grid, List, ChevronRight } from "lucide-react";

const categories = [
	{ id: "all", label: "All", color: "gray" },
	{ id: "modern-buildings", label: "Modern", color: "blue" },
	{ id: "interiors", label: "Interiors", color: "emerald" },
	{ id: "cityscapes", label: "Cityscapes", color: "cyan" },
	{ id: "blockchain-tech", label: "Technology", color: "purple" },
	{ id: "office-spaces", label: "Office", color: "orange" },
];

export default function RealEstateGallery() {
	const [selectedCategory, setSelectedCategory] = useState<
		ImageCategory | "all"
	>("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const filteredImages = useMemo(() => {
		return REAL_ESTATE_IMAGES.filter((image) => {
			const matchesCategory =
				selectedCategory === "all" || image.category === selectedCategory;
			const matchesSearch =
				searchTerm === "" ||
				image.tags.some((tag) =>
					tag.toLowerCase().includes(searchTerm.toLowerCase()),
				) ||
				image.alt.toLowerCase().includes(searchTerm.toLowerCase());
			return matchesCategory && matchesSearch;
		});
	}, [selectedCategory, searchTerm]);

	const handleCategorySelect = (category: ImageCategory | "all") => {
		setSelectedCategory(category);
		setSearchTerm(""); // Clear search when selecting category
	};

	return (
		<section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
						Property Portfolio
					</h1>
					<p className="text-lg text-gray-600">
						Explore our curated collection of premium real estate and blockchain
						properties
					</p>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<div className="bg-blue-50 p-4 rounded-xl">
						<div className="text-2xl font-bold text-blue-600">
							{REAL_ESTATE_IMAGES.length}
						</div>
						<div className="text-sm text-gray-600">Total Images</div>
					</div>
					<div className="bg-emerald-50 p-4 rounded-xl">
						<div className="text-2xl font-bold text-emerald-600">
							{categories.length - 1}
						</div>
						<div className="text-sm text-gray-600">Categories</div>
					</div>
					<div className="bg-purple-50 p-4 rounded-xl">
						<div className="text-2xl font-bold text-purple-600">
							{REAL_ESTATE_IMAGES.reduce((acc, img) => acc + img.tags.length, 0)}
						</div>
						<div className="text-sm text-gray-600">Tags</div>
					</div>
					<div className="bg-cyan-50 p-4 rounded-xl">
						<div className="text-2xl font-bold text-cyan-600">
							{new Set(REAL_ESTATE_IMAGES.map((img) => img.photographer).filter(Boolean)).size}
						</div>
						<div className="text-sm text-gray-600">Photographers</div>
					</div>
				</div>

				{/* Filters */}
				<div className="mb-8 space-y-6">
					{/* Category Tabs */}
					<div className="flex flex-wrap gap-2">
						{categories.map((category) => {
							const isActive = selectedCategory === category.id;
							return (
								<button
									key={category.id}
									onClick={() => handleCategorySelect(category.id as any)}
									className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
										isActive ? `bg-${category.color}-600 text-white` : `bg-gray-100 text-gray-700 hover:bg-gray-200`
									}`}>
									<div className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : `bg-${category.color}-500`}`} />
									{category.label}
								</button>
							);
						})}
					</div>

					{/* Search and View Controls */}
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1 relative">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<input
								type="text"
								placeholder="Search properties by description, tags, or category..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						<div className="flex gap-2">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-3 rounded-xl ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
								<Grid className="w-5 h-5" />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`p-3 rounded-xl ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
								<List className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>

				{/* Gallery Content */}
				{filteredImages.length === 0 ? (
					<div className="text-center py-12">
						<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Search className="w-8 h-8 text-gray-400" />
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
						<p className="text-gray-600">Try adjusting your search or category filters</p>
					</div>
				) : viewMode === "grid" ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredImages.map((image) => (
							<div
								key={image.id}
								className="group relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
								onClick={() => setSelectedImage(image.url)}>
								<div className="aspect-[4/3] relative overflow-hidden">
									<Image
										src={image.url}
										alt={image.alt}
										fill
										className="object-cover group-hover:scale-110 transition-transform duration-500"
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

									{/* Category Badge */}
									<div className="absolute top-3 left-3">
										<div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
											<span className="text-xs text-white font-medium">
												{categories.find((c) => c.id === image.category)?.label || image.category}
											</span>
										</div>
									</div>
								</div>

								<div className="p-4">
									<p className="text-sm text-gray-700 line-clamp-2 mb-3">{image.alt}</p>

									<div className="flex flex-wrap gap-1 mb-4">
										{image.tags.slice(0, 3).map((tag) => (
											<span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">{tag}</span>
										))}
									</div>

									{image.photographer && (
										<div className="text-xs text-gray-500">Photo by {image.photographer}</div>
									)}
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="space-y-4">
						{filteredImages.map((image) => (
							<div
								key={image.id}
								className="group flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
								onClick={() => setSelectedImage(image.url)}>
								<div className="sm:w-48 aspect-video relative rounded-lg overflow-hidden">
									<Image
										src={image.url}
										alt={image.alt}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-500"
										sizes="(max-width: 640px) 100vw, 192px"
									/>
								</div>

								<div className="flex-1">
									<div className="flex flex-wrap items-center gap-2 mb-2">
										<span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{categories.find((c) => c.id === image.category)?.label}</span>
										{image.tags.slice(0, 2).map((tag) => (
											<span key={tag} className="text-xs text-gray-500">#{tag}</span>
										))}
									</div>

									<h3 className="font-semibold text-gray-900 mb-2">{image.alt}</h3>

									<div className="text-sm text-gray-600 mb-3">Photo by {image.photographer}</div>

									<div className="flex items-center gap-2 text-sm text-blue-600">
										<span>View details</span>
										<ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Image Count */}
				<div className="mt-8 pt-6 border-t border-gray-200">
					<div className="text-center">
						<p className="text-gray-600">Showing {filteredImages.length} of {REAL_ESTATE_IMAGES.length} properties</p>
					</div>
				</div>

				{/* Image Modal */}
				{selectedImage && (
					<div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
						<button className="absolute top-6 right-6 text-white hover:text-gray-300 z-50" onClick={() => setSelectedImage(null)}>
							<X className="w-8 h-8" />
						</button>

						<div className="relative w-full max-w-6xl h-[80vh]">
							<Image src={selectedImage} alt="Full size preview" fill className="object-contain" sizes="100vw" priority />
						</div>

						<div className="absolute inset-0 -z-10" onClick={() => setSelectedImage(null)} />
					</div>
				)}
			</div>
		</section>
	);
}
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="space-y-4">
						{filteredImages.map((image) => (
							<div
								key={image.id}
							className="group flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
								onClick={() => setSelectedImage(image.url)}>
								<div className="sm:w-48 aspect-video relative rounded-lg overflow-hidden">
									<Image
										src={image.url}
										alt={image.alt}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-500"
										sizes="(max-width: 640px) 100vw, 192px"
									/>
								</div>

								<div className="flex-1">
									<div className="flex flex-wrap items-center gap-2 mb-2">
									<span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
											{categories.find((c) => c.id === image.category)?.label}
										</span>
										{image.tags.slice(0, 2).map((tag) => (
											<span
												key={tag}
											className="text-xs text-gray-500">
												#{tag}
											</span>
										))}
									</div>

<h3 className="font-semibold text-gray-900 mb-2">
										{image.alt}
									</h3>

										<div className="text-sm text-gray-600 mb-3">
											Photo by {image.photographer}
										</div>

								<div className="flex items-center gap-2 text-sm text-blue-600">
										<span>View details</span>
										<ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Image Count */}
				<div className="mt-8 pt-6 border-t border-gray-200">
					<div className="text-center">
						<p className="text-gray-600">
							Showing {filteredImages.length} of {REAL_ESTATE_IMAGES.length}{" "}
							properties
						</p>
					</div>
				</div>

				{/* Image Modal */}
				{selectedImage && (
					<div
						className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
						onClick={() => setSelectedImage(null)}>
						<button
							className="absolute top-6 right-6 text-white hover:text-gray-300 z-50"
							onClick={() => setSelectedImage(null)}>
							<X className="w-8 h-8" />
						</button>

						<div className="relative w-full max-w-6xl h-[80vh]">
							<Image
								src={selectedImage}
								alt="Full size preview"
								fill
								className="object-contain"
								sizes="100vw"
								priority
							/>
						</div>

						{/* Modal Background Click */}
						<div
							className="absolute inset-0 -z-10"
							onClick={() => setSelectedImage(null)}
						/>
					</div>
				)}
			</div>
		</section>
	);
}
