/** @format */
/** @format */
"use client";

import {
	X,
	ShoppingCart,
	Package,
	Truck,
	CreditCard,
	Lock,
	ChevronRight,
} from "lucide-react";

interface CartItem {
	property: any;
	quantity: number;
}

interface CartSidebarProps {
	isOpen: boolean;
	onClose: () => void;
	cart: CartItem[];
	onUpdateQuantity: (propertyId: number, quantity: number) => void;
	onRemoveItem: (propertyId: number) => void;
	cartTotal: number;
}

export default function CartSidebar({
	isOpen,
	onClose,
	cart,
	onUpdateQuantity,
	onRemoveItem,
	cartTotal,
}: CartSidebarProps) {
	return (
		<>
			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40"
					onClick={onClose}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}>
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
						<div className="flex items-center gap-3">
							<ShoppingCart className="w-6 h-6 text-blue-600" />
							<div>
								<h2 className="text-xl font-bold text-gray-900 dark:text-white">
									Shopping Cart
								</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{cart.length} {cart.length === 1 ? "item" : "items"}
								</p>
							</div>
						</div>
						<button
							onClick={onClose}
							className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
							<X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
						</button>
					</div>

					{/* Cart Items */}
					<div className="flex-1 overflow-y-auto p-6">
						{cart.length === 0 ? (
							<div className="text-center py-12">
								<Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Your cart is empty
								</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-6">
									Add properties to your cart to get started
								</p>
								<button
									onClick={onClose}
									className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
									Browse Properties
								</button>
							</div>
						) : (
							<div className="space-y-6">
								{cart.map((item) => (
									<div
										key={item.property.id}
										className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
										<div className="relative w-20 h-20 flex-shrink-0">
											<img
												src={item.property.image}
												alt={item.property.title}
												className="w-full h-full object-cover rounded-lg"
											/>
										</div>
										<div className="flex-1">
											<div className="flex justify-between items-start mb-2">
												<div>
													<h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
														{item.property.title}
													</h4>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														{item.property.location}
													</p>
												</div>
												<button
													onClick={() => onRemoveItem(item.property.id)}
													className="text-gray-400 hover:text-red-500">
													<X className="w-5 h-5" />
												</button>
											</div>
											<div className="flex items-center justify-between">
												<div className="text-xl font-bold text-gray-900 dark:text-white">
													${item.property.price.toLocaleString()}
												</div>
												<div className="flex items-center gap-2">
													<button
														onClick={() =>
															onUpdateQuantity(
																item.property.id,
																item.quantity - 1,
															)
														}
														className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
														-
													</button>
													<span className="w-8 text-center font-semibold">
														{item.quantity}
													</span>
													<button
														onClick={() =>
															onUpdateQuantity(
																item.property.id,
																item.quantity + 1,
															)
														}
														className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
														+
													</button>
												</div>
											</div>
										</div>
									</div>
								))}

								{/* Shipping Options */}
								<div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
									<div className="flex items-center gap-3 mb-4">
										<Truck className="w-5 h-5 text-blue-600" />
										<h4 className="font-semibold text-gray-900 dark:text-white">
											Delivery Options
										</h4>
									</div>
									<div className="space-y-3">
										<label className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
											<div>
												<div className="font-medium text-gray-900 dark:text-white">
													Standard Delivery
												</div>
												<div className="text-sm text-gray-600 dark:text-gray-400">
													5-7 business days
												</div>
											</div>
											<div className="font-semibold">$0</div>
										</label>
										<label className="flex items-center justify-between p-3 border border-blue-500 rounded-lg cursor-pointer bg-blue-50 dark:bg-blue-900/20">
											<div>
												<div className="font-medium text-gray-900 dark:text-white">
													Express Delivery
												</div>
												<div className="text-sm text-gray-600 dark:text-gray-400">
													1-2 business days
												</div>
											</div>
											<div className="font-semibold text-blue-600 dark:text-blue-400">
												$299
											</div>
										</label>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Footer */}
					{cart.length > 0 && (
						<div className="border-t border-gray-200 dark:border-gray-800 p-6">
							<div className="space-y-4">
								<div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
									<span>Total</span>
									<span>${cartTotal.toLocaleString()}</span>
								</div>
								<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
									<Lock className="w-4 h-4" />
									<span>Secure checkout powered by Stripe</span>
								</div>
								<button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-green-600 transition-all flex items-center justify-center gap-2">
									<CreditCard className="w-5 h-5" />
									Proceed to Checkout
									<ChevronRight className="w-5 h-5" />
								</button>
								<button className="w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
									Continue Shopping
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
