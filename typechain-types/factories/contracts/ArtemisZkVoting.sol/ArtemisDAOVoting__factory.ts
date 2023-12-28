/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  ArtemisDAOVoting,
  ArtemisDAOVotingInterface,
} from "../../../contracts/ArtemisZkVoting.sol/ArtemisDAOVoting";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyVoted",
    type: "error",
  },
  {
    inputs: [],
    name: "EnforcedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpectedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMerkleProof",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidProposal",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidVote",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidZkSnarkProof",
    type: "error",
  },
  {
    inputs: [],
    name: "NotYetStarted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "VotingEnded",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "ProposalAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "achievedQuorum",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "supported",
        type: "bool",
      },
    ],
    name: "ProposalEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "support",
        type: "bool",
      },
    ],
    name: "VoteReceived",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "_merkleRoot",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_quorum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "passcodeHash",
        type: "uint256",
      },
    ],
    name: "addProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "endVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
    outputs: [
      {
        internalType: "bytes32",
        name: "merkleRoot",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "proposalDescription",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quorum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "passcodeHash",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "hasEnded",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "resumeVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferContractOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifier",
    outputs: [
      {
        internalType: "contract Groth16Verifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "_pA",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "_pB",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "_pC",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2]",
        name: "_pubSignals",
        type: "uint256[2]",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "support",
        type: "bool",
      },
      {
        internalType: "bytes32[]",
        name: "merkleProof",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32",
        name: "leaf",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "proof",
        type: "uint256[]",
      },
    ],
    name: "voteForProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516200192338038062001923833981016040819052610031916100cd565b806001600160a01b03811661006057604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6100698161007d565b50506000805460ff60a01b191690556100fd565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100df57600080fd5b81516001600160a01b03811681146100f657600080fd5b9392505050565b611816806200010d6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80638da5cb5b1161008c578063da35c66411610066578063da35c664146101d6578063f2fde38b146101ed578063f3cdcd1e14610200578063f5c9d69e1461020857600080fd5b80638da5cb5b1461019f578063a843c51f146101b0578063d7e82e2e146101c357600080fd5b8063649f89a5116100c8578063649f89a514610167578063715018a61461017c5780637afdf93e146101845780638c7d69e41461018c57600080fd5b8063013cf08b146100ef5780632b7ac3f31461011e5780635c975abb14610149575b600080fd5b6101026100fd3660046111b9565b61021b565b6040516101159796959493929190611218565b60405180910390f35b600154610131906001600160a01b031681565b6040516001600160a01b039091168152602001610115565b600054600160a01b900460ff165b6040519015158152602001610115565b61017a6101753660046111b9565b6102e2565b005b61017a610437565b61017a61044b565b61017a61019a366004611332565b61045b565b6000546001600160a01b0316610131565b61017a6101be3660046113f1565b6108fb565b61017a6101d136600461141a565b61090f565b6101df60035481565b604051908152602001610115565b61017a6101fb3660046113f1565b610a99565b61017a610ad4565b6101576102163660046114e0565b610ae4565b6002602052600090815260409020805460018201805491929161023d90611540565b80601f016020809104026020016040519081016040528092919081815260200182805461026990611540565b80156102b65780601f1061028b576101008083540402835291602001916102b6565b820191906000526020600020905b81548152906001019060200180831161029957829003601f168201915b505050600484015460058501546006860154600787015460089097015495969295919450925060ff1687565b6000818152600260205260409020600581015442116103485760405162461bcd60e51b815260206004820152601e60248201527f566f74696e6720706572696f64206973206e6f7420796574206f7665722e000060448201526064015b60405180910390fd5b600881015460ff161561036e57604051637a19ed0560e01b815260040160405180910390fd5b60088101805460ff1916600190811790915560008080526002830160205260408082205492825281205490916103a391611590565b9050600081156103cd576006830154826103be8160646115a3565b6103c891906115ba565b101590505b60008080526002840160209081526040808320546001845292819020548151888152851515938101939093529092109181018290527f367048e102ba4927ccde851f5a4b4a5c93996244e9535a4eaa35b93994f2c5b6906060015b60405180910390a15050505050565b61043f610f9f565b6104496000610fcc565b565b610453610f9f565b61044961101c565b610463611071565b600086815260026020526040812080549091036104b65760405162461bcd60e51b815260206004820152601160248201527024b73b30b634b210383937b837b9b0b61760791b604482015260640161033f565b600881015460ff16156105175760405162461bcd60e51b815260206004820152602360248201527f566f74696e672068617320656e64656420666f7220746869732070726f706f7360448201526230b61760e91b606482015260840161033f565b806004015442101561056b5760405162461bcd60e51b815260206004820152601760248201527f566f74696e67206e6f742079657420737461727465642e000000000000000000604482015260640161033f565b806005015442111561059057604051637a19ed0560e01b815260040160405180910390fd5b600083815260038201602052604090205460ff16156105e25760405162461bcd60e51b815260206004820152600e60248201526d20b63932b0b23c903b37ba32b21760911b604482015260640161033f565b81516008146106235760405162461bcd60e51b815260206004820152600d60248201526c24b73b30b634b210383937b7b360991b604482015260640161033f565b6000604051806040016040528084600081518110610643576106436115dc565b6020026020010151815260200184600181518110610663576106636115dc565b602002602001015181525090506000604051806040016040528060405180604001604052808760028151811061069b5761069b6115dc565b60200260200101518152602001876003815181106106bb576106bb6115dc565b602002602001015181525081526020016040518060400160405280876004815181106106e9576106e96115dc565b6020026020010151815260200187600581518110610709576107096115dc565b602002602001015181525081525090506000604051806040016040528086600681518110610739576107396115dc565b6020026020010151815260200186600781518110610759576107596115dc565b60209081029190910181015190915260408051808201825260078801548152339281019290925251637ae4eb4f60e11b815291925090309063f5c9d69e906107ab90879087908790879060040161161b565b602060405180830381865afa1580156107c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ec9190611682565b6108095760405163bbad34d360e01b815260040160405180910390fd5b610848858a8a808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152508c925061109c915050565b6108655760405163582f497d60e11b815260040160405180910390fd5b89151560009081526002860160205260408120805460019290610889908490611590565b9091555050600087815260038601602052604090819020805460ff19166001179055517f25375b46ce887ef9d462ae9772ab4270f5c3eb503d1194f5af15c0c7ccae0dc0906108e6908d908d909182521515602082015260400190565b60405180910390a15050505050505050505050565b610903610f9f565b61090c81610a99565b50565b610917610f9f565b600083116109735760405162461bcd60e51b8152602060048201526024808201527f4475726174696f6e2073686f756c642062652067726561746572207468616e206044820152637a65726f60e01b606482015260840161033f565b60648211156109cf5760405162461bcd60e51b815260206004820152602260248201527f51756f72756d2073686f756c64206265206265747765656e203020616e642031604482015261030360f41b606482015260840161033f565b6001600360008282546109e29190611590565b9091555050600380546000908152600260205260408082208790559154815220600101610a0f86826116ee565b506003546000908152600260205260409020426004909101819055610a35908490611590565b600380546000908152600260205260408082206005019390935581548152828120600601859055815481528290206007018390555490517ff970aa486598017b8116c2beb18c50d4584ecbc3c688817f59b26796725f31bf916104289188906117ae565b610aa1610f9f565b6001600160a01b038116610acb57604051631e4fbdf760e01b81526000600482015260240161033f565b61090c81610fcc565b610adc610f9f565b6104496110b5565b6000610f54565b7f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47811061090c576000805260206000f35b600060405183815284602082015285604082015260408160608360076107d05a03fa915081610b4f576000805260206000f35b825160408201526020830151606082015260408360808360066107d05a03fa91505080610b80576000805260206000f35b5050505050565b7f1f47fc98b124edb94deba1c1f36462e3a62a7f2996e736c19826ce9e7e20593b85527f224b34bceb16785f611970640bdb5a7eefd6db804dda01bf7766245da0737059602086015260006080860186610c2487357f176dac0d9f112c10b34f9816c7b2e7be2a5ddcba091842bcdc2e4e029a2472417f1e2d124cf25f64bf9489940510044bd4932b3e85366ea03c70c64054a00dc55684610b1c565b610c7460208801357f19291a57741cade2324362710eff61d547e8ca0eba8ac1a6886a934efd96b1d97f20709c6b6e7c089627b228b3aef4193f12a0f2d6998b9c89174936a713573f8f84610b1c565b50823581527f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4760208401357f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4703066020820152833560408201526020840135606082015260408401356080820152606084013560a08201527f1cfa76a4f8198885a8bf21eab13fab5f2b6f61b1532272e5740b5973e92037ae60c08201527f14f80705313ec2066904eab7150736ae40cc9d88d19d18607727c0757e0d7bea60e08201527f25db8f13103556dda98c6797898035423691183180b3e83b451e096b266b1c2b6101008201527f294e984f3ea5e572210ed21fdac573dd2be9beb2c98a9d38dafa7e00ba91e0306101208201527f122326837fd6983c9adfebad1222929121a7d74cdf3da0a9f54f293a290d09546101408201527f2344a978108f56417169a68932c43f0748b1392a30a4cbaeb8825ef414d15637610160820152600087015161018082015260206000018701516101a08201527f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c26101c08201527f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed6101e08201527f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b6102008201527f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa610220820152843561024082015260208501356102608201527f0b6cb1bf38a6294a00ef87a536fb8aa28beba5363b9cdac2f3ad739981ee0eb56102808201527f05f7f6c825770e78d6bb98339eeb44448494b3d114cdbc4befff2a5960bc25c06102a08201527f09f8889d38126470c21e8312b7a8ab1b23036d2826d70a611a1adb9c96903d6e6102c08201527f1a1df425b26a8ce53aa4e085d337957e7188c741c02d39d4f566cbccbdb921fc6102e08201526020816103008360086107d05a03fa9051169695505050505050565b6040516103808101604052610f6c6000840135610aeb565b610f796020840135610aeb565b610f866040840135610aeb565b610f93818486888a610b87565b90508060005260206000f35b6000546001600160a01b031633146104495760405163118cdaa760e01b815233600482015260240161033f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6110246110f8565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600054600160a01b900460ff16156104495760405163d93c066560e01b815260040160405180910390fd5b60006110ad83856000015484611122565b949350505050565b6110bd611071565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586110543390565b600054600160a01b900460ff1661044957604051638dfc202b60e01b815260040160405180910390fd5b60008261112f8584611138565b14949350505050565b600081815b845181101561117d576111698286838151811061115c5761115c6115dc565b6020026020010151611187565b915080611175816117c7565b91505061113d565b5090505b92915050565b60008183106111a35760008281526020849052604090206111b2565b60008381526020839052604090205b9392505050565b6000602082840312156111cb57600080fd5b5035919050565b6000815180845260005b818110156111f8576020818501810151868301820152016111dc565b506000602082860101526020601f19601f83011685010191505092915050565b87815260e06020820152600061123160e08301896111d2565b6040830197909752506060810194909452608084019290925260a0830152151560c09091015292915050565b801515811461090c57600080fd5b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156112aa576112aa61126b565b604052919050565b600082601f8301126112c357600080fd5b8135602067ffffffffffffffff8211156112df576112df61126b565b8160051b6112ee828201611281565b928352848101820192828101908785111561130857600080fd5b83870192505b848310156113275782358252918301919083019061130e565b979650505050505050565b60008060008060008060a0878903121561134b57600080fd5b86359550602087013561135d8161125d565b9450604087013567ffffffffffffffff8082111561137a57600080fd5b818901915089601f83011261138e57600080fd5b81358181111561139d57600080fd5b8a60208260051b85010111156113b257600080fd5b602083019650809550506060890135935060808901359150808211156113d757600080fd5b506113e489828a016112b2565b9150509295509295509295565b60006020828403121561140357600080fd5b81356001600160a01b03811681146111b257600080fd5b600080600080600060a0868803121561143257600080fd5b853567ffffffffffffffff8082111561144a57600080fd5b818801915088601f83011261145e57600080fd5b81356020828211156114725761147261126b565b611484601f8301601f19168201611281565b92508183528a8183860101111561149a57600080fd5b818185018285013760009183018101919091529099908801359850604088013597606081013597506080013595509350505050565b806040810183101561118157600080fd5b60008060008061014085870312156114f757600080fd5b61150186866114cf565b935060c085018681111561151457600080fd5b60408601935061152487826114cf565b9250506115358661010087016114cf565b905092959194509250565b600181811c9082168061155457607f821691505b60208210810361157457634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b808201808211156111815761118161157a565b80820281158282048414176111815761118161157a565b6000826115d757634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b8060005b60028110156116155781518452602093840193909101906001016115f6565b50505050565b610140810161162a82876115f2565b60408083018660005b600281101561165a576116478383516115f2565b9183019160209190910190600101611633565b5050505061166b60c08301856115f2565b6116796101008301846115f2565b95945050505050565b60006020828403121561169457600080fd5b81516111b28161125d565b601f8211156116e957600081815260208120601f850160051c810160208610156116c65750805b601f850160051c820191505b818110156116e5578281556001016116d2565b5050505b505050565b815167ffffffffffffffff8111156117085761170861126b565b61171c816117168454611540565b8461169f565b602080601f83116001811461175157600084156117395750858301515b600019600386901b1c1916600185901b1785556116e5565b600085815260208120601f198616915b8281101561178057888601518255948401946001909101908401611761565b508582101561179e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b8281526040602082015260006110ad60408301846111d2565b6000600182016117d9576117d961157a565b506001019056fea2646970667358221220a35574f3fafb30a7afb70fc1ef52693a507075d33513a03e6c58d6ccb44c89ea64736f6c63430008140033";

type ArtemisDAOVotingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArtemisDAOVotingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArtemisDAOVoting__factory extends ContractFactory {
  constructor(...args: ArtemisDAOVotingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    initialOwner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(initialOwner, overrides || {});
  }
  override deploy(
    initialOwner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(initialOwner, overrides || {}) as Promise<
      ArtemisDAOVoting & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ArtemisDAOVoting__factory {
    return super.connect(runner) as ArtemisDAOVoting__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArtemisDAOVotingInterface {
    return new Interface(_abi) as ArtemisDAOVotingInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ArtemisDAOVoting {
    return new Contract(address, _abi, runner) as unknown as ArtemisDAOVoting;
  }
}
