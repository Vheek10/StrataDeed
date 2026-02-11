/** @format */
"use client";
import Link from "next/link";
import Image from "next/image";
import {
	X,
	Home,
	Info,
	Building,
	Users,
	Briefcase,
	Phone,
	Wallet,
	CheckCircle,
	LogOut,
	Settings,
	User,
	Store,
	LineChart,
	Building2,
	FileText,
	PlusCircle,
	ArrowUpRight,
	Shield,
	Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSuiWallet } from "@/providers/suiet-provider";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Updated icon mapping for navigation items
const navIcons = {
	home: Building2,
	"about-us": FileText,
	about: FileText,
	marketplace: Store,
	company: Users,
	"contact-us": Phone,
	mint: PlusCircle,
	dashboard: Briefcase,
} as const;

// Type for icon keys
type IconKey = keyof typeof navIcons;

// Fixed framer-motion variants with proper types
const sidebarVariants: Variants = {
	closed: { x: "-100%", opacity: 0 },
	open: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			staggerChildren: 0.05,
			delayChildren: 0.1,
		},
	},
	exit: {
		x: "-100%",
		opacity: 0,
		transition: { duration: 0.25, ease: "easeInOut" },
	},
};

const itemVariants: Variants = {
	closed: { opacity: 0, x: -20 },
	open: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.4, ease: "easeOut" },
	},
};

const backdropVariants: Variants = {
	closed: { opacity: 0 },
	open: { opacity: 1 },
	exit: { opacity: 0 },
};

interface MobileSidebarProps {
	isOpen: boolean;
	onClose: () => void;
	navItems: {
		href: string;
		label: string;
		key: string;
	}[];
	isActive: (href: string) => boolean;
	isConnected?: boolean;
	address?: string;
}

export default function MobileSidebar({
	isOpen,
	onClose,
	navItems,
	isActive,
	isConnected,
	address,
}: MobileSidebarProps) {
	const { disconnect } = useSuiWallet();

	const handleDisconnect = () => {
		disconnect();
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						variants={backdropVariants}
						initial="closed"
						animate="open"
						exit="exit"
						className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md lg:hidden"
						onClick={onClose}
						aria-hidden="true"
					/>

					{/* Sidebar Panel */}
					<motion.div
						variants={sidebarVariants}
						initial="closed"
						animate="open"
						exit="exit"
						className="fixed inset-y-0 left-0 z-50 w-[300px] sm:w-[340px] lg:hidden">
						<div className="h-full bg-white border-r border-gray-200 shadow-[0_0_60px_-15px_rgba(0,0,0,0.15)] overflow-y-auto flex flex-col">
							{/* Header */}
							<div className="p-6 pb-4">
								<div className="flex items-center justify-between mb-2">
									{/* Logo */}
									<motion.div
										variants={itemVariants}
										className="flex items-center gap-3">
										<div className="relative w-10 h-10 flex-shrink-0">
											<Image
												src="/logo.png"
												alt="StrataDeed Logo"
												fill
												className="object-contain"
												sizes="40px"
											/>
										</div>
										<div className="flex flex-col">
											<span className="text-lg font-black text-gray-900 leading-tight tracking-tight font-mclaren">
												StrataDeed
											</span>
											<span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] leading-none mt-0.5 font-montserrat">
												Tokenization
											</span>
										</div>
									</motion.div>

									{/* Close Button */}
									<motion.button
										variants={itemVariants}
										onClick={onClose}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className="p-2.5 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300 border border-gray-200"
										aria-label="Close menu">
										<X className="w-4 h-4" />
									</motion.button>
								</div>

								{/* Subtle divider */}
								<div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-4" />
							</div>

							{/* Navigation */}
							<nav className="flex-1 px-4 pb-4">
								<motion.div variants={itemVariants}>
									<p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] px-3 mb-3 font-montserrat">
										Navigation
									</p>
								</motion.div>

								<div className="space-y-1">
									{navItems.map((item, index) => {
										const Icon = navIcons[item.key as IconKey] || Building2;
										const active = isActive(item.href);

										return (
											<motion.div
												key={item.href}
												variants={itemVariants}
												custom={index}>
												<Link
													href={item.href}
													className={cn(
														"group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden",
														active
															? "bg-blue-50 border border-blue-100"
															: "hover:bg-gray-50 border border-transparent hover:border-gray-100",
													)}
													onClick={onClose}>
													{/* Active indicator bar */}
													{active && (
														<div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-600 rounded-r-full" />
													)}

													<div
														className={cn(
															"w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0",
															active
																? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
																: "bg-gray-100 text-gray-500 group-hover:text-blue-600 group-hover:bg-blue-50 border border-gray-200",
														)}>
														<Icon className="w-4 h-4" />
													</div>

													<span
														className={cn(
															"text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300 font-montserrat",
															active
																? "text-blue-600"
																: "text-gray-600 group-hover:text-gray-900",
														)}>
														{item.label}
													</span>

													{active && (
														<div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
													)}
												</Link>
											</motion.div>
										);
									})}
								</div>
							</nav>

							{/* Auth / Wallet Section */}
							<div className="mt-auto p-4 pt-0">
								{/* Divider */}
								<div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

								{isConnected && address ? (
									<motion.div
										variants={itemVariants}
										className="space-y-3">
										{/* Wallet Status Card */}
										<div className="px-4 py-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-sm">
											<div className="flex items-center gap-3 mb-3">
												<div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
													<CheckCircle className="w-4 h-4 text-emerald-600" />
												</div>
												<div>
													<p className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.3em] font-montserrat">
														Connected
													</p>
													<p className="text-[10px] text-gray-500 font-mono mt-0.5">
														{address.slice(0, 8)}...
														{address.slice(-6)}
													</p>
												</div>
											</div>

											{/* Network badge */}
											<div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-xl border border-gray-200">
												<div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
												<span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] font-montserrat">
													Sui Testnet
												</span>
											</div>
										</div>

										{/* Connected User Links */}
										<div className="space-y-1">
											<Link
												href="/vault"
												className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-300"
												onClick={onClose}>
												<div className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300">
													<Shield className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-600 transition-colors" />
												</div>
												<span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-600 group-hover:text-gray-900 transition-colors font-montserrat">
													Vault
												</span>
											</Link>

											<Link
												href="/settings"
												className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-300"
												onClick={onClose}>
												<div className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center group-hover:bg-gray-200 transition-all duration-300">
													<Settings className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700 transition-colors" />
												</div>
												<span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-600 group-hover:text-gray-900 transition-colors font-montserrat">
													Settings
												</span>
											</Link>
										</div>

										{/* Disconnect Button - Capsule */}
										<motion.button
											onClick={handleDisconnect}
											whileHover={{ scale: 1.02, y: -2 }}
											whileTap={{ scale: 0.98 }}
											className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-full bg-gray-100 border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all duration-500 group">
											<LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
											<span className="text-[10px] font-black text-gray-600 group-hover:text-red-600 uppercase tracking-[0.3em] font-montserrat transition-colors">
												Disconnect
											</span>
										</motion.button>
									</motion.div>
								) : (
									<motion.div
										variants={itemVariants}
										className="space-y-3">
										{/* Connect Wallet CTA - Capsule Style */}
										<motion.div
											whileHover={{
												scale: 1.03,
												y: -3,
												backgroundColor: "#2563eb",
											}}
											whileTap={{ scale: 0.98 }}
											className="bg-gray-900 rounded-full">
											<Link
												href="/signup"
												className="group flex items-center justify-center gap-3 px-8 py-5 text-white rounded-full transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]"
												onClick={onClose}>
												<Wallet className="w-4 h-4 group-hover:scale-110 transition-transform" />
												<span className="text-[10px] font-black uppercase tracking-[0.4em] font-montserrat">
													Connect Wallet
												</span>
												<ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
											</Link>
										</motion.div>

										{/* Security Badge */}
										<div className="flex items-center justify-center gap-2 px-4 py-2">
											<Shield className="w-3 h-3 text-gray-400" />
											<span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] font-montserrat">
												Zero-Knowledge Privacy
											</span>
										</div>
									</motion.div>
								)}

								{/* Bottom branding */}
								<div className="mt-4 pt-3 border-t border-gray-100">
									<div className="flex items-center justify-center gap-2">
										<Sparkles className="w-3 h-3 text-gray-400" />
										<span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.5em] font-montserrat">
											Institutional Standard
										</span>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
