/** @format */
"use client";

import { useState } from "react";
import { Settings, Bell, Wallet, User } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";

const SettingsPage = () => {
	const [emailUpdates, setEmailUpdates] = useState(true);

	return (
		<AuthGuard>
			<div className="min-h-screen bg-gray-50 dark:bg-gray-950">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
					{/* Header */}
					<header className="space-y-2">
						<div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1">
							<Settings className="w-4 h-4 text-blue-500" />
							<span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
								Settings
							</span>
						</div>
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">
								Account settings
							</h1>
							<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
								Basic controls for your StrataDeed profile, wallet and
								notifications.
							</p>
						</div>
					</header>

					<div className="space-y-6">
						{/* Profile */}
						<section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3">
							<div className="flex items-center gap-2">
								<User className="w-4 h-4 text-blue-500" />
								<h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
									Profile
								</h2>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								Your identity in StrataDeed is tied to your connected wallet.
								Profile details will be editable in a later version.
							</p>
						</section>

						{/* Wallet */}
						<section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3">
							<div className="flex items-center gap-2">
								<Wallet className="w-4 h-4 text-emerald-500" />
								<h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
									Wallet
								</h2>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								Connect or disconnect your wallet using the button in the
								navbar. StrataDeed does not custody your assets or private keys.
							</p>
						</section>

						{/* Notifications */}
						<section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-4">
							<div className="flex items-center gap-2">
								<Bell className="w-4 h-4 text-amber-500" />
								<h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
									Notifications
								</h2>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-900 dark:text-gray-100">
										Email updates
									</p>
									<p className="text-xs text-gray-600 dark:text-gray-400">
										Allow StrataDeed to email you about important account
										activity.
									</p>
								</div>
								<button
									onClick={() => setEmailUpdates((v) => !v)}
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
										emailUpdates
											? "bg-blue-500"
											: "bg-gray-300 dark:bg-gray-700"
									}`}>
									<span
										className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
											emailUpdates ? "translate-x-6" : "translate-x-1"
										}`}
									/>
								</button>
							</div>
						</section>
					</div>
				</div>
			</div>
		</AuthGuard>
	);
};

export default SettingsPage;
