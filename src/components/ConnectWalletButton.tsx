/** @format */

"use client";

import { ConnectButton } from "@suiet/wallet-kit";

export default function ConnectWalletButton() {
	return (
		<ConnectButton className="w-full inline-flex items-center justify-center rounded-full bg-gray-900 text-white text-[9px] sm:text-[11px] font-black uppercase tracking-[0.18em] sm:tracking-[0.3em] px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_12px_30px_-12px_rgba(37,99,235,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 font-montserrat">
			Connect
		</ConnectButton>
	);
}
