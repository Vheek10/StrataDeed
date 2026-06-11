/** @format */

"use client";

import { forwardRef } from "react";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";

const ConnectWalletButton = forwardRef<HTMLDivElement>((props, ref) => {
	const { account } = useWallet();

	return (
		<div
			className="sd-connect-button relative w-full"
			ref={ref}>
			{account ? (
				<>
					{/* Custom styled visual button that exactly matches our desired layout */}
					<div className="sd-wallet-btn sd-connected w-full pointer-events-none">
						<span className="sd-connected-dot mr-2"></span>
						<span className="sd-address">
							{`${account.address.slice(0, 4)}...${account.address.slice(-4)}`}
						</span>
					</div>
					{/* Invisible interactive layer to trigger Suiet modal */}
					<div className="absolute inset-0 z-10 opacity-0 overflow-hidden cursor-pointer *:w-full *:h-full">
						<ConnectButton />
					</div>
				</>
			) : (
				<ConnectButton>
					<span>Connect Wallet</span>
				</ConnectButton>
			)}
		</div>
	);
});

ConnectWalletButton.displayName = "ConnectWalletButton";

export default ConnectWalletButton;
