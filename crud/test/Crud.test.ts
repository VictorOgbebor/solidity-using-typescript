import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CRUD", function ()
{
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function CRUDFixture()
  {

    // Contracts are deployed using the first signer/account by default
    const [owner, user1, user2, user3] = await ethers.getSigners();

    const CRUD = await ethers.getContractFactory("CRUD");
    const crud = await CRUD.deploy();

    console.log(`Crud Contract:, ${ crud.address }`);

    return { crud, owner, user1, user2, user3 };
  }

  describe("Testing CRUD Contract", function ()
  {

    it("Should Create & Read User", async () =>
    {
      const { crud, owner, user1, user2, user3 } = await loadFixture(CRUDFixture)

      await crud.CreateUser("Parky")
      let users = await crud.ReadUser(1)

      await expect(users[0]).to.equal(1)
      await expect(users[1]).to.equal("Parky")

    })

    it("Should Update User", async () =>
    {
      const { crud, owner, user1, user2, user3 } = await loadFixture(CRUDFixture)

      await crud.CreateUser("Parky")
      let users = await crud.ReadUser(1)
      await expect(users[0]).to.equal(1)
      await expect(users[1]).to.equal("Parky")


      await crud.UpdateUser(1, "OG")
      let usersNew = await crud.ReadUser(1)
      await expect(usersNew[0]).to.equal(1)
      await expect(usersNew[1]).to.equal("OG")
    })

    it("Should revert w/ USER_DOES_NOT_EXIST()", async () =>
    {
      const { crud, owner, user1, user2, user3 } = await loadFixture(CRUDFixture)

      await crud.CreateUser("Parky")
      let users = await crud.ReadUser(1)
      await expect(users[0]).to.equal(1)
      await expect(users[1]).to.equal("Parky")

      await expect(crud.UpdateUser(2, "OG")).to.rejectedWith("USER_DOES_NOT_EXIST()")
    })

    it("Should delete user", async () =>
    {
      const { crud, owner, user1, user2, user3 } = await loadFixture(CRUDFixture)

      await crud.CreateUser("Parky")
      let users = await crud.ReadUser(1)
      await expect(users[0]).to.equal(1)
      await expect(users[1]).to.equal("Parky")


      await crud.UpdateUser(1, "OG")
      let usersNew = await crud.ReadUser(1)
      await expect(usersNew[0]).to.equal(1)
      await expect(usersNew[1]).to.equal("OG")


      await crud.DeleteUser(1)
      await expect(crud.ReadUser(1)).to.rejectedWith("USER_DOES_NOT_EXIST()")
    })

    it("Should revert w/ USER_DOES_NOT_EXIST() for non-exisent user", async () =>
    {
      const { crud } = await loadFixture(CRUDFixture)
      await expect(crud.DeleteUser(0)).to.rejectedWith("USER_DOES_NOT_EXIST()")
    })

  });


});
