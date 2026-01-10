MNEE Agent Pay: A Demonstration of AI-Driven Programmable MoneyUsing the MNEE Stablecoin on Ethereum for Autonomous Payments

MNEE Agent Pay is a focused, end-to-end prototype showcasing how programmable money enables automated digital commerce. This project uses MNEE, the USD-backed stablecoin on Ethereum, to create a secure payment system where an AI agent can spend funds according to predefined, on-chain rules.

The core scenario is simple and enforced entirely by a smart contract:
A Human Owner defines spending policies and budgets on the blockchain.
An AI Agent is authorized to make payments in MNEE within those constraints.
A Merchant receives instant, automatic payment for digital services.
No trust is required; the rules are immutable and transparent.🌟 Key Innovations Demonstrated
Feature
Description
Programmable Money
The owner sets rules for the budget, maximum transaction amount, and authorized merchant. These rules are stored on-chain and cannot be bypassed by the agent or any external party.
AI-Driven Commerce
A lightweight AI agent script decides to purchase a digital service based on a perceived opportunity, then triggers a payment by calling the smart contract.
MNEE Integration
All transactions utilize the official MNEE stablecoin, deployed at the address: 0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF.

 Architecture Flow

This system involves four key components:
Owner: Defines the spending policy and initially funds the smart contract's MNEE wallet.
Smart Contract (AgentWalletSimple.sol): The core logic. It enforces the spending rules (budget, max per transaction, allowed merchant) and holds the MNEE funds.
Agent (Autonomous Script): Reads a market opportunity, decides to purchase, and executes the payMerchant() function on the contract.
Merchant: Receives MNEE instantly upon a successful transaction initiated by the agent.
The entire process is Simple, Transparent, and Fully On-Chain.📝 Smart Contract Details

Location: contracts/AgentWalletSimple.sol

This contract is the core guarantor of the system. It:
Stores and enforces the owner's policy.
Holds the MNEE balance.
Restricts spending authority only to the designated agent.
Ensures compliance with all budget and transaction limits.
Key Functions:
configurePolicy(agent, merchant, budget, maxPerTx): Sets the spending rules.
fund(amount): Allows the owner to deposit MNEE into the contract.
payMerchant(amount, metadata): The function called by the agent to make a payment.
 AI Agent Implementation

Location: backend/agent.js

The agent script simulates autonomous decision-making:
It processes a mock opportunity (e.g., "SEO Report - cost 5 MNEE").
It makes the decision to proceed with the purchase.
It calls the contract's payMerchant() function, transferring MNEE to the merchant.
This script delivers a clear demonstration of autonomous digital commerce powered by stablecoins.🚀 Project Setup and Execution

The core functionality can be demonstrated with the contract and agent script, though an optional, minimal frontend can be used to display the policy and remaining budget.Getting Started
Install: npm install
Compile: npx hardhat compile
Deployment and Configuration
Deploy: Update scripts/deploy.js with the owner's address, then run:
npx hardhat run scripts/deploy.js --network sepolia
(Record the deployed contract address.)
Configure: Call the configurePolicy() function using the Hardhat console or a custom script to set the agent, merchant, budget, and max spend limits.
Fund: The owner must first Approve the contract to spend MNEE, then call fund(amount) to deposit MNEE into the contract wallet.
Run the Agent
Set Environment Variables:
RPC_URL=
AGENT_PRIVATE_KEY=
CONTRACT_ADDRESS=
Execute: node backend/agent.js
The agent will execute its logic, autonomously paying the merchant in MNEE according to the on-chain rules.🎯 Impact Statement

This project provides a clear, minimal proof of concept that demonstrates the power of MNEE and programmable money to unlock:
Autonomous, AI-driven payment systems.
Safe delegation of financial authority using smart contracts.
New, trustless models for digital commerce.
On-chain enforcement of all financial rules and policies.
It is a crisp, clear demonstration of how stablecoins like MNEE are essential for powering the next generation of automated finance.
