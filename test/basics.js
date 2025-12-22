const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedIntel Contracts", function () {
  let medIntel, owner;

  beforeEach(async function () {
    const MedIntel = await ethers.getContractFactory("MedIntel");
    medIntel = await MedIntel.deploy();
    await medIntel.deployed();
    [owner] = await ethers.getSigners();
  });

  it("Should deploy successfully", async function () {
    expect(medIntel.address).to.not.be.null;
  });

  it("Should handle basic data storage", async function () {
    await medIntel.storeData("test data");
    const data = await medIntel.getData();
    expect(data).to.equal("test data");
  });

  it("Should integrate with AI predictions (mock)", async function () {
    // Mock AI call for testing
    const prediction = await medIntel.getPrediction("symptoms");
    expect(prediction).to.be.a('string');
  });
});
```### Fully Optimized contracts/MedToken.sol for MedIntel
