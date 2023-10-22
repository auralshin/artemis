// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Verifier.sol";

contract ArtemisDAOVoting is Ownable, Groth16Verifier {
    Groth16Verifier public verifier;

    struct Proposal {
        bytes32 merkleRoot;
        string proposalDescription;
        mapping(bool => uint256) votes; // true: support, false: against
        mapping(bytes32 => bool) voted; // leaf: hasVoted
    }

    mapping(uint256 => Proposal) public proposals;

    // Events
    event ProposalAdded(uint256 proposalId, string description);
    event VoteReceived(uint256 proposalId, bool support);

    // Custom errors
    error InvalidVote();
    error AlreadyVoted();
    error InvalidZkSnarkProof();
    error InvalidMerkleProof();
    error InvalidProposal();

    constructor(address initialOwner) Ownable(initialOwner) {}

    function addProposal(
        uint256 proposalId,
        string memory description,
        bytes32 _merkleRoot
    ) external onlyOwner {
        require(
            proposals[proposalId].merkleRoot == 0,
            "Proposal already exists."
        );
        proposals[proposalId].merkleRoot = _merkleRoot;
        proposals[proposalId].proposalDescription = description;
        emit ProposalAdded(proposalId, description);
    }

    function voteForProposal(
        uint256 proposalId,
        bool support,
        uint[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[2] calldata _pubSignals,
        bytes32[] calldata merkleProof,
        bytes32 leaf
    ) external {
        Proposal storage proposal = proposals[proposalId];
        if (proposal.merkleRoot == 0) {
            revert InvalidProposal();
        }
        if (proposal.voted[leaf]) {
            revert AlreadyVoted();
        }
        if (!verifier.verifyProof(_pA, _pB, _pC, _pubSignals)) {
            revert InvalidZkSnarkProof();
        }
        if (!verifyMerkleProof(proposal, merkleProof, leaf)) {
            revert InvalidMerkleProof();
        }
        proposal.votes[support] += 1;
        proposal.voted[leaf] = true;
        emit VoteReceived(proposalId, support);
    }

    function totalVotesForProposal(
        uint256 proposalId,
        bool support
    ) external view returns (uint256) {
        Proposal storage proposal = proposals[proposalId];
        if (proposal.merkleRoot == 0) {
            revert InvalidProposal();
        }
        return proposal.votes[support];
    }

    function verifyMerkleProof(
        Proposal storage proposal,
        bytes32[] memory proof,
        bytes32 leaf
    ) internal view returns (bool) {
        return MerkleProof.verify(proof, proposal.merkleRoot, leaf);
    }

    function transferContractOwnership(address newOwner) external onlyOwner {
        transferOwnership(newOwner);
    }
}
