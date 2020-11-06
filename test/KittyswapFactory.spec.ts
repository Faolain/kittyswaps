import * as ethers from 'ethers'

import { 
  AbstractContract, 
  BigNumber, 
  expect,
  RevertError,
} from './utils'

import * as utils from './utils'

import { Erc1155Mock } from '../typings/contracts/Erc1155Mock'
import { Erc1155PackedBalanceMock } from '../typings/contracts/Erc1155PackedBalanceMock'
import { KittyswapsExchange } from '../typings/contracts/KittyswapsExchange'
import { KittyswapsFactory } from '../typings/contracts/KittyswapsFactory'
//@ts-ignore
import { web3 } from '@nomiclabs/buidler'

// init test wallets from package.json mnemonic

const {
  wallet: ownerWallet,
} = utils.createTestWallet(web3, 0)

const {
  wallet: userWallet,
  signer: userSigner
} = utils.createTestWallet(web3, 2)

const {
  wallet: operatorWallet,
  signer: operatorSigner
} = utils.createTestWallet(web3, 4)


describe('KittyswapsFactory', () => {
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

  let ownerAddress: string
  let userAddress: string
  let operatorAddress: string
  let erc1155Abstract: AbstractContract
  let erc1155PackedAbstract: AbstractContract
  let kittyswapsFactoryAbstract: AbstractContract
  let kittyswapsExchangeAbstract: AbstractContract

  // ERC-1155 token
  let ownerERC1155Contract: Erc1155PackedBalanceMock
  let userERC1155Contract: Erc1155PackedBalanceMock
  let operatorERC1155Contract: Erc1155PackedBalanceMock

  // Base Tokens
  let ownerBaseTokenContract: Erc1155Mock
  let userBaseTokenContract: Erc1155Mock
  let operatorBaseTokenContract: Erc1155Mock

  let kittyswapsFactoryContract: KittyswapsFactory

  // Token Param
  let types: number[] = []
  let values: number[]  = []
  const nTokenTypes    = 30 //560
  const nTokensPerType = 500000

  // Base Token Param
  const baseTokenID = 666;

  // load contract abi and deploy to test server
  beforeEach(async () => {
    ownerAddress = await ownerWallet.getAddress()
    userAddress = await userWallet.getAddress()
    operatorAddress = await operatorWallet.getAddress()
    erc1155Abstract = await AbstractContract.fromArtifactName('ERC1155Mock')
    erc1155PackedAbstract = await AbstractContract.fromArtifactName('ERC1155PackedBalanceMock')
    kittyswapsFactoryAbstract = await AbstractContract.fromArtifactName('KittyswapsFactory')
    kittyswapsExchangeAbstract = await AbstractContract.fromArtifactName('KittyswapsExchange')

    // Minting enough values for transfer for each types
    for (let i = 0; i < nTokenTypes; i++) {
      types.push(i)
      values.push(nTokensPerType)
    }
  })

  // deploy before each test, to reset state of contract
  beforeEach(async () => {
    // Deploy Base Token contract
    ownerBaseTokenContract = await erc1155Abstract.deploy(ownerWallet) as Erc1155Mock
    userBaseTokenContract = await ownerBaseTokenContract.connect(userSigner) as Erc1155Mock
    operatorBaseTokenContract = await ownerBaseTokenContract.connect(operatorSigner) as Erc1155Mock

    // Deploy ERC-1155
    ownerERC1155Contract = await erc1155PackedAbstract.deploy(ownerWallet) as Erc1155PackedBalanceMock
    operatorERC1155Contract = await ownerERC1155Contract.connect(operatorSigner) as Erc1155PackedBalanceMock
    userERC1155Contract = await ownerERC1155Contract.connect(userSigner) as Erc1155PackedBalanceMock

    // Deploy Kittyswaps factory
    kittyswapsFactoryContract = await kittyswapsFactoryAbstract.deploy(ownerWallet) as KittyswapsFactory
  })

  describe('Getter functions', () => {
    describe('getExchange() function', () => {
      let exchangeAddress: string;

      beforeEach(async () => {
        // Create exchange contract for the ERC-1155 token
        await kittyswapsFactoryContract.functions.createExchange(
          ownerERC1155Contract.address, 
          ownerBaseTokenContract.address, 
          baseTokenID
        )
        
        // Retrieve exchange address
        exchangeAddress = (await kittyswapsFactoryContract.functions.tokensToExchange(ownerERC1155Contract.address, ownerBaseTokenContract.address, baseTokenID))[0]
      })

      it('should return exchange address', async () => {
        const exchange_address = await kittyswapsFactoryContract.functions.tokensToExchange(ownerERC1155Contract.address, ownerBaseTokenContract.address, baseTokenID)
        await expect(exchange_address[0]).to.be.eql(exchangeAddress)
      })
    })
  })

  describe('createExchange() function', () => {

    beforeEach(async () => {
    })

    it('should REVERT if Token is 0x0', async () => {
      const tx = kittyswapsFactoryContract.functions.createExchange(
        ZERO_ADDRESS, 
        ownerBaseTokenContract.address, 
        baseTokenID
      )
      await expect(tx).to.be.rejectedWith(RevertError("KittyswapsExchange#constructor:INVALID_INPUT"));
    })

    it('should REVERT if Base Token is 0x0', async () => {
      const tx = kittyswapsFactoryContract.functions.createExchange(
        ownerERC1155Contract.address, 
        ZERO_ADDRESS, 
        baseTokenID
      )
      await expect(tx).to.be.rejectedWith(RevertError("KittyswapsExchange#constructor:INVALID_INPUT"));
    })

    it("should PASS if exchange doesn't exist yet", async () => {
      const tx = kittyswapsFactoryContract.functions.createExchange(
        ownerERC1155Contract.address, 
        ownerBaseTokenContract.address, 
        baseTokenID
      )
      await expect(tx).to.be.fulfilled;
    })

    it("should PASS if creating an exchange with a new base ID", async () => {
      const tx = kittyswapsFactoryContract.functions.createExchange(
        ownerERC1155Contract.address, 
        ownerBaseTokenContract.address, 
        baseTokenID + 1
      )
      await expect(tx).to.be.fulfilled;
    })

    it("should PASS if creating an exchange with a new base currency contract", async () => {
      const tx = kittyswapsFactoryContract.functions.createExchange(
        ownerERC1155Contract.address, 
        userAddress, 
        baseTokenID
      )
      await expect(tx).to.be.fulfilled;
    })

    it("should PASS if creating an exchange with both token contract being the same", async () => {
      const tx = kittyswapsFactoryContract.functions.createExchange(
        ownerERC1155Contract.address, 
        ownerERC1155Contract.address, 
        baseTokenID
      )
      await expect(tx).to.be.fulfilled;
    })

    context('When successful transfer', () => {
      let tx: ethers.ContractTransaction
      let exchangeAddress: string

      beforeEach(async () => {
        tx = await kittyswapsFactoryContract.functions.createExchange(
          ownerERC1155Contract.address, 
          ownerBaseTokenContract.address, 
          baseTokenID
        )

        // Retrieve exchange address
        exchangeAddress = (await kittyswapsFactoryContract.functions.tokensToExchange(ownerERC1155Contract.address, ownerBaseTokenContract.address, baseTokenID))[0]
      })

      it("should REVERT if creating an existing exchange", async () => {
        const tx = kittyswapsFactoryContract.functions.createExchange(
          ownerERC1155Contract.address, 
          ownerBaseTokenContract.address, 
          baseTokenID
        )
        await expect(tx).to.be.rejectedWith(RevertError("KittyswapsFactory#createExchange: EXCHANGE_ALREADY_CREATED"));
      })

      it('should emit NewExchange event', async () => {
        const receipt = await tx.wait(1)
        const ev = receipt.events!.pop()!
        expect(ev.event).to.be.eql('NewExchange')
      })

      describe('NewExchange Event', async () => {
        let args

        beforeEach(async () => {
          const receipt = await tx.wait(1)
          const ev = receipt.events!.pop()!
          args = ev.args! as any
        })

        it('should have token address as `token` field', async () => {
          expect(args.token).to.be.eql(ownerERC1155Contract.address)
        })


        it('should have Base Token address as `currency` field', async () => {
          expect(args.currency).to.be.eql(ownerBaseTokenContract.address)
        })


        it('should have base token ID as `currencyID` field', async () => {
          expect(args.currencyID).to.be.eql(BigNumber.from(baseTokenID))
        })


        it('should have the exchange contract address as `exchange` field', async () => {
          expect(args.exchange).to.be.eql(exchangeAddress)
        })

      })

    })

  })
})
