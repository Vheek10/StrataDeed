/** @format */
"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const quickPrompts = [
	"How does tokenization work?",
	"What is fractional ownership?",
	"How do I list a property?",
	"Is my investment secure?",
];

export default function AIAssistantButton() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<
		{ role: "user" | "assistant"; content: string }[]
	>([
		{
			role: "assistant",
			content:
				"Hello! I'm StrataDeed AI. I can help you understand property tokenization, navigate the marketplace, or answer any questions about our platform. How can I assist you today?",
		},
	]);
	const [input, setInput] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, isTyping]);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const handleSend = (text?: string) => {
		const message = text || input.trim();
		if (!message) return;

		setMessages((prev) => [...prev, { role: "user", content: message }]);
		setInput("");
		setIsTyping(true);

		// Simulated AI response
		setTimeout(() => {
			const responses: Record<string, string> = {
				"How does tokenization work?":
					"Property tokenization converts real estate assets into digital tokens on the Sui blockchain. Each token represents verified ownership rights, enabling fractional purchases, instant settlement, and transparent global transactions — all secured by smart contracts.",
				"What is fractional ownership?":
					"Fractional ownership lets you invest in properties by purchasing a fraction of the total value — as small as 0.01%. You receive proportional rental income and capital gains, all managed transparently on-chain.",
				"How do I list a property?":
					"To list a property: 1) Connect your Sui wallet, 2) Navigate to the Mint page, 3) Upload property documents and details, 4) Our AI verifies the title and compliance, 5) Your property is tokenized and listed on the marketplace.",
				"Is my investment secure?":
					"Absolutely. Every property is verified through our AI-powered compliance layer and secured by zero-knowledge proofs. Smart contracts enforce ownership rights, and all transactions are immutably recorded on-chain.",
			};

			const response =
				responses[message] ||
				"Thank you for your question! Our AI is processing your request. For detailed assistance, please visit our About page or contact our team directly through the Contact page.";

			setIsTyping(false);
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: response },
			]);
		}, 1500);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<>
			{/* Chat Panel */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
						className="fixed bottom-24 right-6 z-9998 w-[calc(100vw-3rem)] max-w-[400px] rounded-3xl border border-gray-200/60 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden"
						id="ai-assistant-panel">
						{/* Header */}
						<div className="relative bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 px-5 py-4">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]" />
							<div className="relative flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="relative w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-blue-500/30 overflow-hidden border border-gray-100">
										<Image
											src="/logo.png"
											alt="StrataDeed Logo"
											width={40}
											height={40}
											className="object-contain brightness-0"
										/>
										<div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-gray-900" />
									</div>
									<div>
										<p className="text-sm font-black text-white font-montserrat tracking-wide">
											StrataDeed AI
										</p>
										<p className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.3em] font-montserrat">
											Always Online
										</p>
									</div>
								</div>
								<button
									onClick={() => setIsOpen(false)}
									className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
									aria-label="Close AI Assistant">
									<X className="w-4 h-4" />
								</button>
							</div>
						</div>

						{/* Messages */}
						<div className="h-80 overflow-y-auto px-4 py-4 space-y-4 bg-linear-to-b from-gray-50/50 to-white scrollbar-thin">
							{messages.map((msg, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
									className={cn(
										"flex gap-2.5",
										msg.role === "user" ? "justify-end" : "justify-start",
									)}>
									{msg.role === "assistant" && (
										<div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm overflow-hidden border border-gray-100">
											<Image
												src="/logo.png"
												alt="StrataDeed Logo"
												width={28}
												height={28}
												className="object-contain brightness-0"
											/>
										</div>
									)}
									<div
										className={cn(
											"max-w-[80%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed font-montserrat",
											msg.role === "user"
												? "bg-gray-900 text-white rounded-br-md"
												: "bg-white text-gray-700 border border-gray-100 shadow-sm rounded-bl-md",
										)}>
										{msg.content}
									</div>
								</motion.div>
							))}

							{isTyping && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="flex gap-2.5 justify-start">
									<div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm overflow-hidden border border-gray-100">
										<Image
											src="/logo.png"
											alt="StrataDeed Logo"
											width={28}
											height={28}
											className="object-contain brightness-0"
										/>
									</div>
									<div className="bg-white text-gray-400 border border-gray-100 shadow-sm rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
										<div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
										<div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
										<div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
									</div>
								</motion.div>
							)}
							<div ref={messagesEndRef} />
						</div>

						{/* Quick Prompts */}
						{messages.length <= 1 && (
							<div className="px-4 pb-3">
								<p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2 font-montserrat">
									Quick Questions
								</p>
								<div className="flex flex-wrap gap-1.5">
									{quickPrompts.map((prompt, i) => (
										<button
											key={i}
											onClick={() => handleSend(prompt)}
											className="text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105 font-montserrat border border-blue-100">
											{prompt}
										</button>
									))}
								</div>
							</div>
						)}

						{/* Input */}
						<div className="border-t border-gray-100 px-4 py-3 bg-white">
							<div className="flex items-center gap-2 bg-gray-50 rounded-full border border-gray-200 px-3 py-2 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-300 shadow-sm">
								<input
									ref={inputRef}
									type="text"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={handleKeyDown}
									placeholder="Ask me anything..."
									className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none font-montserrat px-2"
									id="ai-assistant-input"
								/>
								<button
									onClick={() => handleSend()}
									disabled={!input.trim() || isTyping}
									className={cn(
										"w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0",
										input.trim() && !isTyping
											? "bg-gray-900 text-white hover:bg-blue-600 hover:scale-105 shadow-sm"
											: "bg-gray-200 text-gray-400 cursor-not-allowed",
									)}
									aria-label="Send message">
									<Send className="w-4 h-4" />
								</button>
							</div>
							<p className="text-[8px] text-gray-400 text-center mt-2 font-montserrat">
								Powered by StrataDeed AI
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Floating Button */}
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				whileHover={{ scale: 1.1, y: -3 }}
				whileTap={{ scale: 0.95 }}
				className={cn(
					"fixed bottom-6 right-6 z-9999 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group",
					isOpen
						? "bg-gray-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]"
						: "bg-linear-to-br from-blue-600 to-cyan-500 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(37,99,235,0.5)]",
				)}
				aria-label="Toggle AI Assistant"
				id="ai-assistant-toggle">
				{/* Ambient glow ring */}
				{!isOpen && (
					<>
						<div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-600 to-cyan-500 animate-ping opacity-20" />
						<div className="absolute -inset-1 rounded-2xl bg-linear-to-br from-blue-400/20 to-cyan-400/20 blur-md" />
					</>
				)}

				<AnimatePresence mode="wait">
					{isOpen ? (
						<motion.div
							key="close"
							initial={{ rotate: -90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: 90, opacity: 0 }}
							transition={{ duration: 0.2 }}>
							<X className="w-6 h-6 text-white relative z-10" />
						</motion.div>
					) : (
						<motion.div
							key="bot"
							initial={{ rotate: 90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: -90, opacity: 0 }}
							transition={{ duration: 0.2 }}>
							<div className="relative z-10 w-7 h-7 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-sm border border-gray-100">
								<Image
									src="/logo.png"
									alt="StrataDeed Logo"
									width={28}
									height={28}
									className="object-contain brightness-0"
								/>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>
		</>
	);
}
