/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { Erc1155Meta } from "./Erc1155Meta";

export class Erc1155MetaFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<Erc1155Meta> {
    return super.deploy(overrides || {}) as Promise<Erc1155Meta>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Erc1155Meta {
    return super.attach(address) as Erc1155Meta;
  }
  connect(signer: Signer): Erc1155MetaFactory {
    return super.connect(signer) as Erc1155MetaFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Erc1155Meta {
    return new Contract(address, _abi, signerOrProvider) as Erc1155Meta;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "signer",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newNonce",
        type: "uint256"
      }
    ],
    name: "NonceChange",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]"
      }
    ],
    name: "TransferBatch",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "TransferSingle",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_amount",
        type: "string"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "URI",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_owners",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]"
      }
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address"
      }
    ],
    name: "getNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "_operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "isOperator",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_signerAddress",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "_hash",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "_sig",
        type: "bytes"
      }
    ],
    name: "isValidSignature",
    outputs: [
      {
        internalType: "bool",
        name: "isValid",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]"
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]"
      },
      {
        internalType: "bool",
        name: "_isGasFee",
        type: "bool"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "metaSafeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "_isGasFee",
        type: "bool"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "metaSafeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      {
        internalType: "bool",
        name: "_approved",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "_isGasFee",
        type: "bool"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "metaSetApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]"
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      {
        internalType: "bool",
        name: "_approved",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_interfaceID",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "pure",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506128cd806100206000396000f3fe608060405234801561001057600080fd5b50600436106100b35760003560e01c8063a3d4926e11610071578063a3d4926e1461015c578063ce0b514b1461016f578063e985e9c514610182578063f242432a14610195578063f5d4c820146101a8578063fa4e12d7146101bb576100b3565b8062fdd58e146100b857806301ffc9a7146100e15780632d0335ab146101015780632eb2c2d6146101145780634e1273f414610129578063a22cb46514610149575b600080fd5b6100cb6100c6366004611b2f565b6101ce565b6040516100d8919061278c565b60405180910390f35b6100f46100ef366004611c38565b6101f4565b6040516100d89190611f97565b6100cb61010f36600461173b565b610228565b610127610122366004611894565b610243565b005b61013c610137366004611b5a565b6102cb565b6040516100d89190611f56565b610127610157366004611a86565b6103c3565b61012761016a3660046117d8565b610432565b61012761017d3660046119b5565b61057f565b6100f46101903660046117a0565b610637565b6101276101a3366004611a2c565b610665565b6101276101b636600461193d565b6106dd565b6100f46101c9366004611ab3565b6107e2565b6001600160a01b0391909116600090815260208181526040808320938352929052205490565b60006001600160e01b03198216636cdb3d1360e11b141561021757506001610223565b61022082610bc8565b90505b919050565b6001600160a01b031660009081526002602052604090205490565b336001600160a01b038616148061025f575061025f8533610637565b6102845760405162461bcd60e51b815260040161027b906124a5565b60405180910390fd5b6001600160a01b0384166102aa5760405162461bcd60e51b815260040161027b90612376565b6102b685858585610be1565b6102c4858585855a86610deb565b5050505050565b606081518351146102ee5760405162461bcd60e51b815260040161027b906123c6565b606083516001600160401b038111801561030757600080fd5b50604051908082528060200260200182016040528015610331578160200160208202803683370190505b50905060005b84518110156103bb5760008086838151811061034f57fe5b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020600085838151811061038557fe5b60200260200101518152602001908152602001600020548282815181106103a857fe5b6020908102919091010152600101610337565b509392505050565b3360008181526001602090815260408083206001600160a01b038716808552925291829020805460ff191685151517905590519091907f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3190610426908590611f97565b60405180910390a35050565b6001600160a01b0385166104585760405162461bcd60e51b815260040161027b9061254b565b6060610462611592565b606061051589857fa3d4926e8cf8fe8e020cd29f514c256bc2eec62aa2337e415f1a33a4828af5a060001b8c8c8c6040516020016104a09190611d92565b604051602081830303815290604052805190602001208c6040516020016104c79190611d92565b604051602081830303815290604052805190602001208c6104e95760006104ec565b60015b60405160200161050196959493929190611fb9565b604051602081830303815290604052610ebe565b905061052389898989610be1565b8415610566578080602001905181019061053d9190611cf8565b809450819350505061055789898989866020015188610deb565b6105618983611027565b610574565b610574898989895a86610deb565b505050505050505050565b6001600160a01b0385166105a55760405162461bcd60e51b815260040161027b90612241565b60606105af611592565b60606105e789857fce0b514b3931bdbe4d5d44e4f035afe7113767b7db71949271f6a62d9c60f558828c8c8c8c6104e95760006104ec565b90506105f589898989611236565b8415610629578080602001905181019061060f9190611cf8565b80945081935050506105578989898986602001518861131e565b610574898989895a8661131e565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b336001600160a01b038616148061068157506106818533610637565b61069d5760405162461bcd60e51b815260040161027b90612120565b6001600160a01b0384166106c35760405162461bcd60e51b815260040161027b90612078565b6106cf85858585611236565b6102c4858585855a8661131e565b606061073986837ff5d4c820494c8595de274c7ff619bead38aac4fbc3d143b5bf956aa4b84fa524828989610713576000610716565b60015b89610722576000610725565b60015b604051602001610501959493929190611fed565b6001600160a01b038781166000818152600160209081526040808320948b168084529490915290819020805460ff19168915151790555192935090917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31906107a2908890611f97565b60405180910390a382156107da576107b8611592565b818060200190518101906107cc9190611cc6565b90506107d88782611027565b505b505050505050565b6000808251116108045760405162461bcd60e51b815260040161027b906124f4565b6001600160a01b03851661082a5760405162461bcd60e51b815260040161027b90612464565b6000610835836113f1565b60f81c90506005811061085a5760405162461bcd60e51b815260040161027b906121f6565b60008160ff16600581111561086b57fe5b905060008080808085600581111561087f57fe5b141561089d5760405162461bcd60e51b815260040161027b90612294565b60018560058111156108ab57fe5b14156109815787516061146108d25760405162461bcd60e51b815260040161027b9061232b565b6108e388600063ffffffff61143f16565b92506108f688602063ffffffff61143f16565b91508760408151811061090557fe5b602001015160f81c60f81b60f81c935060018a858585604051600081526020016040526040516109389493929190612035565b6020604051602081039080840390855afa15801561095a573d6000803e3d6000fd5b5050604051601f1901516001600160a01b038d81169116149750610bc09650505050505050565b600285600581111561098f57fe5b1415610a425787516061146109b65760405162461bcd60e51b815260040161027b9061232b565b6109c788600063ffffffff61143f16565b92506109da88602063ffffffff61143f16565b9150876040815181106109e957fe5b602001015160f81c60f81b60f81c935060018a604051602001610a0c9190611e27565b60405160208183030381529060405280519060200120858585604051600081526020016040526040516109389493929190612035565b6003856005811115610a5057fe5b1415610af5576040516320c13b0b60e01b81526001600160a01b038c16906320c13b0b90610a84908c908c90600401612053565b60206040518083038186803b158015610a9c57600080fd5b505afa158015610ab0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ad49190611c54565b6001600160e01b0319166320c13b0b60e01b149650610bc095505050505050565b6004856005811115610b0357fe5b1415610ba857604051630b135d3f60e11b81526001600160a01b038c1690631626ba7e90610b37908d908c9060040161201c565b60206040518083038186803b158015610b4f57600080fd5b505afa158015610b63573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b879190611c54565b6001600160e01b031916630b135d3f60e11b149650610bc095505050505050565b60405162461bcd60e51b815260040161027b906121f6565b949350505050565b6001600160e01b031981166301ffc9a760e01b14919050565b8051825114610c025760405162461bcd60e51b815260040161027b906121a1565b815160005b81811015610d8c57610c7d838281518110610c1e57fe5b6020026020010151600080896001600160a01b03166001600160a01b031681526020019081526020016000206000878581518110610c5857fe5b602002602001015181526020019081526020016000205461146e90919063ffffffff16565b600080886001600160a01b03166001600160a01b031681526020019081526020016000206000868481518110610caf57fe5b6020026020010151815260200190815260200160002081905550610d37838281518110610cd857fe5b6020026020010151600080886001600160a01b03166001600160a01b031681526020019081526020016000206000878581518110610d1257fe5b602002602001015181526020019081526020016000205461149690919063ffffffff16565b600080876001600160a01b03166001600160a01b031681526020019081526020016000206000868481518110610d6957fe5b602090810291909101810151825281019190915260400160002055600101610c07565b50836001600160a01b0316856001600160a01b0316336001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8686604051610ddc929190611f69565b60405180910390a45050505050565b610dfd856001600160a01b03166114c2565b156107da576000856001600160a01b031663bc197c8184338a8989886040518763ffffffff1660e01b8152600401610e39959493929190611e58565b602060405180830381600088803b158015610e5357600080fd5b5087f1158015610e67573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190610e8c9190611c54565b90506001600160e01b0319811663bc197c8160e01b146107d85760405162461bcd60e51b815260040161027b906125a8565b60608083806020019051810190610ed59190611c70565b6001600160a01b03871660009081526002602052604081205491945091925090610f0683604163ffffffff61143f16565b9050818110801590610f1a57508160640181105b610f365760405162461bcd60e51b815260040161027b906126ef565b6000610f7286838780519060200120604051602001610f5793929190611dc8565b604051602081830303815290604052805190602001206114f9565b90506060868387604051602001610f8b93929190611def565b60408051601f198184030181528282526001600160a01b038c166000818152600260205292909220600187019081905590935090917fb861b7bdbe611a846ab271b8d2810391bc8b5a968f390c322438ecab66bccf5991610feb9161278c565b60405180910390a2610fff898383886107e2565b61101b5760405162461bcd60e51b815260040161027b906122d8565b50505050509392505050565b600061103682606001516113f1565b60f81c90506002811061105b5760405162461bcd60e51b815260040161027b9061273e565b60008160ff16600281111561106c57fe5b83516040850151919250600091829182916001600160a01b031615611095578660400151611097565b335b925060008560028111156110a757fe5b14156111735786606001518060200190518101906110c59190611773565b90945091506001600160a01b038416301415611109576110e788848484611236565b6111048884845a856040518060200160405280600081525061131e565b61116e565b604051637921219560e11b81526001600160a01b0385169063f242432a9061113b908b90879087908790600401611f1e565b600060405180830381600087803b15801561115557600080fd5b505af1158015611169573d6000803e3d6000fd5b505050505b61122c565b866060015180602001905181019061118b9190611757565b6040516323b872dd60e01b81529094506001600160a01b038516906323b872dd906111be908b9087908690600401611efa565b602060405180830381600087803b1580156111d857600080fd5b505af11580156111ec573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112109190611c1c565b61122c5760405162461bcd60e51b815260040161027b90612412565b5050505050505050565b6001600160a01b038416600090815260208181526040808320858452909152902054611268908263ffffffff61146e16565b6001600160a01b03808616600090815260208181526040808320878452825280832094909455918616815280825282812085825290915220546112b1908263ffffffff61149616565b6001600160a01b03808516600081815260208181526040808320888452909152908190209390935591519086169033907fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62906113109087908790612795565b60405180910390a450505050565b611330856001600160a01b03166114c2565b156107da576000856001600160a01b031663f23a6e6184338a8989886040518763ffffffff1660e01b815260040161136c959493929190611eb5565b602060405180830381600088803b15801561138657600080fd5b5087f115801561139a573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906113bf9190611c54565b90506001600160e01b0319811663f23a6e6160e01b146107d85760405162461bcd60e51b815260040161027b90612605565b6000808251116114135760405162461bcd60e51b815260040161027b906120c3565b8160018351038151811061142357fe5b0160200151825160001901909252506001600160f81b03191690565b600081602001835110156114655760405162461bcd60e51b815260040161027b90612662565b50016020015190565b6000828211156114905760405162461bcd60e51b815260040161027b9061216a565b50900390565b6000828201838110156114bb5760405162461bcd60e51b815260040161027b906126bf565b9392505050565b6000813f80158015906114bb57507fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470141592915050565b600060405180604001604052806002815260200161190160f01b8152507f035aff83d86937d35b32e04f0ddc6ff469290eef2f1b692d8a815c89404d474960001b3060405160200161154c929190611fa2565b604051602081830303815290604052805190602001208360405160200161157593929190611dc8565b604051602081830303815290604052805190602001209050919050565b6040518060800160405280600081526020016000815260200160006001600160a01b03168152602001606081525090565b600082601f8301126115d3578081fd5b81356115e66115e1826127c9565b6127a3565b81815291506020808301908481018184028601820187101561160757600080fd5b60005b848110156116265781358452928201929082019060010161160a565b505050505092915050565b600082601f830112611641578081fd5b813561164f6115e1826127e8565b915080825283602082850101111561166657600080fd5b8060208401602084013760009082016020015292915050565b600082601f83011261168f578081fd5b815161169d6115e1826127e8565b91508082528360208285010111156116b457600080fd5b6116c581602084016020860161280b565b5092915050565b6000608082840312156116dd578081fd5b6116e760806127a3565b9050815181526020820151602082015260408201516117058161283b565b604082015260608201516001600160401b0381111561172357600080fd5b61172f8482850161167f565b60608301525092915050565b60006020828403121561174c578081fd5b81356114bb8161283b565b600060208284031215611768578081fd5b81516114bb8161283b565b60008060408385031215611785578081fd5b82516117908161283b565b6020939093015192949293505050565b600080604083850312156117b2578182fd5b82356117bd8161283b565b915060208301356117cd8161283b565b809150509250929050565b60008060008060008060c087890312156117f0578182fd5b86356117fb8161283b565b9550602087013561180b8161283b565b945060408701356001600160401b0380821115611826578384fd5b6118328a838b016115c3565b95506060890135915080821115611847578384fd5b6118538a838b016115c3565b94506080890135915061186582612853565b90925060a0880135908082111561187a578283fd5b5061188789828a01611631565b9150509295509295509295565b600080600080600060a086880312156118ab578081fd5b85356118b68161283b565b945060208601356118c68161283b565b935060408601356001600160401b03808211156118e1578283fd5b6118ed89838a016115c3565b94506060880135915080821115611902578283fd5b61190e89838a016115c3565b93506080880135915080821115611923578283fd5b5061193088828901611631565b9150509295509295909350565b600080600080600060a08688031215611954578081fd5b853561195f8161283b565b9450602086013561196f8161283b565b9350604086013561197f81612853565b9250606086013561198f81612853565b915060808601356001600160401b038111156119a9578182fd5b61193088828901611631565b60008060008060008060c087890312156119cd578384fd5b86356119d88161283b565b955060208701356119e88161283b565b945060408701359350606087013592506080870135611a0681612853565b915060a08701356001600160401b03811115611a20578182fd5b61188789828a01611631565b600080600080600060a08688031215611a43578283fd5b8535611a4e8161283b565b94506020860135611a5e8161283b565b9350604086013592506060860135915060808601356001600160401b038111156119a9578182fd5b60008060408385031215611a98578182fd5b8235611aa38161283b565b915060208301356117cd81612853565b60008060008060808587031215611ac8578182fd5b8435611ad38161283b565b93506020850135925060408501356001600160401b0380821115611af5578384fd5b611b0188838901611631565b93506060870135915080821115611b16578283fd5b50611b2387828801611631565b91505092959194509250565b60008060408385031215611b41578182fd5b8235611b4c8161283b565b946020939093013593505050565b60008060408385031215611b6c578182fd5b82356001600160401b0380821115611b82578384fd5b81850186601f820112611b93578485fd5b80359250611ba36115e1846127c9565b80848252602080830192508084018a828389028701011115611bc3578889fd5b8894505b86851015611bee578035611bda8161283b565b845260019490940193928101928101611bc7565b509096508701359350505080821115611c05578283fd5b50611c12858286016115c3565b9150509250929050565b600060208284031215611c2d578081fd5b81516114bb81612853565b600060208284031215611c49578081fd5b81356114bb81612861565b600060208284031215611c65578081fd5b81516114bb81612861565b60008060408385031215611c82578182fd5b82516001600160401b0380821115611c98578384fd5b611ca48683870161167f565b93506020850151915080821115611cb9578283fd5b50611c128582860161167f565b600060208284031215611cd7578081fd5b81516001600160401b03811115611cec578182fd5b610bc0848285016116cc565b60008060408385031215611d0a578182fd5b82516001600160401b0380821115611d20578384fd5b611ca4868387016116cc565b6000815180845260208085019450808401835b83811015611d5b57815187529582019590820190600101611d3f565b509495945050505050565b60008151808452611d7e81602086016020860161280b565b601f01601f19169290920160200192915050565b815160009082906020808601845b83811015611dbc57815185529382019390820190600101611da0565b50929695505050505050565b60008451611dda81846020890161280b565b91909101928352506020820152604001919050565b60008451611e0181846020890161280b565b8201848152835190611e1a82602080840190880161280b565b0160200195945050505050565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152601c810191909152603c0190565b6001600160a01b0386811682528516602082015260a060408201819052600090611e8490830186611d2c565b8281036060840152611e968186611d2c565b8381036080850152611ea88186611d66565b9998505050505050505050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a060808201819052600090611eef90830184611d66565b979650505050505050565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6000602082526114bb6020830184611d2c565b600060408252611f7c6040830185611d2c565b8281036020840152611f8e8185611d2c565b95945050505050565b901515815260200190565b9182526001600160a01b0316602082015260400190565b9586526001600160a01b0394851660208701529290931660408501526060840152608083019190915260a082015260c00190565b9485526001600160a01b0393841660208601529190921660408401526060830191909152608082015260a00190565b600083825260406020830152610bc06040830184611d66565b93845260ff9290921660208401526040830152606082015260800190565b6000604082526120666040830185611d66565b8281036020840152611f8e8185611d66565b6020808252602b908201527f4552433131353523736166655472616e7366657246726f6d3a20494e56414c4960408201526a1117d49150d2541251539560aa1b606082015260800190565b60208082526037908201527f4c6962427974657323706f704c617374427974653a20475245415445525f544860408201527f414e5f5a45524f5f4c454e4754485f5245515549524544000000000000000000606082015260800190565b6020808252602a908201527f4552433131353523736166655472616e7366657246726f6d3a20494e56414c49604082015269222fa7a822a920aa27a960b11b606082015260800190565b60208082526017908201527f536166654d617468237375623a20554e444552464c4f57000000000000000000604082015260600190565b60208082526035908201527f45524331313535235f7361666542617463685472616e7366657246726f6d3a206040820152740929cac82989288be82a4a482b2a6be988a9c8ea89605b1b606082015260800190565b6020808252603a9082015260008051602061287883398151915260408201527f7572653a20554e535550504f525445445f5349474e4154555245000000000000606082015260800190565b60208082526033908201527f455243313135354d657461236d657461536166655472616e7366657246726f6d6040820152720e881253959053125117d49150d25412515395606a1b606082015260800190565b60208082526036908201526000805160206128788339815191526040820152757572653a20494c4c4547414c5f5349474e415455524560501b606082015260800190565b60208082526033908201527f455243313135354d657461235f7369676e617475726556616c69646174696f6e6040820152723a20494e56414c49445f5349474e415455524560681b606082015260800190565b602080825260379082015260008051602061287883398151915260408201527f7572653a204c454e4754485f39375f5245515549524544000000000000000000606082015260800190565b60208082526030908201527f45524331313535237361666542617463685472616e7366657246726f6d3a204960408201526f13959053125117d49150d2541251539560821b606082015260800190565b6020808252602c908201527f455243313135352362616c616e63654f6642617463683a20494e56414c49445f60408201526b082a4a482b2be988a9c8ea8960a31b606082015260800190565b60208082526032908201527f455243313135354d657461235f7472616e736665724761734665653a204552436040820152710c8c17d514905394d1915497d1905253115160721b606082015260800190565b60208082526033908201526000805160206128788339815191526040820152723ab9329d1024a72b20a624a22fa9a4a3a722a960691b606082015260800190565b6020808252602f908201527f45524331313535237361666542617463685472616e7366657246726f6d3a204960408201526e272b20a624a22fa7a822a920aa27a960891b606082015260800190565b602080825260439082015260008051602061287883398151915260408201527f7572653a204c454e4754485f475245415445525f5448414e5f305f524551554960608201526214915160ea1b608082015260a00190565b60208082526038908201527f455243313135354d657461236d6574615361666542617463685472616e73666560408201527f7246726f6d3a20494e56414c49445f524543495049454e540000000000000000606082015260800190565b6020808252603f908201527f45524331313535235f63616c6c6f6e455243313135354261746368526563656960408201527f7665643a20494e56414c49445f4f4e5f524543454956455f4d45535341474500606082015260800190565b6020808252603a908201527f45524331313535235f63616c6c6f6e4552433131353552656365697665643a2060408201527f494e56414c49445f4f4e5f524543454956455f4d455353414745000000000000606082015260800190565b6020808252603c908201527f4c696242797465732372656164427974657333323a20475245415445525f4f5260408201527f5f455155414c5f544f5f33325f4c454e4754485f524551554952454400000000606082015260800190565b602080825260169082015275536166654d617468236164643a204f564552464c4f5760501b604082015260600190565b6020808252602f908201527f455243313135354d657461235f7369676e617475726556616c69646174696f6e60408201526e3a20494e56414c49445f4e4f4e434560881b606082015260800190565b6020808252602e908201527f455243313135354d657461235f7472616e736665724761734665653a20554e5360408201526d2aa82827a92a22a22faa27a5a2a760911b606082015260800190565b90815260200190565b918252602082015260400190565b6040518181016001600160401b03811182821017156127c157600080fd5b604052919050565b60006001600160401b038211156127de578081fd5b5060209081020190565b60006001600160401b038211156127fd578081fd5b50601f01601f191660200190565b60005b8381101561282657818101518382015260200161280e565b83811115612835576000848401525b50505050565b6001600160a01b038116811461285057600080fd5b50565b801515811461285057600080fd5b6001600160e01b03198116811461285057600080fdfe5369676e617475726556616c696461746f7223697356616c69645369676e6174a2646970667358221220f762acf637622f6b3aadb2da2e13d00fb91eb6d5d4b21480e911aeddfc84fdaa64736f6c63430006080033";