/** @format */
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		setMounted(true);
		const stored = localStorage.getItem("theme") as "light" | "dark" | null;
		const systemDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		if (stored) {
			setTheme(stored);
		} else if (systemDark) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}, []);

	useEffect(() => {
		if (!mounted) return;

		const root = document.documentElement;
		const body = document.body;

		// Remove both classes first
		root.classList.remove("light", "dark");
		body.classList.remove("light", "dark");

		// Add current theme
		root.classList.add(theme);
		body.classList.add(theme);

		// Update localStorage
		localStorage.setItem("theme", theme);

		// Update meta theme-color for mobile browsers
		const metaThemeColor = document.querySelector("meta[name='theme-color']");
		if (metaThemeColor) {
			metaThemeColor.setAttribute(
				"content",
				theme === "dark" ? "#111827" : "#ffffff",
			);
		}
	}, [theme, mounted]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	if (!mounted) {
		return (
			<div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
		);
	}

	return (
		<button
			onClick={toggleTheme}
			className="relative w-10 h-6 rounded-full transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
			title={`Current theme: ${theme}`}>
			{/* Track */}
			<div
				className={cn(
					"absolute inset-0 rounded-full transition-colors duration-300",
					theme === "light"
						? "bg-gradient-to-r from-blue-200 to-blue-300"
						: "bg-gradient-to-r from-gray-700 to-gray-800",
				)}
			/>

			{/* Sun/Moon indicators - Always visible */}
			<div className="absolute inset-0 rounded-full flex items-center justify-between px-2">
				<Sun className="w-3 h-3 text-yellow-500 transition-opacity duration-300" />
				<Moon className="w-3 h-3 text-blue-300 transition-opacity duration-300" />
			</div>

			{/* Thumb */}
			<div
				className={cn(
					"absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center",
					theme === "dark" && "translate-x-4",
				)}>
				{theme === "light" ? (
					<Sun className="w-2.5 h-2.5 text-yellow-500" />
				) : (
					<Moon className="w-2.5 h-2.5 text-gray-800" />
				)}
			</div>
		</button>
	);
}

function cn(...classes: (string | boolean | undefined | null)[]) {
	return classes.filter(Boolean).join(" ");
}
