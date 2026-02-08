/** @format */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Building2,
	Home,
	Info,
	Building,
	PlusCircle,
	Briefcase,
	Mail,
	Phone,
	MapPin,
	Twitter,
	Linkedin,
	Github,
	Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
	return (
		<footer className="bg-white border-t border-gray-200">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex flex-col lg:flex-row justify-between items-center gap-8">
					{/* Brand Section */}
					<div className="flex items-center gap-4">
						<div className="relative w-10 h-10">
							<Image
								src="/logo.png"
								alt="StrataDeed Logo"
								fill
								className="object-contain"
								sizes="40px"
							/>
						</div>
						<div>
							<h2 className="text-xl font-bold text-gray-900">StrataDeed</h2>
							<p className="text-xs text-blue-600/80 font-medium uppercase tracking-[0.15em] mt-0.5">
								Property Tokenization
							</p>
						</div>
					</div>

					{/* Links */}
					<div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
						{[
							{ label: "About", href: "/about" },
							{ label: "Marketplace", href: "/marketplace" },
							{ label: "Mint", href: "/mint" },
							{ label: "Dashboard", href: "/dashboard" },
							{ label: "Contact", href: "/contact" },
						].map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className="hover:text-blue-600 hover:tracking-[0.3em] transition-all duration-300"
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Social */}
					<div className="flex items-center gap-6">
						{[
							{ icon: Twitter, href: "#" },
							{ icon: Linkedin, href: "#" },
							{ icon: Github, href: "#" },
						].map((social, i) => (
							<a
								key={i}
								href={social.href}
								className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:scale-110 hover:rotate-3 transition-all duration-500 shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.3)]"
							>
								<social.icon className="w-5 h-5" />
							</a>
						))}
					</div>
				</div>

				{/* Copyright */}
					<div className="text-center mt-8 pt-6 border-t border-gray-200">
					<p className="text-gray-500 text-sm">
						© {new Date().getFullYear()} StrataDeed. Revolutionizing real estate
						investment.
					</p>
				</div>
			</div>
		</footer>
	);
}
