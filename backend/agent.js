require("dotenv").config();
const { ethers } = require("ethers");
const artifact = require("../artifacts/contracts/AgentWalletSimple.sol/AgentWalletSimple.json");

async function runAgent() {
  const RPC_URL = process.env.SEPOLIA_RPC_URL;
  const AGENT_PRIVATE_KEY = process.env.AGENT_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

  if (!RPC_URL || !AGENT_PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error("Missing RPC_URL, AGENT_PRIVATE_KEY, or CONTRACT_ADDRESS in .env");
  }

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(AGENT_PRIVATE_KEY, provider);

  console.log("Agent wallet address:", wallet.address);

  const contract = new ethers.Contract(CONTRACT_ADDRESS, artifact.abi, wallet);

  // Mock "opportunity" – in reality, this could be AI/ML logic, API calls, etc.
  const opportunity = {
    name: "SEO Report",
    cost: ethers.parseUnits("5", 18), // 5 MNEE
  };

  console.log("Agent: Found opportunity:", opportunity.name, "for cost:", opportunity.cost.toString());

  const metadata = ethers.toUtf8Bytes("SEO Report purchase");

  console.log("Agent: Calling payMerchant...");
  const tx = await contract.payMerchant(opportunity.cost, metadata);
  console.log("Sent tx:", tx.hash);
  await tx.wait();
  console.log("Agent: Payment confirmed.");
}

runAgent().catch(console.error);
