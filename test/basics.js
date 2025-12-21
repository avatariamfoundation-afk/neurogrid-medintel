const { expect } = require("chai");

describe("MedIntel Contracts", function () {
  it("Should deploy successfully", async function () {
    const MedIntel = await ethers.getContractFactory("MedIntel");
    const medIntel = await MedIntel.deploy();
    await medIntel.deployed();
    expect(medIntel.address).to.not.be.null;
  });
});
