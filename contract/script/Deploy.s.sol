// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "forge-std/Script.sol";
import "../src/Snapchain.sol";
import "../src/Snap.sol";

contract Deploy is Script {
    Snapchain snapchain;
    Snap snap;

    function run() public {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        snap = new Snap("Snap", "SNAP");
        snapchain = new Snapchain(snap, 1e18);
        
        vm.stopBroadcast();
    }
}