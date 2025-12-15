import { useDeployContract, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { STRATA_DEED_ABI, STRATA_DEED_BYTECODE } from "@/config/contracts";
import { useState } from "react";

export function useStrataDeed() {
    const { deployContractAsync } = useDeployContract();
    const { writeContractAsync } = useWriteContract();
    
    // State for tracking deployment
    const [isDeploying, setIsDeploying] = useState(false);
    const [deployedAddress, setDeployedAddress] = useState<`0x${string}` | null>(null);

    // Deploy a new StrataDeedRWA contract
    const deployStrataDeed = async (fundingCap: string, ownerAddress: string) => {
        setIsDeploying(true);
        try {
            console.log("Deploying StrataDeedRWA...", { fundingCap, ownerAddress });
            
            const hash = await deployContractAsync({
                abi: STRATA_DEED_ABI,
                bytecode: STRATA_DEED_BYTECODE,
                args: [parseEther(fundingCap), ownerAddress],
            });

            console.log("Deployment transaction hash:", hash);
            return hash;
        } catch (error) {
            console.error("Deployment failed:", error);
            throw error;
        } finally {
            setIsDeploying(false);
        }
    };

    // Helper to interact with a specific address
    const useStrataContract = (contractAddress: `0x${string}`) => {
        const depositEscrow = async (amount: string) => {
             return writeContractAsync({
                address: contractAddress,
                abi: STRATA_DEED_ABI,
                functionName: "depositEscrow",
                value: parseEther(amount),
            });
        };

        return { depositEscrow };
    };

    return {
        deployStrataDeed,
        useStrataContract,
        isDeploying,
        deployedAddress // logic to capture this from receipt would be needed in component or here using useWaitForTransactionReceipt
    };
}
