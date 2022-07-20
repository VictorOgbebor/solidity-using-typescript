import { ethers } from "hardhat";

async function main() {

  const [owner, user1, user2, user3 ] = await ethers.getSigners();

  const CRUD = await ethers.getContractFactory("CRUD");
  const crud = await CRUD.deploy();

  await crud.deployed();

  console.log(`Crud Contract:, ${crud.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
