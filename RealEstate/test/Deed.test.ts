import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Deed Contract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployFixture() {

    const [owner, otherAccount] = await ethers.getSigners();

    const Deed = await ethers.getContractFactory("Deed");
    const deed = await Deed.deploy();

    return { deed };
  }

  describe("Test 1", function () {
    it("Should do stuff with deed", async function () {
      const { deed } = await loadFixture(deployFixture);

    });

  });
});
