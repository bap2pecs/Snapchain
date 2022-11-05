pragma solidity ^0.8.13;

import "../src/Snap.sol";

struct ChainData {
    uint256 secondPrice;
    uint256 depositValue;
    uint256 ttl;
    uint256 timeDeposited;
    bool isActive;
}

error NotEnoughSnapTokens(uint256 amount);
error UnownedChain(address user, uint256 chainId);
error ChainAlreadyInactive(address user, uint256 chainId);

contract Snapchain {
    Snap public snap;
    address public owner;
    uint256 public secondPrice;

    mapping(address => ChainData[]) public chains;

    event ChainCreated(address indexed user, uint256 indexed depositValue, uint256 ttl, uint256 timeDeposited, uint256 indexed chainIndex);
    event ChainDestroyed(address indexed user, uint256 indexed index);
    event RewardsDistributed(uint256 indexed rewardAmount);
    event OwnerChanged(address indexed newOwner);
    event SecondPriceChanged(uint256 indexed newSecondPrice);

    constructor(
        Snap _snap, 
        uint256 _secondPrice
    ) {
        snap = _snap;
        secondPrice = _secondPrice;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function deposit(uint256 _ttl_in_sec, uint8 v, bytes32 r, bytes32 s) public {
        uint256 price = _ttl_in_sec * secondPrice;
        if (snap.balanceOf(msg.sender) < price) revert NotEnoughSnapTokens(price);
        
        ChainData memory newChainData = ChainData({
            secondPrice: secondPrice,
            depositValue: price,
            ttl: _ttl_in_sec,
            timeDeposited: block.timestamp,
            isActive: true
        });

        chains[msg.sender].push(newChainData);
                
        snap.permit(msg.sender, address(this), price, block.timestamp, v, r, s);
        snap.transferFrom(msg.sender, address(this), price);

        emit ChainCreated(msg.sender, price, _ttl_in_sec, block.timestamp, chains[msg.sender].length);
    }

    function destroy(uint256 index) public {
        ChainData storage chain = chains[msg.sender][index];
        
        if (chain.isActive == false) revert ChainAlreadyInactive(msg.sender, index);
        chain.isActive = false;

        uint256 refundedSnap = (chain.depositValue - ((block.timestamp - chain.timeDeposited) * chain.secondPrice));
        snap.approve(address(this), refundedSnap);
        snap.transferFrom(address(this), msg.sender, refundedSnap);

        emit ChainDestroyed(msg.sender, index);
    }

    // PRIVILEGED FUNCTIONS

    function distributeReward() public onlyOwner {
        snap.transferFrom(address(this), owner, snap.balanceOf(address(this)));

        emit RewardsDistributed(snap.balanceOf(address(this)));
    } 

    function changeOwner(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "Not valid address");
        owner = _newOwner;

        emit OwnerChanged(_newOwner);
    }

    function setSecondPrice(uint256 _secondPrice) public onlyOwner {
        secondPrice = _secondPrice;

        emit SecondPriceChanged(_secondPrice);
    }
}