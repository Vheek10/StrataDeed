/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	ArrowLeft,
	User,
	Mail,
	Lock,
	Eye,
	EyeOff,
	UserPlus,
	Chrome,
	Github,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		acceptTerms: false,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate passwords match
		if (formData.password !== formData.confirmPassword) {
			alert("Passwords don't match!");
			return;
		}

		setIsLoading(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setIsLoading(false);
		router.push("/dashboard");
	};

	const handleChange = (
		field: keyof typeof formData,
		value: string | boolean,
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Back Button */}
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-accent-2 dark:hover:text-accent-2 transition-colors duration-200 mb-8">
					<ArrowLeft className="w-4 h-4" />
					Back to home
				</Link>

				{/* Card */}
				<div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-8">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-3/10 to-accent-3-light/10 rounded-2xl flex items-center justify-center">
							<UserPlus className="w-8 h-8 text-accent-3" />
						</div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
							Join StrataDeed
						</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-2">
							Create your account to get started
						</p>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className="space-y-6">
						{/* Name */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Full Name
							</label>
							<div className="relative">
								<User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type="text"
									value={formData.name}
									onChange={(e) => handleChange("name", e.target.value)}
									placeholder="John Doe"
									required
									className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-2 focus:border-transparent transition-all duration-200"
								/>
							</div>
						</div>

						{/* Email */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Email Address
							</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type="email"
									value={formData.email}
									onChange={(e) => handleChange("email", e.target.value)}
									placeholder="you@example.com"
									required
									className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-2 focus:border-transparent transition-all duration-200"
								/>
							</div>
						</div>

						{/* Password */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Password
							</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type={showPassword ? "text" : "password"}
									value={formData.password}
									onChange={(e) => handleChange("password", e.target.value)}
									placeholder="••••••••"
									required
									minLength={8}
									className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-2 focus:border-transparent transition-all duration-200"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
									{showPassword ? (
										<EyeOff className="w-5 h-5 text-gray-400" />
									) : (
										<Eye className="w-5 h-5 text-gray-400" />
									)}
								</button>
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
								Must be at least 8 characters
							</p>
						</div>

						{/* Confirm Password */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Confirm Password
							</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type={showConfirmPassword ? "text" : "password"}
									value={formData.confirmPassword}
									onChange={(e) =>
										handleChange("confirmPassword", e.target.value)
									}
									placeholder="••••••••"
									required
									className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-2 focus:border-transparent transition-all duration-200"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
									{showConfirmPassword ? (
										<EyeOff className="w-5 h-5 text-gray-400" />
									) : (
										<Eye className="w-5 h-5 text-gray-400" />
									)}
								</button>
							</div>
						</div>

						{/* Terms */}
						<div>
							<label className="flex items-start gap-3 cursor-pointer">
								<input
									type="checkbox"
									checked={formData.acceptTerms}
									onChange={(e) =>
										handleChange("acceptTerms", e.target.checked)
									}
									required
									className="w-4 h-4 text-accent-2 rounded focus:ring-accent-2 mt-1"
								/>
								<span className="text-sm text-gray-600 dark:text-gray-400">
									I agree to the{" "}
									<Link
										href="/terms"
										className="text-accent-2 hover:text-accent-2-dark font-medium">
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link
										href="/privacy"
										className="text-accent-2 hover:text-accent-2-dark font-medium">
										Privacy Policy
									</Link>
								</span>
							</label>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading}
							className={cn(
								"w-full flex items-center justify-center gap-2 px-4 py-3",
								"bg-gradient-to-r from-accent-3 to-accent-3-light text-white font-semibold rounded-lg",
								"hover:shadow-lg hover:shadow-accent-3/30 transition-all duration-300",
								"disabled:opacity-70 disabled:cursor-not-allowed",
								"group",
							)}>
							{isLoading ? (
								<>
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									<span>Creating Account...</span>
								</>
							) : (
								<>
									<UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
									<span>Create Account</span>
								</>
							)}
						</button>

						{/* Divider */}
						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
									Or sign up with
								</span>
							</div>
						</div>

						{/* Social Sign Up */}
						<div className="grid grid-cols-2 gap-3">
							<button
								type="button"
								className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group/social">
								<Chrome className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover/social:scale-110 transition-transform" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Google
								</span>
							</button>
							<button
								type="button"
								className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group/social">
								<Github className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover/social:scale-110 transition-transform" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									GitHub
								</span>
							</button>
						</div>

						{/* Sign In Link */}
						<div className="text-center pt-4">
							<p className="text-gray-600 dark:text-gray-400">
								Already have an account?{" "}
								<Link
									href="/signin"
									className="text-accent-2 hover:text-accent-2-dark font-semibold transition-colors">
									Sign in
								</Link>
							</p>
						</div>
					</form>

					{/* Footer */}
					<div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
						<p className="text-xs text-center text-gray-500 dark:text-gray-400">
							Your data is protected with enterprise-grade security
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
