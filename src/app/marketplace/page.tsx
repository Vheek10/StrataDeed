/** @format */
"use client";

import { useState, useMemo } from "react";
import CartSidebar from "../../components/CartSidebar";
import { sampleProperties } from "../../lib/dummy-data";
import {
	Search,
	Filter,
	MapPin,
	DollarSign,
	ShoppingCart,
	Heart,
	Share2,
	Shield,
	Star,
	Home,
	Building,
	Hotel,
	Castle,
	TreePine,
	Waves,
	ChevronDown,
	X,
	Globe,
	CheckCircle,
	Eye,
	Users,
	Percent,
	Tag,
	Truck,
	CreditCard,
	Lock,
	Bed,
	Bath,
	Square,
	ChevronRight,
	Sparkles,
	Award,
	Zap,
	TrendingUp,
	ArrowUpRight,
	Bell,
} from "lucide-react";
import Image from "next/image";

const cities = [
	{ name: "All Cities", icon: Globe },
	{ name: "New York", icon: Building, properties: 45, country: "USA" },
	{ name: "London", icon: Castle, properties: 32, country: "UK" },
	{ name: "Tokyo", icon: Hotel, properties: 28, country: "Japan" },
	{ name: "Dubai", icon: Building, properties: 24, country: "UAE" },
	{ name: "Singapore", icon: Building, properties: 19, country: "Singapore" },
	{ name: "Sydney", icon: Waves, properties: 16, country: "Australia" },
	{ name: "Miami", icon: Home, properties: 22, country: "USA" },
	{ name: "Vancouver", icon: TreePine, properties: 14, country: "Canada" },
];

const propertyTypes = [
	{ label: "All Types", icon: Home },
	{ label: "Apartments", icon: Building },
	{ label: "Villas", icon: Castle },
	{ label: "Commercial", icon: Building },
	{ label: "Luxury", icon: Star },
	{ label: "Beachfront", icon: Waves },
];

const priceRanges = [
	{ label: "Any Price", min: 0, max: Infinity },
	{ label: "Under $100K", min: 0, max: 100000 },
	{ label: "$100K - $500K", min: 100000, max: 500000 },
	{ label: "$500K - $1M", min: 500000, max: 1000000 },
	{ label: "$1M - $5M", min: 1000000, max: 5000000 },
	{ label: "Over $5M", min: 5000000, max: Infinity },
];

const demoImages = [
	"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1616587226154-91eab0a51dc7?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1613977257592-4871e5fcd7a4?w=800&auto=format&fit=crop",
];

interface CartItem {
	property: (typeof sampleProperties)[0];
	quantity: number;
}

export default function MarketplacePage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCity, setSelectedCity] = useState("All Cities");
	const [selectedType, setSelectedType] = useState("All Types");
	const [selectedPrice, setSelectedPrice] = useState("Any Price");
	const [showFilters, setShowFilters] = useState(false);
	const [sortBy, setSortBy] = useState("featured");
	const [cart, setCart] = useState<CartItem[]>([]);
	const [showCart, setShowCart] = useState(false);
	const [wishlist, setWishlist] = useState<number[]>([]);
	const [showSearch, setShowSearch] = useState(false);

	// Add to cart functionality
	const addToCart = (property: (typeof sampleProperties)[0]) => {
		setCart((prev) => {
			const existing = prev.find((item) => item.property.id === property.id);
			if (existing) {
				return prev.map((item) =>
					item.property.id === property.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}
			return [...prev, { property, quantity: 1 }];
		});
	};

	// Remove from cart
	const removeFromCart = (propertyId: number) => {
		setCart((prev) => prev.filter((item) => item.property.id !== propertyId));
	};

	// Update quantity
	const updateQuantity = (propertyId: number, quantity: number) => {
		if (quantity < 1) {
			removeFromCart(propertyId);
			return;
		}
		setCart((prev) =>
			prev.map((item) =>
				item.property.id === propertyId ? { ...item, quantity } : item,
			),
		);
	};

	// Toggle wishlist
	const toggleWishlist = (propertyId: number) => {
		setWishlist((prev) =>
			prev.includes(propertyId)
				? prev.filter((id) => id !== propertyId)
				: [...prev, propertyId],
		);
	};

	// Cart total
	const cartTotal = cart.reduce(
		(sum, item) => sum + item.property.price * item.quantity,
		0,
	);

	// Filter properties
	const filteredProperties = useMemo(() => {
		let filtered = [...sampleProperties];

		if (searchQuery) {
			filtered = filtered.filter(
				(property) =>
					property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
					property.description
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
			);
		}

		if (selectedCity !== "All Cities") {
			filtered = filtered.filter((property) =>
				property.location.toLowerCase().includes(selectedCity.toLowerCase()),
			);
		}

		if (selectedType !== "All Types") {
			filtered = filtered.filter(
				(property) =>
					property.type.toLowerCase() === selectedType.toLowerCase(),
			);
		}

		if (selectedPrice !== "Any Price") {
			const priceRange = priceRanges.find(
				(range) => range.label === selectedPrice,
			);
			if (priceRange) {
				filtered = filtered.filter(
					(property) =>
						property.price >= priceRange.min &&
						property.price <= priceRange.max,
				);
			}
		}

		switch (sortBy) {
			case "price-low":
				filtered.sort((a, b) => a.price - b.price);
				break;
			case "price-high":
				filtered.sort((a, b) => b.price - a.price);
				break;
			case "newest":
				filtered.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
				);
				break;
			case "featured":
				filtered.sort(
					(a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
				);
				break;
		}

		return filtered;
	}, [searchQuery, selectedCity, selectedType, selectedPrice, sortBy]);

	const totalValue = filteredProperties.reduce(
		(sum, prop) => sum + prop.price,
		0,
	);
	const averagePrice =
		filteredProperties.length > 0
			? (totalValue / filteredProperties.length).toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
					maximumFractionDigits: 0,
			  })
			: "$0";

	const clearFilters = () => {
		setSearchQuery("");
		setSelectedCity("All Cities");
		setSelectedType("All Types");
		setSelectedPrice("Any Price");
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				{/* Top Navigation Bar */}
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-8">
						<div>
							<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
								StrataDeed
								<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
									.
								</span>
							</h1>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Premium Real Estate Marketplace
							</p>
						</div>

						<div className="hidden md:flex items-center gap-6">
							<button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
								<TrendingUp className="w-4 h-4" />
								<span className="font-medium">Trending</span>
							</button>
							<button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
								<Award className="w-4 h-4" />
								<span className="font-medium">Premium</span>
							</button>
							<button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
								<Zap className="w-4 h-4" />
								<span className="font-medium">Deals</span>
							</button>
						</div>
					</div>

					{/* Right side controls */}
					<div className="flex items-center gap-4">
						{/* Search Icon (Mobile trigger) */}
						<button
							onClick={() => setShowSearch(!showSearch)}
							className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
							<Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
						</button>

						{/* Full search bar (Desktop) */}
						<div className="hidden md:block relative">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
								<input
									type="text"
									placeholder="Search properties..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-10 pr-4 py-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
								/>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery("")}
										className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
										<X className="w-3 h-3 text-gray-400" />
									</button>
								)}
							</div>
						</div>

						{/* Notification */}
						<button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative">
							<Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
							<span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
						</button>

						{/* Cart */}
						<button
							onClick={() => setShowCart(true)}
							className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative">
							<ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
							{cart.length > 0 && (
								<span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
									{cart.length}
								</span>
							)}
						</button>

						{/* Portfolio Balance - Compact */}
						<div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg">
							<div className="text-white">
								<div className="text-xs opacity-90">Portfolio</div>
								<div className="font-bold text-sm">
									${(totalValue / 1000000).toFixed(1)}M
								</div>
							</div>
							<ArrowUpRight className="w-4 h-4 text-white/80" />
						</div>
					</div>
				</div>

				{/* Mobile Search (Expands when toggled) */}
				{showSearch && (
					<div className="md:hidden mb-6">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search properties..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
							{searchQuery && (
								<button
									onClick={() => setSearchQuery("")}
									className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
									<X className="w-4 h-4 text-gray-400" />
								</button>
							)}
						</div>
					</div>
				)}

				{/* Main Content */}
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Filters Sidebar */}
					<div className="lg:w-1/4">
						<div className="sticky top-6 space-y-6">
							{/* Filter Toggle */}
							<button
								onClick={() => setShowFilters(!showFilters)}
								className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow transition-all">
								<div className="flex items-center gap-3">
									<Filter className="w-4 h-4 text-blue-600" />
									<span className="font-semibold text-gray-900 dark:text-white">
										Filters
									</span>
								</div>
								<ChevronDown
									className={`w-4 h-4 text-gray-400 transition-transform ${
										showFilters ? "rotate-180" : ""
									}`}
								/>
							</button>

							{/* Filter Panel */}
							<div
								className={`${
									showFilters ? "block" : "hidden lg:block"
								} space-y-6`}>
								{/* Quick Stats */}
								<div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
									<div className="flex items-center justify-between mb-3">
										<h3 className="font-semibold text-gray-900 dark:text-white">
											Market Overview
										</h3>
										<Sparkles className="w-4 h-4 text-blue-500" />
									</div>
									<div className="space-y-3">
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600 dark:text-gray-400">
												Properties
											</span>
											<span className="font-semibold text-gray-900 dark:text-white">
												{filteredProperties.length}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600 dark:text-gray-400">
												Avg. Price
											</span>
											<span className="font-semibold text-gray-900 dark:text-white">
												{averagePrice}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600 dark:text-gray-400">
												Total Value
											</span>
											<span className="font-semibold text-gray-900 dark:text-white">
												${(totalValue / 1000000).toFixed(1)}M
											</span>
										</div>
									</div>
								</div>

								{/* Special Offers */}
								<div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl p-4 text-white">
									<div className="flex items-center gap-2 mb-2">
										<Tag className="w-4 h-4" />
										<h3 className="font-semibold">Special Offers</h3>
									</div>
									<p className="text-xs text-blue-100 mb-3">
										0% financing available on select premium properties
									</p>
									<button className="w-full py-2 bg-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
										View Offers
									</button>
								</div>

								{/* Global Cities */}
								<div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
									<div className="flex items-center gap-2 mb-4">
										<MapPin className="w-4 h-4 text-blue-600" />
										<h3 className="font-semibold text-gray-900 dark:text-white">
											Global Cities
										</h3>
									</div>
									<div className="space-y-2 max-h-60 overflow-y-auto pr-2">
										{cities.map((city) => {
											const Icon = city.icon;
											return (
												<button
													key={city.name}
													onClick={() => setSelectedCity(city.name)}
													className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm ${
														selectedCity === city.name
															? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
															: "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
													}`}>
													<div className="flex items-center gap-3">
														<Icon className="w-3.5 h-3.5" />
														<span>{city.name}</span>
													</div>
													{city.properties && (
														<span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
															{city.properties}
														</span>
													)}
												</button>
											);
										})}
									</div>
								</div>

								{/* Property Type */}
								<div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
									<div className="flex items-center gap-2 mb-4">
										<Home className="w-4 h-4 text-blue-600" />
										<h3 className="font-semibold text-gray-900 dark:text-white">
											Property Type
										</h3>
									</div>
									<div className="grid grid-cols-2 gap-2">
										{propertyTypes.map((type) => {
											const Icon = type.icon;
											return (
												<button
													key={type.label}
													onClick={() => setSelectedType(type.label)}
													className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all text-xs ${
														selectedType === type.label
															? "bg-blue-50 dark:bg-blue-900/30 border border-blue-500 text-blue-700 dark:text-blue-400"
															: "border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300"
													}`}>
													<Icon className="w-4 h-4 mb-1" />
													<span className="font-medium">{type.label}</span>
												</button>
											);
										})}
									</div>
								</div>

								{/* Price Range */}
								<div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
									<div className="flex items-center gap-2 mb-4">
										<DollarSign className="w-4 h-4 text-blue-600" />
										<h3 className="font-semibold text-gray-900 dark:text-white">
											Price Range
										</h3>
									</div>
									<div className="space-y-2">
										{priceRanges.map((range) => (
											<button
												key={range.label}
												onClick={() => setSelectedPrice(range.label)}
												className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
													selectedPrice === range.label
														? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
														: "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
												}`}>
												{range.label}
											</button>
										))}
									</div>
								</div>

								{/* Clear Filters */}
								{(searchQuery ||
									selectedCity !== "All Cities" ||
									selectedType !== "All Types" ||
									selectedPrice !== "Any Price") && (
									<button
										onClick={clearFilters}
										className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-sm">
										<X className="w-3.5 h-3.5" />
										Clear All Filters
									</button>
								)}
							</div>
						</div>
					</div>

					{/* Property Grid */}
					<div className="lg:w-3/4">
						{/* Page Header */}
						<div className="mb-6">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								Premium Properties
							</h2>
							<p className="text-gray-600 dark:text-gray-400 mt-1">
								Discover exclusive real estate investments worldwide
							</p>
						</div>

						{/* Controls Bar */}
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<CheckCircle className="w-4 h-4 text-emerald-500" />
									<span className="text-sm text-gray-600 dark:text-gray-400">
										{filteredProperties.length} Verified Properties
									</span>
								</div>
								<div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-700" />
								<div className="flex items-center gap-2">
									<Eye className="w-4 h-4 text-blue-500" />
									<span className="text-sm text-gray-600 dark:text-gray-400">
										{Math.floor(Math.random() * 1000) + 500} Views
									</span>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<span className="text-sm text-gray-600 dark:text-gray-400">
									Sort:
								</span>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
									<option value="featured">Featured</option>
									<option value="price-low">Price: Low to High</option>
									<option value="price-high">Price: High to Low</option>
									<option value="newest">Newest First</option>
								</select>
							</div>
						</div>

						{/* Property Grid */}
						{filteredProperties.length === 0 ? (
							<div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
								<Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									No properties found
								</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-6">
									Try adjusting your search criteria
								</p>
								<button
									onClick={clearFilters}
									className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
									Clear Filters
								</button>
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
									{filteredProperties.map((property) => {
										const isInWishlist = wishlist.includes(property.id);
										const isInCart = cart.some(
											(item) => item.property.id === property.id,
										);

										return (
											<div
												key={property.id}
												className="group">
												<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
													{/* Property Image */}
													<div className="relative h-40 overflow-hidden">
														<img
															src={demoImages[property.id % demoImages.length]}
															alt={property.title}
															className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
														/>
														<div className="absolute top-3 right-3 flex gap-1.5">
															<button
																onClick={() => toggleWishlist(property.id)}
																className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
																<Heart
																	className={`w-4 h-4 ${
																		isInWishlist
																			? "fill-red-500 text-red-500"
																			: "text-gray-700"
																	}`}
																/>
															</button>
															<button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
																<Share2 className="w-4 h-4 text-gray-700" />
															</button>
														</div>
														{property.isFeatured && (
															<div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold rounded">
																Premium
															</div>
														)}
														<div className="absolute bottom-3 left-3">
															<div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
																<MapPin className="w-3 h-3" />
																<span>{property.location.split(",")[0]}</span>
															</div>
														</div>
													</div>

													{/* Property Details */}
													<div className="p-4 flex-1 flex flex-col">
														<div className="mb-3">
															<h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 line-clamp-1">
																{property.title}
															</h3>
															<p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">
																{property.description}
															</p>
														</div>

														{/* Property Features */}
														<div className="grid grid-cols-4 gap-2 mb-4">
															<div className="text-center">
																<Bed className="w-4 h-4 text-gray-400 mx-auto mb-1" />
																<div className="text-sm font-semibold text-gray-900 dark:text-white">
																	{property.bedrooms}
																</div>
																<div className="text-xs text-gray-500">
																	Beds
																</div>
															</div>
															<div className="text-center">
																<Bath className="w-4 h-4 text-gray-400 mx-auto mb-1" />
																<div className="text-sm font-semibold text-gray-900 dark:text-white">
																	{property.bathrooms}
																</div>
																<div className="text-xs text-gray-500">
																	Baths
																</div>
															</div>
															<div className="text-center">
																<Square className="w-4 h-4 text-gray-400 mx-auto mb-1" />
																<div className="text-sm font-semibold text-gray-900 dark:text-white">
																	{property.squareFeet.toLocaleString()}
																</div>
																<div className="text-xs text-gray-500">
																	Sqft
																</div>
															</div>
															<div className="text-center">
																<Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
																<div className="text-sm font-semibold text-gray-900 dark:text-white">
																	{property.capacity}
																</div>
																<div className="text-xs text-gray-500">Max</div>
															</div>
														</div>

														{/* Price and Actions */}
														<div className="mt-auto">
															<div className="flex justify-between items-center mb-3">
																<div>
																	<div className="text-xl font-bold text-gray-900 dark:text-white">
																		${property.price.toLocaleString()}
																	</div>
																	<div className="text-xs text-gray-500">
																		$
																		{(
																			property.price / property.squareFeet
																		).toFixed(2)}
																		/sqft
																	</div>
																</div>
																<div className="flex items-center gap-1 text-xs text-gray-500">
																	<Eye className="w-3 h-3" />
																	<span>{property.views}</span>
																</div>
															</div>

															{/* Action Buttons */}
															<div className="flex gap-2">
																{isInCart ? (
																	<button
																		onClick={() => removeFromCart(property.id)}
																		className="flex-1 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-1.5 text-sm">
																		<X className="w-3.5 h-3.5" />
																		Remove
																	</button>
																) : (
																	<button
																		onClick={() => addToCart(property)}
																		className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center justify-center gap-1.5 text-sm">
																		<ShoppingCart className="w-3.5 h-3.5" />
																		Add to Cart
																	</button>
																)}
																<button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
																	Details
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>

								{/* Marketplace Insights */}
								<div className="mt-10">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
										Market Insights
									</h3>
									<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
										<div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
											<div className="flex items-center justify-between mb-2">
												<div className="text-sm font-medium text-gray-700 dark:text-gray-300">
													Properties Available
												</div>
												<Building className="w-4 h-4 text-blue-500" />
											</div>
											<div className="text-2xl font-bold text-gray-900 dark:text-white">
												{filteredProperties.length}
											</div>
											<div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
												Across{" "}
												{new Set(filteredProperties.map((p) => p.country)).size}{" "}
												countries
											</div>
										</div>
										<div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
											<div className="flex items-center justify-between mb-2">
												<div className="text-sm font-medium text-gray-700 dark:text-gray-300">
													Average Price
												</div>
												<DollarSign className="w-4 h-4 text-emerald-500" />
											</div>
											<div className="text-2xl font-bold text-gray-900 dark:text-white">
												{averagePrice}
											</div>
											<div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
												Market competitive rate
											</div>
										</div>
										<div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
											<div className="flex items-center justify-between mb-2">
												<div className="text-sm font-medium text-gray-700 dark:text-gray-300">
													Portfolio Value
												</div>
												<TrendingUp className="w-4 h-4 text-purple-500" />
											</div>
											<div className="text-2xl font-bold text-gray-900 dark:text-white">
												${(totalValue / 1000000).toFixed(1)}M
											</div>
											<div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
												Total market exposure
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Cart Sidebar */}
			<CartSidebar
				isOpen={showCart}
				onClose={() => setShowCart(false)}
				cart={cart}
				onUpdateQuantity={updateQuantity}
				onRemoveItem={removeFromCart}
				cartTotal={cartTotal}
			/>

			{/* Featured Properties Showcase */}
			<div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h3 className="text-xl font-bold text-gray-900 dark:text-white">
							Featured Showcase
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
							Exclusive properties from our premium collection
						</p>
					</div>
					<button className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium text-sm hover:gap-2 transition-all">
						View All
						<ChevronRight className="w-4 h-4" />
					</button>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
					{demoImages.map((image, index) => (
						<div
							key={index}
							className="relative h-32 rounded-lg overflow-hidden group">
							<img
								src={image}
								alt={`Property showcase ${index + 1}`}
								className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
								<div className="text-white">
									<div className="font-medium text-sm">Premium Property</div>
									<div className="text-xs text-gray-200 opacity-90">
										From $1.2M
									</div>
								</div>
							</div>
							<div className="absolute top-2 left-2">
								<div className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium rounded">
									Featured
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Footer Section */}
			<div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<div className="flex items-center gap-2 mb-4">
							<Shield className="w-5 h-5 text-blue-600" />
							<span className="font-bold text-gray-900 dark:text-white">
								Secure Transactions
							</span>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							All transactions are secured with bank-level encryption and
							verified ownership.
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 mb-4">
							<Truck className="w-5 h-5 text-blue-600" />
							<span className="font-bold text-gray-900 dark:text-white">
								Global Delivery
							</span>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Properties available for acquisition worldwide with comprehensive
							documentation.
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 mb-4">
							<Percent className="w-5 h-5 text-blue-600" />
							<span className="font-bold text-gray-900 dark:text-white">
								Flexible Financing
							</span>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Multiple financing options available with competitive rates for
							qualified buyers.
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 mb-4">
							<Lock className="w-5 h-5 text-blue-600" />
							<span className="font-bold text-gray-900 dark:text-white">
								24/7 Support
							</span>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray400">
							Dedicated support team available around the clock for all your
							inquiries.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
