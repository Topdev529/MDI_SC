const { ethers, upgrades } = require("hardhat");

async function main() {
  const MDI = await ethers.getContractFactory("MDI");
  const mdi = await MDI.deploy();
  console.log("MDI Implementation Contract deployed on : ", mdi.address);

  const MDIBeacon = await ethers.getContractFactory("MDIBeacon");

  const mdibeacon = await upgrades.deployBeacon(MDIBeacon, mdi.address);
  await mdibeacon.deployed();
  console.log(
    "MDIBeacon ( Upgradeable Beacon Contrat ) deployed on : ",
    mdibeacon.address
  );

  const MDIFactory = await upgrades.deployBeaconProxy(mdibeacon, MDIBeacon, [
    Cruze,
    4,
  ]);
  await MDIFactory.deployed();
  console.log(
    "MDIFactory ( Beacon Proxy ) deployed on : ",
    MDIFactory.address
  );
}

main();
