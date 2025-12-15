import StrataDeedArtifact from "../contracts/artifacts/contracts/StrataDeedRWA.sol/StrataDeedRWA.json";

export const STRATA_DEED_ABI = StrataDeedArtifact.abi;
export const STRATA_DEED_BYTECODE = StrataDeedArtifact.bytecode as `0x${string}`;

// Default to the most recently deployed address or empty if none
export const STRATA_DEED_ADDRESS = (process.env.NEXT_PUBLIC_STRATA_DEED_ADDRESS as `0x${string}`) || "0x0000000000000000000000000000000000000000";

export const STRATA_DEED_CONFIG = {
  address: STRATA_DEED_ADDRESS,
  abi: STRATA_DEED_ABI,
  bytecode: STRATA_DEED_BYTECODE,
} as const;
