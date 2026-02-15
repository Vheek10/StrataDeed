/** @format */

"use client";

import { useState } from "react";
import { useSuiWallet } from "@/providers/suiet-provider";
import { createSuiClient } from "@/lib/sui/client";
import { mintPropertyDeedOnSui } from "@/lib/sui/tokenization";

/**
 * Hook for minting Property Deed NFTs on Sui blockchain
 * Aligns with property_nft::mint_property_deed smart contract function
 */
export function useTokenization() {
	const { address, signAndExecuteTransaction } = useSuiWallet();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [txDigest, setTxDigest] = useState<string | undefined>();

	/**
	 * Mints a Property Deed NFT
	 * @param propertyId - Unique property identifier
	 * @param metadataURI - IPFS or base64 encoded metadata
	 * @param mintFee - Fee for minting (currently unused)
	 * @param privateCommitment - ZK commitment hash
	 * @param owner - Owner address (recipient)
	 */
	const tokenizeProperty = async (
		propertyId: string,
		metadataURI: string,
		mintFee: string,
		privateCommitment: string,
		owner: string,
	) => {
		setLoading(true);
		setError(null);

		try {
			if (!address) {
				throw new Error("Wallet not connected");
			}

			if (!signAndExecuteTransaction) {
				throw new Error("Wallet does not support transaction signing");
			}

			// Input validation
			if (!propertyId || propertyId.trim().length === 0) {
				throw new Error("Property ID cannot be empty");
			}
			if (!metadataURI || metadataURI.trim().length === 0) {
				throw new Error("Metadata URI cannot be empty");
			}
			if (!privateCommitment || privateCommitment.length === 0) {
				throw new Error("Private commitment is required for ZK proofs");
			}

			const client = createSuiClient();

			// Build transaction for minting Property Deed NFT
			const transaction = await mintPropertyDeedOnSui(client, address, {
				propertyId,
				metadataUri: metadataURI,
				privateCommitment,
				ownerAddress: owner,
			});

			// Sign and execute transaction using Suiet wallet
			const result = await signAndExecuteTransaction({
				transaction,
			});

			const digest = result.digest;
			setTxDigest(digest);

			return {
				success: true,
				hash: digest,
				message: "Sui transaction submitted successfully",
			};
		} catch (err: any) {
			let errorMessage = "Failed to tokenize property on Sui";

			if (err?.message?.includes("User rejected")) {
				errorMessage = "Transaction rejected by user";
			} else if (err?.message) {
				errorMessage = err.message;
			}

			setError(errorMessage);

			return {
				success: false,
				hash: undefined,
				message: errorMessage,
			};
		} finally {
			setLoading(false);
		}
	};

	return {
		tokenizeProperty,
		loading,
		error,
		txHash: txDigest,
		receipt: undefined,
		isSuccess: !!txDigest,
		eventData: null,
	};
}
