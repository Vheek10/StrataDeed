/** @format */

import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			// Base colors
			black: "#000000",
			white: "#ffffff",
			transparent: "transparent",
			current: "currentColor",

			// PLATINUM MIST - Official palette
			// Primary: #f5f6f7 (light), #c1c4c8 (mid), #7b7d85 (dark), #2b2e33 (charcoal)
			gray: {
				50: "#fafbfc",
				100: "#f5f6f7",
				200: "#ece9ef",
				300: "#dcd7de",
				400: "#c1c4c8",
				500: "#a5a8ac",
				600: "#8a8d91",
				700: "#7b7d85",
				800: "#504d52",
				900: "#3a3840",
				950: "#2b2e33",
			},

			// PLATINUM accent
			platinum: {
				50: "#fafbfc",
				100: "#f5f6f7",
				200: "#ece9ef",
				300: "#dcd7de",
				400: "#c1c4c8",
				500: "#a5a8ac",
				600: "#8a8d91",
				700: "#7b7d85",
				800: "#504d52",
				900: "#3a3840",
				950: "#2b2e33",
			},

			// MIST - subtle blue undertone variant
			mist: {
				50: "#fafcfd",
				100: "#f5f7f9",
				200: "#ececf1",
				300: "#ddd9e1",
				400: "#c2c5cb",
				500: "#a6aaaf",
				600: "#8b8f95",
				700: "#7c7e87",
				800: "#505356",
				900: "#3b3941",
				950: "#2b2e34",
			},

			// Blue palette - accent with platinum undertones
			blue: {
				50: "#f5f8fc",
				100: "#eaf1f8",
				200: "#d4e3f1",
				300: "#b9cfe3",
				400: "#8fa8ce",
				500: "#6984b5",
				600: "#536397",
				700: "#434a7d",
				800: "#363d5a",
				900: "#2b3040",
				950: "#1f2230",
			},

			// Slate - cool platinum slate
			slate: {
				50: "#fafbfc",
				100: "#f5f6f7",
				200: "#ecebf0",
				300: "#dddce2",
				400: "#c2c5cc",
				500: "#a6aaaf",
				600: "#8a8e94",
				700: "#7b7e86",
				800: "#515458",
				900: "#3b3e43",
				950: "#2b2e33",
			},

			// Emerald - muted accent
			emerald: {
				50: "#f4faf8",
				100: "#e8f3f0",
				200: "#cfe2dd",
				300: "#aacdc8",
				400: "#7fb0a4",
				500: "#68938a",
				600: "#537874",
				700: "#46605f",
				800: "#374a49",
				900: "#2c3c3b",
				950: "#1e2e2d",
			},

			// Amber - warm accent
			amber: {
				50: "#fefbf5",
				100: "#fef5e8",
				200: "#fbe9cf",
				300: "#f6d5ae",
				400: "#e8b884",
				500: "#d89f6f",
				600: "#c6845a",
				700: "#ae6c49",
				800: "#94573c",
				900: "#7a4533",
				950: "#5a3224",
			},

			// Red - muted alert
			red: {
				50: "#faf7f5",
				100: "#f4ebe8",
				200: "#e8d5d0",
				300: "#dbb5ab",
				400: "#c98f7f",
				500: "#b57169",
				600: "#a05957",
				700: "#8a4949",
				800: "#6f3b3c",
				900: "#5a3032",
				950: "#3d1f23",
			},

			// Green - muted success
			green: {
				50: "#f4faf8",
				100: "#e8f3f0",
				200: "#cfe2dd",
				300: "#aacdc8",
				400: "#7fb0a4",
				500: "#68938a",
				600: "#537874",
				700: "#46605f",
				800: "#374a49",
				900: "#2c3c3b",
				950: "#1e2e2d",
			},
		},
		extend: {
			spacing: {},
			fontSize: {},
			fontFamily: {
				sans: ["Montserrat", "Inter", "system-ui", "sans-serif"],
				mono: ["JetBrains Mono", "SF Mono", "monospace"],
			},
		},
	},
	plugins: [],
};

export default config;
