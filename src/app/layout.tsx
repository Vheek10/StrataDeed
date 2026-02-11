/** @format */

import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SuietProvider } from "@/providers/suiet-provider";

// Configure Montserrat font from Google Fonts
const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	variable: "--font-sans",
});

export const metadata = {
	title: "StrataDeed — Tokenized Property Deeds on Sui",
	description:
		"Mint, list, and discover tokenized property deeds on the Sui Network.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${montserrat.variable}`}>
			<head>
				<link
					rel="icon"
					href="/logo.png"
					type="image/png"
				/>
			</head>
			<body className="font-montserrat antialiased bg-bg text-text">
				<SuietProvider>
					<div className="min-h-screen flex flex-col">
						<Navbar />
						<main className="flex-1 w-full">{children}</main>
						<Footer />
					</div>
				</SuietProvider>
			</body>
		</html>
	);
}
