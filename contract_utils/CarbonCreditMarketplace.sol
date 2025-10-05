// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Interface for VeBetterDAO Rewards Pool (same as in Learn2Earn)
interface IX2EarnRewardsPool {
    function distributeReward(
        bytes32 appId,
        uint256 amount,
        address receiver,
        string memory proof
    ) external;
    
    function availableFunds(bytes32 appId) external view returns (uint256);
}

contract CarbonCreditMarketplace {

    address public regulator; // Authority or verifier (e.g., government, NGO)
    IX2EarnRewardsPool public rewardsPool;
    bytes32 public appId;

    uint256 public creditUnitPrice = 1 ether; // Example: 1 VET per credit

    struct Participant {
        string name;
        bool registered;
        uint256 totalCredits;
    }

    mapping(address => Participant) public participants;

    // Carbon credit token balance
    mapping(address => uint256) public balances;

    // Record of carbon-reducing activity
    struct Activity {
        string description;
        uint256 reduction; // In kg CO2
        bool verified;
        bool credited;
    }

    mapping(address => Activity[]) public activities;

    event Registered(address indexed user, string name);
    event ActivitySubmitted(address indexed user, string description);
    event ActivityVerified(address indexed user, uint256 reduction, uint256 credits);
    event CreditsPurchased(address indexed buyer, uint256 amount);
    event CreditsTraded(address indexed from, address indexed to, uint256 amount);
    event CreditsRetired(address indexed user, uint256 amount);
    event RewardDistributed(address indexed user, uint256 amount);

    constructor(address _rewardsPool, bytes32 _appId) {
        regulator = msg.sender;
        rewardsPool = IX2EarnRewardsPool(_rewardsPool);
        appId = _appId;
    }

    modifier onlyRegulator() {
        require(msg.sender == regulator, "Only regulator can call this");
        _;
    }

    // Step 1: Register
    function register(string memory _name) external {
        require(!participants[msg.sender].registered, "Already registered");
        participants[msg.sender] = Participant({
            name: _name,
            registered: true,
            totalCredits: 0
        });
        emit Registered(msg.sender, _name);
    }

    // Step 2: Submit a carbon-reduction activity
    function submitActivity(string memory description, uint256 reduction) external {
        require(participants[msg.sender].registered, "Not registered");
        require(reduction > 0, "Reduction must be positive");
        activities[msg.sender].push(Activity(description, reduction, false, false));
        emit ActivitySubmitted(msg.sender, description);
    }

    // Step 3: Regulator or AI-verifier marks activity as verified
    function verifyActivity(address user, uint256 index) external onlyRegulator {
        Activity storage act = activities[user][index];
        require(!act.verified, "Already verified");
        act.verified = true;

        uint256 credits = act.reduction / 100; // Example: 1 credit per 100 kg CO2 reduced
        act.credited = true;

        participants[user].totalCredits += credits;
        balances[user] += credits;

        emit ActivityVerified(user, act.reduction, credits);
    }

    // Step 4: Trade credits between users
    function tradeCredits(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient credits");
        require(participants[to].registered, "Receiver not registered");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit CreditsTraded(msg.sender, to, amount);
    }

    // Step 5: Retire credits (for claiming carbon neutrality)
    function retireCredits(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough credits");
        balances[msg.sender] -= amount;
        participants[msg.sender].totalCredits -= amount;

        emit CreditsRetired(msg.sender, amount);
    }

    // Step 6: Reward participants for verified contributions
    function distributeReward(address user) external onlyRegulator {
        uint256 rewardAmount = participants[user].totalCredits * 1e18; // 1 B3TR per credit
        require(
            rewardAmount <= rewardsPool.availableFunds(appId),
            "Insufficient pool funds"
        );

        string memory proof = string(abi.encodePacked(
            '{"type":"carbon_credit","participant":"',
            participants[user].name,
            '"}'
        ));

        rewardsPool.distributeReward(appId, rewardAmount, user, proof);
        emit RewardDistributed(user, rewardAmount);
    }

    // Utility
    function getActivities(address user) external view returns (Activity[] memory) {
        return activities[user];
    }

    function updateAppId(bytes32 _appId) external onlyRegulator {
        appId = _appId;
    }

    function setCreditPrice(uint256 _price) external onlyRegulator {
        creditUnitPrice = _price;
    }
}

