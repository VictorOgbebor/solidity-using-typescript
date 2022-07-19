import { ethers } from "hardhat";

async function main() {
  const [owner, user] = await ethers.getSigners(); // convert to wallet

  const Wallet = await ethers.getContractFactory("PersonWallet");
  const wallet = await Wallet.deploy(owner.address);
  await wallet.deployed();
  console.log("PersonWallet is deployed to:", wallet.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
