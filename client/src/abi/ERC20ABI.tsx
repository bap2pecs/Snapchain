export const SNAPCHAINABI = [
  // Public functions
  "function deposit(uint256 _ttl_in_sec) public",
  "function destroy(uint256 index) public",

  // Privillage Functions
  "function distributeReward() public onlyOwner",
  "function changeOwner(address _newOwner) public onlyOwner",
  "function setSecondPrice(uint256 _secondPrice) public onlyOwner",

  // Signed
  //   " function splitSignature(bytes memory sig) public pure returns (bytes32 r, bytes32 s, uint8 v)",
];
