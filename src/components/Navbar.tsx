/** @format */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
	Menu,
	X,
	Rocket,
	Home,
	Info,
	Building,
	Users,
	Briefcase,
	Phone,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import MobileSidebar from "./MobileSidebar";
import { cn } from "@/lib/utils";

// Icon mapping for navigation items
const navIcons = {
	home: Home,
	"about-us": Info,
	"for-investors": Briefcase,
	"for-developers": Building,
	company: Users,
	"contact-us": Phone,
};

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	const navItems = [
		{ href: "/", label: "Home", key: "home" },
		{ href: "/about-us", label: "About Us", key: "about-us" },
		{ href: "/for-investors", label: "For Investors", key: "for-investors" },
		{ href: "/for-developers", label: "For Developers", key: "for-developers" },
		{ href: "/company", label: "Company", key: "company" },
		{ href: "/contact-us", label: "Contact Us", key: "contact-us" },
	];

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	const isActive = (href: string) => {
		if (href === "/") return pathname === href;
		return pathname === href || pathname?.startsWith(`${href}/`);
	};

	return (
		<>
			{/* Main Navigation */}
			<header
				className={cn(
					"sticky top-0 z-50 w-full transition-all duration-500 ease-out",
					isScrolled
						? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-blue-500/5 dark:shadow-black/20"
						: "bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-lg",
					"border-b border-gray-200/50 dark:border-gray-800/50",
					"px-4 sm:px-6 lg:px-8 xl:px-10",
				)}>
				{/* Animated Background Element */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5 rounded-full blur-3xl" />
					<div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 dark:from-cyan-400/5 dark:to-blue-400/5 rounded-full blur-3xl" />
				</div>

				<div className="relative mx-auto w-full max-w-screen-2xl">
					<div className="flex items-center justify-between h-16 lg:h-20">
						{/* Left Section: Mobile Menu Button + Logo */}
						<div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
							{/* Mobile Menu Button */}
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
								aria-label="Toggle menu"
								aria-expanded={isMobileMenuOpen}>
								{isMobileMenuOpen ? (
									<X className="w-5 h-5" />
								) : (
									<Menu className="w-5 h-5" />
								)}
							</button>

							{/* Logo Section */}
							<Link
								href="/"
								className="flex items-center gap-3 group"
								aria-label="StrataDeed Home">
								<div className="relative">
									<div className="w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-500 dark:via-blue-400 dark:to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 dark:shadow-blue-400/20 group-hover:shadow-xl group-hover:shadow-blue-500/40 dark:group-hover:shadow-blue-400/30 transition-all duration-500 group-hover:scale-105">
										<span className="text-white font-bold text-lg relative z-10">
											SD
										</span>
									</div>
								</div>
								<div className="flex flex-col">
									<span className="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-cyan-600 dark:from-white dark:via-blue-300 dark:to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
										StrataDeed
									</span>
									<span className="hidden sm:block text-xs text-gray-600 dark:text-gray-400 font-medium uppercase tracking-[0.2em] leading-none mt-0.5">
										Property{" "}
										<span className="text-blue-600 dark:text-blue-400">
											Tokenization
										</span>
									</span>
								</div>
							</Link>
						</div>

						{/* Desktop Navigation - Centered */}
						<nav className="hidden lg:flex items-center justify-center flex-1 mx-8 xl:mx-12 2xl:mx-16">
							<div className="relative">
								{/* Decorative border - removed dark background */}
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10 dark:from-blue-400/10 dark:via-transparent dark:to-cyan-400/10 rounded-full blur-sm" />
								<div className="relative flex items-center gap-6 xl:gap-8">
									{navItems.map((item) => {
										const Icon = navIcons[item.key as keyof typeof navIcons];
										const active = isActive(item.href);

										return (
											<Link
												key={item.href}
												href={item.href}
												className={cn(
													"flex items-center gap-2 text-sm font-medium transition-all duration-300 relative group/nav",
													active
														? "text-blue-600 dark:text-blue-400"
														: "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
												)}
												aria-current={active ? "page" : undefined}>
												<Icon
													className={cn(
														"w-4 h-4 transition-all duration-300",
														active
															? "text-blue-600 dark:text-blue-400"
															: "text-gray-500 dark:text-gray-400 group-hover/nav:text-blue-600 dark:group-hover/nav:text-blue-400",
													)}
												/>
												<span className="relative">
													{item.label}
													{/* Underline on active */}
													{active && (
														<div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 rounded-full" />
													)}
													{/* Hover underline effect */}
													{!active && (
														<div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-cyan-500/0 dark:from-blue-500/0 dark:via-blue-500/50 dark:to-cyan-400/0 rounded-full scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-center" />
													)}
												</span>
											</Link>
										);
									})}
								</div>
							</div>
						</nav>

						{/* Right Section: Theme Toggle + Signup Button */}
						<div className="flex items-center gap-3 lg:gap-4 xl:gap-5 flex-shrink-0">
							{/* Theme Toggle */}
							<ThemeToggle />

							{/* Desktop Signup Button */}
							<div className="hidden lg:flex items-center">
								<Link
									href="/signup"
									className="px-5 py-2.5 xl:px-6 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 text-white text-sm font-medium rounded-full shadow-lg shadow-blue-500/20 dark:shadow-blue-400/10 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/20 hover:scale-105 active:scale-95 transition-all duration-300">
									<span className="flex items-center gap-2">
										<Rocket className="w-4 h-4" />
										Sign Up
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Mobile Sidebar Component */}
			<MobileSidebar
				isOpen={isMobileMenuOpen}
				onClose={() => setIsMobileMenuOpen(false)}
				navItems={navItems}
				isActive={isActive}
			/>
		</>
	);
}
