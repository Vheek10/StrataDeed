/** @format */

"use client";

import * as React from "react";

/**
 * Legacy Web3Provider component.
 * For Sui blockchain interactions, use SuietProvider from @/providers/suiet-provider
 */
export function Web3Provider({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
