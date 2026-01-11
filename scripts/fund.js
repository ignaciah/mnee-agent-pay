const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
  const MNEE_ADDRESS = "0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF";

  if (!CONTRACT_ADDRESS) {
    throw new Error("Set CONTRACT_ADDRESS in .env");
  }

  const [owner] = await hre.ethers.getSigners();
  console.log("Funding from owner:", owner.address);

  const mnee = await hre.ethers.getContractAt("IERC20", MNEE_ADDRESS);
  const agentWallet = await hre.ethers.getContractAt("AgentWalletSimple", CONTRACT_ADDRESS);

  const amount = hre.ethers.parseUnits("50", 18); // 50 MNEE

  console.log("Approving contract to spend MNEE...");
  const tx1 = await mnee.approve(CONTRACT_ADDRESS, amount);
  await tx1.wait();
  console.log("Approved.");

  console.log("Calling fund()...");
  const tx2 = await agentWallet.fund(amount);
  await tx2.wait();
  console.log("Funded contract with 50 MNEE.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
