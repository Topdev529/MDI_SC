const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyBeaconProxy", function () {
    let myBeaconProxy;
    let beaconImpl;

    beforeEach(async function () {
        const BeaconImplementation = await ethers.getContractFactory("BeaconImplementation");
        beaconImpl = await BeaconImplementation.deploy();

        const UpgradeableBeacon = await ethers.getContractFactory("UpgradeableBeacon");
        const beacon = await UpgradeableBeacon.deploy(beaconImpl.address);

        const MyBeaconProxy = await ethers.getContractFactory("MyBeaconProxy");
        myBeaconProxy = await MyBeaconProxy.deploy(beacon.address);
    });

    it("should create a new contract using the createProxy function", async function () {
        const Greeter = await ethers.getContractFactory("Greeter");

        const data = Greeter.interface.encodeFunctionData("greet", []);

        await expect(myBeaconProxy.createProxy(data)).to.emit(beaconImpl, "Upgraded").withArgs(Greeter.address);
    });
});
