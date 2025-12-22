const { expect } = require("chai");
const { ethers } = require("hardhat");
const MedicalData = require("../models/MedicalData");
const Agent = require("../models/Agent");

describe("MedIntel NeuroGrid Tests", function () {
    let medIntel, medToken;

    beforeEach(async function () {
        const MedToken = await ethers.getContractFactory("MedToken");
        medToken = await MedToken.deploy();
        await medToken.deployed();

        const MedIntel = await ethers.getContractFactory("MedIntel");
        medIntel = await MedIntel.deploy(medToken.address);
        await medIntel.deployed();
    });

    it("Should encrypt medical data", function () {
        const data = new MedicalData("123", "post-op data", "agent1");
        data.encrypt();
        expect(data.encrypted).to.be.true;
    });

    it("Should manage agent tasks", function () {
        const agent = new Agent("agent1");
        agent.assignTask("assess recovery");
        expect(agent.tasks.length).to.equal(1);
    });

    it("Should deploy contracts", async function () {
        expect(medToken.address).to.not.be.null;
        expect(medIntel.address).to.not.be.null;
    });
});
