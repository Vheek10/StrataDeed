import hre from "hardhat";

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance));

  const fundingCap = hre.ethers.parseUnits("5000", 18); 
  
  const StrataDeedRWA = await hre.ethers.getContractFactory("StrataDeedRWA");
  const strataDeed = await StrataDeedRWA.deploy(fundingCap, deployer.address);

  await strataDeed.waitForDeployment();
  const strataAddress = await strataDeed.getAddress();

  console.log(`StrataDeedRWA deployed to: ${strataAddress}`);
  console.log(`- Note: Accepts NATIVE MNT for Escrow and Yield.`);

  const dummyHash = hre.ethers.keccak256(hre.ethers.toUtf8Bytes("DEPLOYER_CREDENTIAL"));
  
  const tx = await strataDeed.registerCredential(deployer.address, dummyHash);
  await tx.wait();
  
  console.log(`Registered Identity for Deployer. Hash: ${dummyHash}`);

  const isCompliant = await strataDeed.isCompliant(deployer.address);
  console.log(`Deployer Compliance Check: ${isCompliant}`);

  console.log("\nDeployment script finished.");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
