/** @format */

import { Transaction } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import {
	PROPERTY_NFT_PACKAGE_ID,
	PROPERTY_RWA_PACKAGE_ID,
	MODULES,
} from "@/config/contracts";

export interface SuiMintPropertyDeedInput {
	propertyId: string;
	metadataUri: string;
	privateCommitment: string;
	ownerAddress: string;
}

export interface SuiMintRWATokenInput {
	propertyId: string;
	tokens: number;
	ownerAddress: string;
}

/**
 * Mints a Property Deed NFT on Sui blockchain
 * Calls: property_nft::mint_property_deed
 */
export async function mintPropertyDeedOnSui(
	client: SuiClient,
	walletAddress: string,
	{
		propertyId,
		metadataUri,
		privateCommitment,
		ownerAddress,
	}: SuiMintPropertyDeedInput,
) {
	if (!PROPERTY_NFT_PACKAGE_ID) {
		throw new Error(
			"PROPERTY_NFT_PACKAGE_ID not configured. Deploy contracts first.",
		);
	}

	const tx = new Transaction();

	// Convert private commitment string to vector<u8>
	const commitmentBytes = Array.from(
		new TextEncoder().encode(privateCommitment),
	);

	// Call: public fun mint_property_deed(
	//   property_id: String,
	//   metadata_uri: String,
	//   private_commitment: vector<u8>,
	//   to: address,
	//   ctx: &mut TxContext
	// ): PropertyDeed
	tx.moveCall({
		target: `${PROPERTY_NFT_PACKAGE_ID}::${MODULES.PROPERTY_NFT}::mint_property_deed`,
		arguments: [
			tx.pure.string(propertyId),
			tx.pure.string(metadataUri),
			tx.pure.vector("u8", commitmentBytes),
			tx.pure.address(ownerAddress),
		],
	});

	tx.setSender(walletAddress);

	return tx;
}

/**
 * Mints RWA tokens for fractional ownership
 * Calls: property_rwa::mint_rwa_token
 */
export async function mintRWATokenOnSui(
	client: SuiClient,
	walletAddress: string,
	{ propertyId, tokens, ownerAddress }: SuiMintRWATokenInput,
) {
	if (!PROPERTY_RWA_PACKAGE_ID) {
		throw new Error(
			"PROPERTY_RWA_PACKAGE_ID not configured. Deploy contracts first.",
		);
	}

	const tx = new Transaction();

	// Call: public fun mint_rwa_token(
	//   property_id: String,
	//   tokens: u64,
	//   to: address,
	//   ctx: &mut TxContext
	// ): RWAToken
	tx.moveCall({
		target: `${PROPERTY_RWA_PACKAGE_ID}::${MODULES.PROPERTY_RWA}::mint_rwa_token`,
		arguments: [
			tx.pure.string(propertyId),
			tx.pure.u64(tokens),
			tx.pure.address(ownerAddress),
		],
	});

	tx.setSender(walletAddress);

	return tx;
}

/**
 * Creates a new RWA Treasury for escrow management
 * Calls: property_rwa::create_treasury
 */
export async function createTreasuryOnSui(
	client: SuiClient,
	walletAddress: string,
	fundingCap: number,
) {
	if (!PROPERTY_RWA_PACKAGE_ID) {
		throw new Error(
			"PROPERTY_RWA_PACKAGE_ID not configured. Deploy contracts first.",
		);
	}

	const tx = new Transaction();

	// Call: public fun create_treasury(
	//   funding_cap: u64,
	//   ctx: &mut TxContext
	// ): (RWATreasury, TreasuryAdminCap)
	tx.moveCall({
		target: `${PROPERTY_RWA_PACKAGE_ID}::${MODULES.PROPERTY_RWA}::create_treasury`,
		arguments: [tx.pure.u64(fundingCap)],
	});

	tx.setSender(walletAddress);

	return tx;
}
