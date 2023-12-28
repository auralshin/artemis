# ArtemisDAOVoting Smart Contract README

## Overview

The `ArtemisDAOVoting` smart contract is designed for decentralized autonomous organization (DAO) voting. It leverages the Ethereum blockchain and integrates advanced cryptographic techniques like zk-SNARKs for privacy and Merkle proofs for data integrity.

### Key Features

- **Proposal Management**: Ability to add proposals for voting, including description, duration, quorum, and other parameters.
- **zk-SNARKs Verification**: Ensures the integrity and privacy of votes through zero-knowledge proofs.
- **Merkle Proof Verification**: Validates voter eligibility without revealing voter identities.
- **Pause/Resume Voting**: Contract owner can pause and resume voting, enhancing control during emergencies or system maintenance.
- **Ownership Management**: Allows for the transfer of contract ownership for administrative flexibility.

## Requirements

- Solidity ^0.8.20
- OpenZeppelin Contracts (for cryptography and access control)

## Installation

1. Ensure you have a development environment for Ethereum smart contracts, like Hardhat.
```shell
yarn install
```
2. Install OpenZeppelin contracts:
   ```shell
   npm install @openzeppelin/contracts
   ```
3. Deploy the contract to an Ethereum network using your preferred method (e.g., Hardhat deploy scripts).

## Usage

### Contract Deployment

Deploy the contract by specifying the initial owner's address:
```javascript
ArtemisDAOVoting artemisDAOVoting = new ArtemisDAOVoting(initialOwnerAddress);
```

### Adding a Proposal

The contract owner can add a proposal:
```javascript
artemisDAOVoting.addProposal(description, merkleRoot, duration, quorum, passcodeHash);
```

### Voting on a Proposal

Voters can vote on active proposals using zk-SNARKs proofs and Merkle proofs:
```javascript
artemisDAOVoting.voteForProposal(proposalId, support, merkleProof, leaf, proof);
```

### Ending Voting on a Proposal

A proposal's voting period can be ended, triggering the vote tally:
```javascript
artemisDAOVoting.endVoting(proposalId);
```

### Pausing and Resuming Voting

The contract owner can pause and resume voting:
```javascript
artemisDAOVoting.pauseVoting();
artemisDAOVoting.resumeVoting();
```

### Transferring Contract Ownership

Ownership can be transferred to a new owner:
```javascript
artemisDAOVoting.transferContractOwnership(newOwnerAddress);
```

## Testing

Write tests for each function to ensure the contract behaves as expected. You can use Hardhat for testing Solidity contracts.
```shell
yarn test
```

## Security

This contract uses OpenZeppelin’s libraries for secure contract development. Regular audits and reviews are recommended to maintain security standards.

## License

This project is licensed under the GPL-3.0 license.

---