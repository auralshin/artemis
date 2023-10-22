// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Verifier.sol";

contract ArtemisZKVoting is Ownable, Groth16Verifier {
    Groth16Verifier public verifier;

    struct Campaign {
        bytes32 merkleRoot;
        string campaignName;
        mapping(bytes32 => uint256) votesReceived;
        mapping(bytes32 => bool) voted;
        mapping(bytes32 => bool) validCandidates;
    }

    mapping(uint256 => Campaign) public campaigns;

    // Event emitted when a vote is received
    event CampaignAdded(uint256 campaignId, string campaignName);
    event VoteReceived(uint256 campaignId, bytes32 candidate);

    // Custom errors
    error InvalidCandidate();
    error AlreadyVoted();
    error InvalidZkSnarkProof();
    error InvalidMerkleProof();
    error InvalidCampaign();

    constructor(address initialOwner) Ownable(initialOwner) {}

    function addCampaign(
        uint256 campaignId,
        string memory _campaignName,
        bytes32[] memory candidateNames,
        bytes32 _merkleRoot
    ) external {
        require(
            campaigns[campaignId].merkleRoot == 0,
            "Campaign already exists."
        ); // Ensure unique campaign IDs

        Campaign storage campaign = campaigns[campaignId];
        campaign.merkleRoot = _merkleRoot;
        campaign.campaignName = _campaignName;
        for (uint i = 0; i < candidateNames.length; i++) {
            campaign.validCandidates[candidateNames[i]] = true;
        }
        emit CampaignAdded(campaignId, _campaignName);
    }

    function voteForCandidate(
        uint256 campaignId,
        bytes32 candidate,
        uint[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[2] calldata _pubSignals,
        bytes32[] calldata merkleProof,
        bytes32 leaf
    ) external {
        Campaign storage campaign = campaigns[campaignId];
        if (campaign.merkleRoot == 0) {
            revert InvalidCampaign();
        }
        if (!validCandidate(campaign, candidate)) {
            revert InvalidCandidate();
        }
        if (campaign.voted[leaf]) {
            revert AlreadyVoted();
        }

        // Verify zk-SNARK proof
        if (!verifier.verifyProof(_pA, _pB, _pC, _pubSignals)) {
            revert InvalidZkSnarkProof();
        }

        // Verify Merkle proof
        if (!verifyMerkleProof(campaign, merkleProof, leaf)) {
            revert InvalidMerkleProof();
        }

        campaign.votesReceived[candidate] += 1;
        campaign.voted[leaf] = true;

        emit VoteReceived(campaignId, candidate);
    }

    function totalVotesFor(
        uint256 campaignId,
        bytes32 candidate
    ) external view returns (uint256) {
        Campaign storage campaign = campaigns[campaignId];
        if (campaign.merkleRoot == 0) {
            revert InvalidCampaign();
        }
        if (!validCandidate(campaign, candidate)) {
            revert InvalidCandidate();
        }
        return campaign.votesReceived[candidate];
    }

    function verifyMerkleProof(
        Campaign storage campaign,
        bytes32[] memory proof,
        bytes32 leaf
    ) internal view returns (bool) {
        return MerkleProof.verify(proof, campaign.merkleRoot, leaf);
    }

    function validCandidate(
        Campaign storage campaign,
        bytes32 candidate
    ) internal view returns (bool) {
        return campaign.validCandidates[candidate];
    }

    function transferContractOwnership(address newOwner) external onlyOwner {
        transferOwnership(newOwner);
    }
}
