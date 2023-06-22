// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

contract MyBeaconProxy {
    address private immutable _beacon;
 
    constructor(address beacon) {
        _beacon = beacon;
    }

    function createProxy(bytes memory data) external returns (address) {
        return address(new BeaconProxy(_beacon, data));
    }
}