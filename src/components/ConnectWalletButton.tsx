/** @format */
"use client";

import { ConnectButton } from "@suiet/wallet-kit";
import "./connect-wallet.css";

export default function ConnectWalletButton() {
	return (
		<div className="connect-wallet-wrapper">
			<ConnectButton />
		</div>
	);
}
