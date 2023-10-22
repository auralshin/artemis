import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";
import { ArtemisZKVoting, Groth16Verifier } from "../typechain-types";

describe("ArtemisZKVoting", () => {
  let accounts: Signer[];
  let address: string;
  let artemisZKVoting: ArtemisZKVoting;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    address = await accounts[0].getAddress();
    artemisZKVoting = await ethers.deployContract(
      "ArtemisZKVoting",
      [address],
      accounts[0]
    );
  });

  describe("addCampaign", () => {
    it("should add a new campaign", async () => {
      await expect(
        artemisZKVoting
          .connect(accounts[0])
          .addCampaign(
            1,
            "Test Campaign",
            [
              "0x0000000000000000000000000000000000000000000000000000000000000001",
            ],
            "0x0000000000000000000000000000000000000000000000000000000000000002"
          )
      )
        .to.emit(artemisZKVoting, "CampaignAdded") // Assume you have a CampaignAdded event
        .withArgs(1, "Test Campaign");
    });
  });

  describe("totalVotesFor", () => {
    beforeEach(async () => {
      // Create a campaign before testing totalVotesFor
      await artemisZKVoting
        .connect(accounts[0])
        .addCampaign(
          1,
          "Test Campaign",
          [
            "0x0000000000000000000000000000000000000000000000000000000000000001",
          ],
          "0x0000000000000000000000000000000000000000000000000000000000000002"
        );
    });

    it("should return the total votes for a candidate", async () => {
      const totalVotes = await artemisZKVoting.totalVotesFor(
        1,
        "0x0000000000000000000000000000000000000000000000000000000000000001"
      );
      expect(totalVotes).to.equal(0); // Assumes no votes have been cast yet
    });
  });

  describe("transferContractOwnership", () => {
    it("should transfer contract ownership", async () => {
      await artemisZKVoting.transferContractOwnership(address);
      const newOwner = await artemisZKVoting.owner();
      expect(newOwner).to.equal(address);
    });
  });

  describe("voteForCandidate", () => {
    beforeEach(async () => {
      // Create a campaign before testing totalVotesFor
      await artemisZKVoting
        .connect(accounts[0])
        .addCampaign(
          1,
          "Test Campaign",
          [
            "0x0000000000000000000000000000000000000000000000000000000000000001",
          ],
          "0x0000000000000000000000000000000000000000000000000000000000000002"
        );
    });
    it("should allow a voter to vote for a candidate", async () => {
      // This is a simplified example. You'd need to construct actual zk-SNARK proofs and Merkle proofs for a real test.
      await expect(
        artemisZKVoting.connect(accounts[0]).voteForCandidate(
          1,
          "0x0000000000000000000000000000000000000000000000000000000000000001",
          [0, 0],
          [
            [0, 0],
            [0, 0],
          ],
          [0, 0],
          [0, 0],
          [
            "0x0000000000000000000000000000000000000000000000000000000000000001",
          ],
          "0x0000000000000000000000000000000000000000000000000000000000000002"
        )
      )
        .to.emit(artemisZKVoting, "VoteReceived")
        .withArgs(
          1,
          "0x0000000000000000000000000000000000000000000000000000000000000001"
        );
    });
  });
  // ... other tests for voteForCandidate, totalVotesFor, etc.
});
