/** @format */
"use client";

import { ConnectButton } from "@suiet/wallet-kit";

export default function ConnectWalletButton() {
	return (
		<div className="flex items-center justify-center">
			<style>{`
				/* Connect Wallet Button - Institutional Capsule */
				.suiet-connect-button {
					background: #111827 !important; /* gray-900 */
					border: 1px solid rgba(255, 255, 255, 0.1) !important;
					color: #ffffff !important;
					font-family: inherit !important;
					font-weight: 900 !important;
					font-size: 10px !important;
					padding: 0.8rem 2rem !important;
					border-radius: 9999px !important;
					transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
					box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1) !important;
					cursor: pointer !important;
					display: inline-flex !important;
					align-items: center !important;
					justify-content: center !important;
					gap: 0.75rem !important;
					text-transform: uppercase !important;
					letter-spacing: 0.4em !important;
					min-height: 52px !important;
				}

				.suiet-connect-button:hover {
					background: #2563eb !important; /* blue-600 */
					box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.3) !important;
					transform: scale(1.05) !important;
					border-color: rgba(255, 255, 255, 0.2) !important;
				}

				.suiet-connect-button:active {
					transform: scale(0.98) !important;
				}

				/* Connected state - Emerald Green */
				.suiet-connect-button.connected {
					background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
					border-color: rgba(52, 211, 153, 0.2) !important;
					box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2) !important;
				}

				.suiet-connect-button.connected:hover {
					background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
					border-color: rgba(52, 211, 153, 0.4) !important;
					box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3) !important;
				}

				/* Dropdown menu styling - Premium Dark Theme */
				.suiet-wallet-kit-dialog,
				.suiet-wallet-kit-dropdown {
					background: #111827 !important; /* gray-900 */
					border: 1px solid #374151 !important; /* gray-700 */
					border-radius: 1rem !important;
					box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3) !important;
					backdrop-filter: blur(12px) !important;
				}

				.suiet-wallet-kit-dialog-title,
				.suiet-wallet-kit-dropdown > div {
					color: #f3f4f6 !important; /* gray-100 */
					font-weight: 600 !important;
					font-family: var(--font-sans) !important;
				}

				/* Dialog/Modal background */
				.suiet-wallet-kit-dialog-overlay {
					background: rgba(3, 7, 18, 0.8) !important;
					backdrop-filter: blur(8px) !important;
				}

				/* Wallet option buttons */
				.suiet-wallet-kit-option,
				.suiet-wallet-option {
					background: #1f2937 !important; /* gray-800 */
					border: 1px solid #374151 !important; /* gray-700 */
					color: #f3f4f6 !important; /* gray-100 */
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
					border-radius: 0.75rem !important;
					padding: 1rem !important;
					margin-bottom: 0.5rem !important;
				}

				.suiet-wallet-kit-option:hover,
				.suiet-wallet-option:hover {
					background: #374151 !important; /* gray-700 */
					border-color: #3b82f6 !important; /* blue-500 */
					transform: translateY(-2px) !important;
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3) !important;
				}

				/* Text styling */
				.suiet-wallet-kit-option-name,
				.suiet-wallet-option-name {
					color: #f3f4f6 !important;
					font-weight: 600 !important;
					font-size: 0.95rem !important;
				}

				.suiet-wallet-kit-option-description,
				.suiet-wallet-option-description {
					color: #9ca3af !important; /* gray-400 */
					font-size: 0.85rem !important;
				}

				/* Close button */
				.suiet-wallet-kit-dialog-close,
				.suiet-close-button {
					color: #9ca3af !important;
					background: transparent !important;
					border: 1px solid transparent !important;
					border-radius: 0.5rem !important;
					padding: 0.25rem !important;
					transition: all 0.2s !important;
				}

				.suiet-wallet-kit-dialog-close:hover,
				.suiet-close-button:hover {
					color: #f3f4f6 !important;
					background: #374151 !important;
					border-color: #4b5563 !important;
				}

				/* Disconnect/logout button */
				.suiet-disconnect-button {
					background: #ef4444 !important;
					color: #ffffff !important;
					border: 1px solid rgba(239, 68, 68, 0.4) !important;
					border-radius: 0.75rem !important;
					padding: 0.75rem 1rem !important;
					font-weight: 600 !important;
					font-family: var(--font-sans) !important;
					transition: all 0.2s !important;
				}

				.suiet-disconnect-button:hover {
					background: #dc2626 !important;
					border-color: rgba(239, 68, 68, 0.8) !important;
					box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3) !important;
					transform: translateY(-1px) !important;
				}

				/* Account info section */
				.suiet-wallet-kit-account {
					background: #111827 !important;
					border: 1px solid #374151 !important;
					border-radius: 0.75rem !important;
					padding: 1rem !important;
					color: #f3f4f6 !important;
				}

				.suiet-wallet-kit-account-address {
					color: #60a5fa !important;
					font-weight: 700 !important;
					font-family: var(--font-mono) !important;
					background: rgba(96, 165, 250, 0.1) !important;
					padding: 0.25rem 0.5rem !important;
					border-radius: 0.375rem !important;
				}

				/* Loading state */
				.suiet-loading {
					color: #60a5fa !important;
				}

				/* Fix icons alignment */
				.suiet-wallet-kit-option-icon,
				.suiet-wallet-option-icon {
					filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
				}
			`}</style>
			<ConnectButton />
		</div>
	);
}
