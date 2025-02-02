// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./Verifier.sol";

contract ArtemisZkVoting is Ownable, Groth16Verifier, Pausable {
    Groth16Verifier public verifier;
    uint256 public constant PROPOSAL_DELAY = 1 days;
    struct Proposal {
        bytes32 merkleRoot;
        string proposalDescription;
        mapping(bool => uint256) votes; // true: support, false: against
        mapping(bytes32 => bool) voted; // leaf: hasVoted
        uint256 startTime;
        uint256 endTime;
        uint256 quorum; // Expressed as a percentage
        uint256 passcodeHash;
        bool hasEnded;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    // Events
    event ProposalAdded(uint256 proposalId, string description);
    event VoteReceived(uint256 proposalId, bool support);
    event ProposalEnded(
        uint256 proposalId,
        bool achievedQuorum,
        bool supported
    );

    // Custom errors
    error InvalidVote();
    error AlreadyVoted();
    error InvalidZkSnarkProof();
    error InvalidMerkleProof();
    error InvalidProposal();
    error VotingEnded();
    error NotYetStarted();

    constructor(address initialOwner) Ownable(initialOwner) {}

    function addProposal(
        string memory description,
        bytes32 _merkleRoot,
        uint256 duration,
        uint256 _quorum,
        uint256 passcodeHash
    ) external onlyOwner {
        require(duration > 0, "Duration should be greater than zero");
        require(_quorum <= 100, "Quorum should be between 0 and 100");
        proposalCount += 1;
        proposals[proposalCount].merkleRoot = _merkleRoot;
        proposals[proposalCount].proposalDescription = description;
        proposals[proposalCount].startTime = block.timestamp + PROPOSAL_DELAY;
        proposals[proposalCount].endTime = block.timestamp + PROPOSAL_DELAY + duration;
        proposals[proposalCount].quorum = _quorum;
        proposals[proposalCount].passcodeHash = passcodeHash;
        emit ProposalAdded(proposalCount, description);
    }

    function voteForProposal(
        uint256 proposalId,
        bool support,
        bytes32[] calldata merkleProof,
        bytes32 leaf,
        uint256[] memory proof
    ) external whenNotPaused {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.merkleRoot != 0, "Invalid proposal.");
        require(!proposal.hasEnded, "Voting has ended for this proposal.");
        require(
            block.timestamp >= proposal.startTime,
            "Voting not yet started."
        );
        // require(block.timestamp <= proposal.endTime, "Voting time has ended.");
        if (block.timestamp > proposal.endTime) {
            revert VotingEnded();
        }
        require(!proposal.voted[leaf], "Already voted.");

        require(proof.length == 8, "Invalid proof");
        uint256[2] memory a = [proof[0], proof[1]];
        uint256[2][2] memory b = [[proof[2], proof[3]], [proof[4], proof[5]]];
        uint256[2] memory c = [proof[6], proof[7]];
        uint256[2] memory input = [
            proposal.passcodeHash,
            uint256(uint160(msg.sender))
        ];
        if (!this.verifyProof(a, b, c, input)) {
            revert InvalidZkSnarkProof();
        }
        if (!verifyMerkleProof(proposal, merkleProof, leaf)) {
            revert InvalidMerkleProof();
        }
        proposal.votes[support] += 1;
        proposal.voted[leaf] = true;
        emit VoteReceived(proposalId, support);
    }

    function endVoting(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(
            block.timestamp > proposal.endTime,
            "Voting period is not yet over."
        );
        if (proposal.hasEnded) {
            revert VotingEnded();
        }

        proposal.hasEnded = true;

        uint256 totalVotes = proposal.votes[true] + proposal.votes[false];
        bool achievedQuorum = false;
        if (totalVotes > 0) {
            achievedQuorum = (totalVotes * 100) / totalVotes >= proposal.quorum;
        }
        bool isSupported = proposal.votes[true] > proposal.votes[false];

        emit ProposalEnded(proposalId, achievedQuorum, isSupported);
    }

    function verifyMerkleProof(
        Proposal storage proposal,
        bytes32[] memory proof,
        bytes32 leaf
    ) internal view returns (bool) {
        return MerkleProof.verify(proof, proposal.merkleRoot, leaf);
    }

    function pauseVoting() external onlyOwner {
        _pause();
    }

    function resumeVoting() external onlyOwner {
        _unpause();
    }

    function transferContractOwnership(address newOwner) external onlyOwner {
        transferOwnership(newOwner);
    }
}
