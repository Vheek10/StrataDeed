/** @format */

"use client";

import { useState } from "react";
import { ConnectModal, useWallet } from "@suiet/wallet-kit";

function ConnectWalletButton() {
	const { account, disconnect } = useWallet();
	const [modalOpen, setModalOpen] = useState(false);

	if (account) {
		return (
			<button
				type="button"
				className="sd-wallet-btn sd-connected w-full"
				onClick={() => disconnect()}
				title="Click to disconnect wallet">
				<span className="sd-connected-dot mr-2"></span>
				<span className="sd-address">
					{`${account.address.slice(0, 4)}...${account.address.slice(-4)}`}
				</span>
			</button>
		);
	}

	return (
		<>
			<button
				type="button"
				className="sd-wallet-btn sd-disconnected w-full"
				onClick={() => setModalOpen(true)}>
				Connect Wallet
			</button>
			<ConnectModal
				open={modalOpen}
				onOpenChange={setModalOpen}
			/>
		</>
	);
}

ConnectWalletButton.displayName = "ConnectWalletButton";

export default ConnectWalletButton;
