require("@nomicfoundation/hardhat-toolbox");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY || "";
const AGENT_PRIVATE_KEY = process.env.AGENT_PRIVATE_KEY || "";

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [OWNER_PRIVATE_KEY, AGENT_PRIVATE_KEY].filter(Boolean),
    },
  },
};

