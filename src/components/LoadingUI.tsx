/** @format */

import Image from "next/image";

/**
 * Branded loading state — logo only with a subtle pulse animation.
 */
export default function LoadingUI() {
	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060a13]">
			{/* Soft ambient glow behind the logo */}
			<div className="absolute h-64 w-64 rounded-full bg-blue-600/10 blur-[100px] animate-pulse" />

			{/* Logo with pulse */}
			<div className="relative h-24 w-24 animate-[logoPulse_2s_ease-in-out_infinite] sm:h-28 sm:w-28">
				<Image
					src="/logo.png"
					alt="StrataDeed"
					fill
					sizes="(max-width: 640px) 96px, 112px"
					className="object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.35)]"
					priority
				/>
			</div>

			{/* Keyframes injected via style tag */}
			<style>{`
				@keyframes logoPulse {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.7; transform: scale(0.92); }
				}
			`}</style>
		</div>
	);
}
