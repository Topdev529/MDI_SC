//SPDX-License-Identifier:MIT

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

import "./MDIBeacon.sol";
import "./MDIStakingRewards.sol";

pragma solidity ^0.8.10;

contract MDIIFactory is BeaconProxy {
    MDIBeacon immutable beacon;
    mapping(uint32=>address) internal arrMDIs;
    constructor(address impl){
        beacon = new MDIBeacon(impl);
    }
    function buildMDI(string calldata _name,address stakingToken,address _rewardToken) external returns(address){
        BeaconProxy proxy = new BeaconProxy(address(beacon),
        abi.encodeWithSelector(MDIStakingRewards(address(0)).initialize.selector,_name,_rewardToken));
        
        arrMDIs[stakingToken] = address(proxy);
        return address(proxy);
    }
    function getMDIAddress(uint32 nMDIId) external view returns(address){
        return arrMDIs[nMDIId];
    }
    function getBeacon() public view returns(address){
        return address(beacon);
    }
    function getImplementation() public view returns(address){
        return beacon.implementation();
    }
}