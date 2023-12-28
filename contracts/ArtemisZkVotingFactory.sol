// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./ArtemisZkVoting.sol";

contract ArtemisZkVotingFactory {
    // Array to keep track of all created ArtemisZkVoting instances
    ArtemisZkVoting[] public ArtemisZkVotings;

    // Event to log the creation of a new ArtemisZkVoting instance
    event ArtemisZkVotingCreated(ArtemisZkVoting indexed newVotingContract);

    /**
     * @dev Function to create a new instance of ArtemisZkVoting
     * @param initialOwner The initial owner of the new ArtemisZkVoting contract
     * @return address of the newly created ArtemisZkVoting contract
     */
    function createArtemisZkVoting(address initialOwner) external returns (ArtemisZkVoting) {
        ArtemisZkVoting newVoting = new ArtemisZkVoting(initialOwner);
        ArtemisZkVotings.push(newVoting);
        emit ArtemisZkVotingCreated(newVoting);
        return newVoting;
    }

    /**
     * @dev Function to get the total number of ArtemisZkVoting instances created
     * @return count of ArtemisZkVoting instances
     */
    function getArtemisZkVotingCount() external view returns (uint) {
        return ArtemisZkVotings.length;
    }
}
