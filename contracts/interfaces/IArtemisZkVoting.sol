// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

interface IArtemisZkVoting {
    // Define the events
    event ProposalAdded(uint256 proposalId, string description);
    event VoteReceived(uint256 proposalId, bool support);
    event ProposalEnded(
        uint256 proposalId,
        bool achievedQuorum,
        bool supported
    );

    // Function signatures
    function addProposal(
        string calldata description,
        bytes32 _merkleRoot,
        uint256 duration,
        uint256 _quorum,
        uint256 passcodeHash
    ) external;

    function voteForProposal(
        uint256 proposalId,
        bool support,
        bytes32[] calldata merkleProof,
        bytes32 leaf,
        uint256[] calldata proof
    ) external;

    function endVoting(uint256 proposalId) external;

    function pauseVoting() external;

    function resumeVoting() external;

    function transferContractOwnership(address newOwner) external;

    function verifyMerkleProof(
        bytes32[] calldata proof,
        bytes32 leaf
    ) external view returns (bool);
}
