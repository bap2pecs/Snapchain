pragma solidity ^0.8.13;

import { ERC20, ERC20Permit } from "openzeppelin/token/ERC20/extensions/draft-ERC20Permit.sol";

contract Snap is ERC20Permit {
    address public owner;

    constructor(
        string memory name,
        string memory symbol
    ) ERC20(name, symbol)
      ERC20Permit(name) {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function mint(address to, uint256 amount) external onlyOwner
    {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner
    {
        _burn(from, amount);
    }
}