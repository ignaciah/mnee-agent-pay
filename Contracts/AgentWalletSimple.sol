solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title AgentWalletSimple for MNEE
/// @notice Minimal programmable MNEE wallet for a single owner/agent/merchant flow.
interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract AgentWalletSimple {
    IERC20 public immutable MNEE;

    address public owner;
    address public agent;
    address public merchant;

    uint256 public budgetRemaining;
    uint256 public maxPerTx;

    event PolicyConfigured(
        address indexed owner,
        address indexed agent,
        address indexed merchant,
        uint256 budget,
        uint256 maxPerTx
    );

    event Funded(address indexed owner, uint256 amount, uint256 newBudget);

    event MerchantPaid(
        address indexed agent,
        address indexed merchant,
        uint256 amount,
        bytes metadata
    );

    constructor(address mneeTokenAddress, address _owner) {
        require(mneeTokenAddress != address(0), "MNEE address required");
        require(_owner != address(0), "Owner required");
        MNEE = IERC20(mneeTokenAddress);
        owner = _owner;
    }

    /// @notice Configure or update the policy (owner only).
    function configurePolicy(
        address _agent,
        address _merchant,
        uint256 _budget,
        uint256 _maxPerTx
    ) external {
        require(msg.sender == owner, "Only owner");
        require(_agent != address(0), "Invalid agent");
        require(_merchant != address(0), "Invalid merchant");

        agent = _agent;
        merchant = _merchant;
        budgetRemaining = _budget;
        maxPerTx = _maxPerTx;

        emit PolicyConfigured(owner, agent, merchant, _budget, _maxPerTx);
    }

    /// @notice Fund the wallet with MNEE (owner only).
    /// @dev Owner must call MNEE.approve(this, amount) first.
    function fund(uint256 amount) external {
        require(msg.sender == owner, "Only owner");
        require(amount > 0, "Amount = 0");

        bool ok = MNEE.transferFrom(msg.sender, address(this), amount);
        require(ok, "MNEE transfer failed");

        budgetRemaining += amount;
        emit Funded(owner, amount, budgetRemaining);
    }

    /// @notice Agent pays the merchant from the contract in MNEE within budget.
    function payMerchant(uint256 amount, bytes calldata metadata) external {
        require(msg.sender == agent, "Only agent");
        require(merchant != address(0), "Merchant not set");
        require(amount > 0, "Amount = 0");
        require(amount <= maxPerTx, "Exceeds maxPerTx");
        require(amount <= budgetRemaining, "Exceeds budget");

        budgetRemaining -= amount;

        bool ok = MNEE.transfer(merchant, amount);
        require(ok, "MNEE transfer failed");

        emit MerchantPaid(agent, merchant, amount, metadata);
    }
}


