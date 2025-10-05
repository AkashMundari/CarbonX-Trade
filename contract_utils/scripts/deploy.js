import hre from "hardhat";

async function main() {
  console.log("Starting deployment to VeChain testnet...");

  // VeBetterDAO testnet contract addresses
  const X2EARN_REWARDS_POOL = "0x5F8f86B8D0Fa93cdaE20936d150175dF0205fB38";

  // You'll need to register your app on VeBetterDAO testnet first to get an APP_ID
  // For now, using a placeholder - replace with your actual APP_ID
  const APP_ID = "0xba9dd8321fe5b6e4ae83a39480ff4e5fdf3168f1ddd5e6727563274b60f6fa6d";

  // Institute name for the CarbonCreditMarketplace platform
  const INSTITUTE_NAME = "CarbonX-Trade";

  // Get the contract factory
  const CarbonCreditMarketplace = await hre.ethers.getContractFactory("CarbonCreditMarketplace");

  console.log("Deploying CarbonCreditMarketplace contract...");
  console.log("Parameters:");
  console.log("  X2EarnRewardsPool:", X2EARN_REWARDS_POOL);
  console.log("  App ID:", APP_ID);

  // Deploy the contract with specific gas settings
  const learn2Earn = await CarbonCreditMarketplace.deploy(
    X2EARN_REWARDS_POOL,
    APP_ID,
    {
      gasLimit: 3000000  // Set a reasonable gas limit
    }
  );

  // Wait for deployment
  await learn2Earn.waitForDeployment();

  const contractAddress = await learn2Earn.getAddress();
  console.log("\n✅ CarbonCreditMarketplace contract deployed successfully!");
  console.log("Contract address:", contractAddress);

  // Get deployment transaction details
  const deploymentTx = learn2Earn.deploymentTransaction();
  if (deploymentTx) {
    console.log("Deployment transaction hash:", deploymentTx.hash);
    console.log("\nView on VeChain Explorer:");
    console.log(`https://explore-testnet.vechain.org/transactions/${deploymentTx.hash}`);
  }

  // Verify initial contract state
  console.log("\nVerifying contract state...");
  const appId = await learn2Earn.appId();
  const rewardAmount = await learn2Earn.creditUnitPrice();

  console.log("  App ID:", appId);
  console.log("  Reward amount:", hre.ethers.formatEther(rewardAmount), "B3TR");

  // Save deployment info
  const deploymentInfo = {
    network: "vechain_testnet",
    contractAddress: contractAddress,
    deploymentTime: new Date().toISOString(),
    constructor: {
      x2EarnRewardsPool: X2EARN_REWARDS_POOL,
      appId: APP_ID
    },
    initialState: {
      appId: appId,
      rewardAmount: rewardAmount.toString()
    }
  };

  const fs = await import("fs");
  fs.writeFileSync(
    "deployment-info.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\n📝 Deployment info saved to deployment-info.json");

  console.log("\n🎉 Deployment complete!");
  console.log("\nNext steps:");
  console.log("1. Register your app on VeBetterDAO testnet if not done already");
  console.log("2. Update the APP_ID in your contract if needed");
  console.log("3. Add the contract as a Reward Distributor in VeBetterDAO");
  console.log("4. Update the contract address in your frontend .env file");
  console.log("5. Fund the contract with B3TR tokens for rewards");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });

