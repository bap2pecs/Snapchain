// SPDX-License-Indentifier
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "../src/utils/SigUtils.sol";
import "../src/Snapchain.sol";
import "../src/Snap.sol";

contract SnapchainTest is Test {
    Snapchain snapchain;
    Snap snap;
    SigUtils sigUtils;

    uint256 user1Pk = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80; // Fake account for testing only.
    address user1 = vm.addr(user1Pk);
    uint256 ownerPk = 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;
    address owner = vm.addr(ownerPk);

    function setUp() public {
        vm.startPrank(owner);
        snap = new Snap("Snap", "SNAP");
        snapchain = new Snapchain(snap, 2);
        sigUtils = new SigUtils(snap.DOMAIN_SEPARATOR());
        vm.stopPrank();
    }

    function testSetSecondPrice(uint256 secondPrice) public {
        vm.prank(user1);
        vm.expectRevert("Not owner");
        snapchain.setSecondPrice(secondPrice);
        
        vm.prank(owner);
        snapchain.setSecondPrice(secondPrice);
        assertEq(snapchain.secondPrice(), secondPrice);
    }

    function testChangeOwner() public {
        vm.prank(user1);
        vm.expectRevert("Not owner");
        snapchain.changeOwner(user1);
        
        vm.prank(owner);
        snapchain.changeOwner(user1);
        assertEq(snapchain.owner(), user1);
    }

    function testDistrubuteReward(uint256 amount) public {
        vm.prank(user1);
        vm.expectRevert("Not owner");
        snapchain.distributeReward();

        vm.prank(owner);
        snap.mint(address(snapchain), amount);
        
        vm.prank(address(snapchain));
        snap.approve(address(snapchain), amount);
        
        vm.prank(owner);
        snapchain.distributeReward();
        assertEq(snap.balanceOf(owner), amount);
    }

    function testDeposit() public {
        vm.prank(owner);
        snap.mint(user1, 10000);
        
        SigUtils.Permit memory permit = SigUtils.Permit({
            owner: user1,
            spender: address(snapchain),
            value: 1000,
            nonce: snap.nonces(user1),
            deadline: block.timestamp
        });

        bytes32 digest = sigUtils.getTypedDataHash(permit);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(user1Pk, digest);

        vm.startPrank(user1);
        snapchain.deposit(500, v, r, s); // Deposit 500 seconds for 1000 SNAP tokens.
        assertEq(snap.balanceOf(address(snapchain)), 1000);
        assertEq(snap.balanceOf(user1), 9000);
    }

    function testDestroy() public {
        vm.prank(owner);
        snap.mint(user1, 10000);
        
        SigUtils.Permit memory permit = SigUtils.Permit({
            owner: user1,
            spender: address(snapchain),
            value: 1000,
            nonce: snap.nonces(user1),
            deadline: block.timestamp
        });

        bytes32 digest = sigUtils.getTypedDataHash(permit);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(user1Pk, digest);

        vm.startPrank(user1);
        snapchain.deposit(500, v, r, s); // Deposit 500 seconds for 1000 SNAP tokens.
        assertEq(snap.balanceOf(address(snapchain)), 1000);
        assertEq(snap.balanceOf(user1), 9000);

        vm.warp(100); // Block is now 100
        snapchain.destroy(0);
        assertEq(snap.balanceOf(user1), 9000 + 802); // 1000 - ((100 - 1) * 2) = 802 -- e.g depositedAmount - ((block.timestamp - depositTime) * secondPrice)
        assertEq(snap.balanceOf(address(snapchain)), 1000 - 802);
    }
}