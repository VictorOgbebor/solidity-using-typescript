import {loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PersonWallet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function CRUDFixture()
  {
    const [owner, user, user2] = await ethers.getSigners();

    const Wallet = await ethers.getContractFactory("PersonWallet");
    const wallet = await Wallet.deploy(owner.address);

    return { owner, wallet, user, user2 }
  }

  describe("Test Single Payments", function () {
    it("Should call the owner", async function () {
        const { owner, wallet } = await loadFixture(CRUDFixture);
        
        const testOwner = await wallet.owner()
        expect (testOwner === owner.address)

    });


    it("Should able to deposit", async function () {
      // We don't use the fixture here because we want a different deployment
      const { owner, wallet } = await loadFixture(CRUDFixture);


      await wallet.deposit({ value: 5 })
      expect (await wallet.balanceOf()).to.equal(5)
    });

    it("Should be able to send funds => withdraw()", async function () {
      // We don't use the fixture here because we want a different deployment
      const { owner, wallet, user } = await loadFixture(CRUDFixture);
      await wallet.deposit({ value: 5 })
      expect(await wallet.balanceOf()).to.equal(5)
      await wallet.withdraw(user.address, 2)
      expect(await wallet.balanceOf()).to.equal(3)
    });

    it("Should Fail if not owner => withdraw()", async function () {
      // We don't use the fixture here because we want a different deployment
      const { owner, wallet, user } = await loadFixture(CRUDFixture);
      await wallet.deposit({ value: 5 })
      expect(await wallet.balanceOf()).to.equal(5)

      await expect(wallet.connect(user).withdraw(owner.address, 2)).to.be.revertedWith('NOT OWNER')
    });
  });

  describe("Test Split Payments", function () {
    it("Should call the owner", async function () {
        const { owner, wallet } = await loadFixture(CRUDFixture);
        
        const testOwner = await wallet.owner()
        expect (testOwner === owner.address)

    });

    it("Should be able to send funds => splitWithdraw()", async function () {
      // We don't use the fixture here because we want a different deployment
      const { owner, wallet, user, user2 } = await loadFixture(CRUDFixture);
      await wallet.deposit({ value: 5 })
      expect(await wallet.balanceOf()).to.equal(5)
      await wallet.splitWithdraw([user.address, user2.address], [2, 2])
      expect(await wallet.balanceOf()).to.equal(1)
    });

    it("Should Fail if not owner => splitWithdraw()", async function () {
      // We don't use the fixture here because we want a different deployment
      const { owner, wallet, user, user2 } = await loadFixture(CRUDFixture);
      await wallet.deposit({ value: 5 })
      expect(await wallet.balanceOf()).to.equal(5)

      await expect(wallet.connect(user).splitWithdraw([user.address, user2.address], [2, 2])).to.be.revertedWith('NOT OWNER')
    });
  });


});
