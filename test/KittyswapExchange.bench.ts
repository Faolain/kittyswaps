import * as ethers from 'ethers'

import { 
  AbstractContract, 
  expect, 
  BigNumber, 
  RevertError,
  BuyTokensType,
  SellTokensType,
  getBuyTokenData,
  getSellTokenData,
  getAddLiquidityData,
  methodsSignature
} from './utils'

import * as utils from './utils'

import { Erc1155Mock } from '../typings/contracts/Erc1155Mock'
import { Erc1155PackedBalanceMock } from '../typings/contracts/Erc1155PackedBalanceMock'
import { KittyswapsExchange } from '../typings/contracts/KittyswapsExchange'
import { KittyswapsFactory } from '../typings/contracts/KittyswapsFactory'
//@ts-ignore
import { abi as exchangeABI } from '../artifacts/KittyswapsExchange.json'
import { web3 } from '@nomiclabs/buidler'

// init test wallets from package.json mnemonic

const {
  wallet: ownerWallet,
  provider: ownerProvider,
  signer: ownerSigner
} = utils.createTestWallet(web3, 0)

const {
  wallet: userWallet,
  provider: userProvider,
  signer: userSigner
} = utils.createTestWallet(web3, 2)

const {
  wallet: operatorWallet,
  provider: operatorProvider,
  signer: operatorSigner
} = utils.createTestWallet(web3, 4)

const getBig = (id: number) => BigNumber.from(id);

describe('KittyswapsExchange', () => {
  const MAXVAL = BigNumber.from(2).pow(256).sub(1) // 2**256 - 1
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

  let ownerAddress: string
  let userAddress: string
  let operatorAddress: string
  let erc1155Abstract: AbstractContract
  let erc1155PackedAbstract: AbstractContract
  let kittyswapsFactoryAbstract: AbstractContract
  let kittyswapsExchangeAbstract: AbstractContract
  let operatorAbstract: AbstractContract

  // ERC-1155 token
  let ownerERC1155Contract: Erc1155PackedBalanceMock
  let userERC1155Contract: Erc1155PackedBalanceMock
  let operatorERC1155Contract: Erc1155PackedBalanceMock

  // Currency
  let ownerCurrencyContract: Erc1155Mock
  let userCurrencyContract: Erc1155Mock
  let operatorCurrencyContract: Erc1155Mock


  let kittyswapsFactoryContract: KittyswapsFactory
  let kittyswapsExchangeContract: KittyswapsExchange

  // Token Param
  const nTokenTypes    = 400 //560
  const nTokensPerType = 500000

  // Currency Param
  const currencyID = 2;
  const currencyAmount = BigNumber.from(10000000).mul(BigNumber.from(10).pow(18))

  const types = new Array(nTokenTypes).fill('').map((a, i) => getBig(i))
  const values = new Array(nTokenTypes).fill('').map((a, i) => nTokensPerType)

  // load contract abi and deploy to test server
  beforeEach(async () => {
    ownerAddress = await ownerWallet.getAddress()
    userAddress = await userWallet.getAddress()
    operatorAddress = await operatorWallet.getAddress()
    erc1155Abstract = await AbstractContract.fromArtifactName('ERC1155Mock')
    erc1155PackedAbstract = await AbstractContract.fromArtifactName('ERC1155PackedBalanceMock')
    kittyswapsFactoryAbstract = await AbstractContract.fromArtifactName('KittyswapsFactory')
    kittyswapsExchangeAbstract = await AbstractContract.fromArtifactName('KittyswapsExchange')
  })

  // deploy before each test, to reset state of contract
  beforeEach(async () => {
    // Deploy currency contract
    ownerCurrencyContract = await erc1155Abstract.deploy(ownerWallet) as Erc1155Mock
    userCurrencyContract = await ownerCurrencyContract.connect(userSigner) as Erc1155Mock
    operatorCurrencyContract = await ownerCurrencyContract.connect(operatorSigner) as Erc1155Mock

    // Deploy ERC-1155
    ownerERC1155Contract = await erc1155PackedAbstract.deploy(ownerWallet) as Erc1155PackedBalanceMock
    operatorERC1155Contract = await ownerERC1155Contract.connect(operatorSigner) as Erc1155PackedBalanceMock
    userERC1155Contract = await ownerERC1155Contract.connect(userSigner) as Erc1155PackedBalanceMock
    
    // Deploy Kittyswaps factory
    kittyswapsFactoryContract = await kittyswapsFactoryAbstract.deploy(ownerWallet) as KittyswapsFactory

    // Create exchange contract for the ERC-1155 token
    await kittyswapsFactoryContract.functions.createExchange(
      ownerERC1155Contract.address, 
      ownerCurrencyContract.address, 
      currencyID
    )
    const exchangeAddress = (await kittyswapsFactoryContract.functions.tokensToExchange(ownerERC1155Contract.address, ownerCurrencyContract.address, currencyID))[0]
    
    // Type exchange contract
    kittyswapsExchangeContract = new ethers.Contract(exchangeAddress, exchangeABI, ownerProvider) as KittyswapsExchange
  
    // Mint Token to owner and user
    await ownerERC1155Contract.functions.batchMintMock(operatorAddress, types, values, [])
    await ownerERC1155Contract.functions.batchMintMock(userAddress, types, values, [])

    // Mint currency to owner and user
    await ownerCurrencyContract.functions.mintMock(operatorAddress, currencyID, currencyAmount, [])
    await ownerCurrencyContract.functions.mintMock(userAddress, currencyID, currencyAmount, [])

    // Authorize Kittyswaps to transfer funds on your behalf for addLiquidity & transfers
    await operatorCurrencyContract.functions.setApprovalForAll(kittyswapsExchangeContract.address, true)
    await operatorERC1155Contract.functions.setApprovalForAll(kittyswapsExchangeContract.address, true)
    await userCurrencyContract.functions.setApprovalForAll(kittyswapsExchangeContract.address, true)
    await userERC1155Contract.functions.setApprovalForAll(kittyswapsExchangeContract.address, true)
  })

  describe('_tokenToCurrency() function', () => {

    //Liquidity
    let tokenAmountToAdd = BigNumber.from(10);
    let currencyAmountToAdd = BigNumber.from(10).pow(18)
    let currencyAmountsToAdd: ethers.BigNumber[] = []
    let tokenAmountsToAdd: ethers.BigNumber[] = []
    let addLiquidityData: string;

    //Sell
    let tokenAmountToSell = BigNumber.from(50)
    let tokensAmountsToSell: ethers.BigNumber[] = []
    let sellTokenData: string;

    for (let i = 0; i < nTokenTypes; i++) {
      currencyAmountsToAdd.push(currencyAmountToAdd)
      tokenAmountsToAdd.push(tokenAmountToAdd)
      tokensAmountsToSell.push(tokenAmountToSell)
    }
    addLiquidityData = getAddLiquidityData(currencyAmountsToAdd, 10000000)    

    beforeEach(async () => {
      // Add liquidity
      await operatorERC1155Contract.functions.safeBatchTransferFrom(operatorAddress, kittyswapsExchangeContract.address, types, tokenAmountsToAdd, addLiquidityData,
        {gasLimit: 30000000}
      )
      
      // Sell
      const price = (await kittyswapsExchangeContract.functions.getPrice_tokenToCurrency([0], [tokenAmountToSell]))[0];
      sellTokenData = getSellTokenData(userAddress, price[0].mul(nTokenTypes), 10000000)
    })

    it('sell 1 tokens should pass', async () => {
      const nTokens = 1      
      const price = (await kittyswapsExchangeContract.functions.getPrice_tokenToCurrency([0], [tokenAmountToSell]))[0];

      sellTokenData = getSellTokenData(userAddress, price[0].mul(nTokens), 10000000)

      let tokensSoldIDs = new Array(nTokens).fill('').map((a, i) => getBig(i))
      let tokensSoldAmounts = new Array(nTokens).fill('').map((a, i) => tokenAmountToSell)
      
      const tx = userERC1155Contract.functions.safeBatchTransferFrom(userAddress, kittyswapsExchangeContract.address, tokensSoldIDs, tokensSoldAmounts, sellTokenData,
        {gasLimit: 8000000}
      )
      await expect(tx).to.be.fulfilled
    })

    it('sell 5 tokens should pass', async () => {
      const nTokens = 5      
      const price = (await kittyswapsExchangeContract.functions.getPrice_tokenToCurrency([0], [tokenAmountToSell]))[0];
      sellTokenData = getSellTokenData(userAddress, price[0].mul(nTokens), 10000000)

      let tokensSoldIDs = new Array(nTokens).fill('').map((a, i) => getBig(i))
      let tokensSoldAmounts = new Array(nTokens).fill('').map((a, i) => tokenAmountToSell)
      
      const tx = userERC1155Contract.functions.safeBatchTransferFrom(userAddress, kittyswapsExchangeContract.address, tokensSoldIDs, tokensSoldAmounts, sellTokenData,
        {gasLimit: 8000000}
      )
      await expect(tx).to.be.fulfilled
    })

    it('sell 30 tokens should pass', async () => {
      const nTokens = 30
      
      const price = (await kittyswapsExchangeContract.functions.getPrice_tokenToCurrency([0], [tokenAmountToSell]))[0]
      sellTokenData = getSellTokenData(userAddress, price[0].mul(nTokens), 10000000)

      let tokensSoldIDs = new Array(nTokens).fill('').map((a, i) => getBig(i))
      let tokensSoldAmounts = new Array(nTokens).fill('').map((a, i) => tokenAmountToSell)
      
      const tx = userERC1155Contract.functions.safeBatchTransferFrom(userAddress, kittyswapsExchangeContract.address, tokensSoldIDs, tokensSoldAmounts, sellTokenData,
        {gasLimit: 8000000}
      )
      await expect(tx).to.be.fulfilled
    })


    it('sell 80 tokens should pass', async () => {
      const nTokens = 80
      
      const price = (await kittyswapsExchangeContract.functions.getPrice_tokenToCurrency([0], [tokenAmountToSell]))[0];
      sellTokenData = getSellTokenData(userAddress, price[0].mul(nTokens), 10000000)

      let tokensSoldIDs = new Array(nTokens).fill('').map((a, i) => getBig(i))
      let tokensSoldAmounts = new Array(nTokens).fill('').map((a, i) => tokenAmountToSell)
      
      const tx = userERC1155Contract.functions.safeBatchTransferFrom(userAddress, kittyswapsExchangeContract.address, tokensSoldIDs, tokensSoldAmounts, sellTokenData,
        {gasLimit: 8000000}
      )
      await expect(tx).to.be.fulfilled
    })

    it('sell 400 tokens should pass', async () => {
      const nTokens = 400
      
      const price = (await kittyswapsExchangeContract.functions.getPrice_tokenToCurrency([0], [tokenAmountToSell]))[0];
      sellTokenData = getSellTokenData(userAddress, price[0].mul(nTokens), 10000000)

      let tokensSoldIDs = new Array(nTokens).fill('').map((a, i) => getBig(i))
      let tokensSoldAmounts = new Array(nTokens).fill('').map((a, i) => tokenAmountToSell)
      
      const tx = userERC1155Contract.functions.safeBatchTransferFrom(userAddress, kittyswapsExchangeContract.address, tokensSoldIDs, tokensSoldAmounts, sellTokenData,
        {gasLimit: 8000000}
      )
      await expect(tx).to.be.fulfilled
    })

  })

  describe('_currencyToToken() function', () => {

    //Liquidity
    let tokenAmountToAdd = BigNumber.from(500);
    let currencyAmountToAdd = BigNumber.from(10).pow(18).mul(500)
    let currencyAmountsToAdd: ethers.BigNumber[] = []
    let tokenAmountsToAdd: ethers.BigNumber[] = []
    let addLiquidityData: string;

    //Buy
    let tokenAmountToBuy = BigNumber.from(50)
    let tokensAmountsToBuy: ethers.BigNumber[] = []
    let buyTokenData: string;
    let cost: ethers.BigNumber

    for (let i = 0; i < nTokenTypes; i++) {
      currencyAmountsToAdd.push(currencyAmountToAdd)
      tokenAmountsToAdd.push(tokenAmountToAdd)
      tokensAmountsToBuy.push(tokenAmountToBuy)
    }
    addLiquidityData = getAddLiquidityData(currencyAmountsToAdd, 10000000)

    beforeEach(async () => {
      // Add liquidity
      await operatorERC1155Contract.functions.safeBatchTransferFrom(operatorAddress, kittyswapsExchangeContract.address, types, tokenAmountsToAdd, addLiquidityData,
        {gasLimit: 30000000}
      )

      // Sell
      cost = (await kittyswapsExchangeContract.functions.getPrice_currencyToToken([0], [tokenAmountToBuy]))[0][0];
      cost = cost.mul(nTokenTypes)
      buyTokenData = getBuyTokenData(userAddress, types, tokensAmountsToBuy, 10000000)
    })

    it('buy 1 tokens should pass', async () => {
      cost = cost.div(nTokenTypes).mul(1)
      buyTokenData = getBuyTokenData(userAddress, [1], [BigNumber.from(1)], 10000000)
      
      const tx = userCurrencyContract.functions.safeTransferFrom(userAddress, kittyswapsExchangeContract.address, currencyID, cost, buyTokenData,
        {gasLimit: 8000000}
      )
      await expect(tx).to.be.fulfilled
    })

    it('buy 5 tokens should pass', async () => {
      cost = cost.div(nTokenTypes).mul(5)

      buyTokenData = getBuyTokenData(
        userAddress, 
        new Array(5).fill('').map((a, i) => getBig(i)), 
        new Array(5).fill('').map((a, i) => getBig(1)), 
        10000000
      )

      const tx = userCurrencyContract.functions.safeTransferFrom(userAddress, kittyswapsExchangeContract.address, currencyID, cost, buyTokenData,
        {gasLimit: 8000000}
      )
      await expect(tx).to.be.fulfilled
    })

    it('buy 30 tokens should pass', async () => {
      cost = cost.div(nTokenTypes).mul(30)
      buyTokenData = getBuyTokenData(
        userAddress, 
        new Array(30).fill('').map((a, i) => getBig(i)), 
        new Array(30).fill('').map((a, i) => getBig(1)), 
        10000000
      )

      const tx = userCurrencyContract.functions.safeTransferFrom(userAddress, kittyswapsExchangeContract.address, currencyID, cost, buyTokenData,
        {gasLimit: 8000000}
      )
      await expect(tx).to.be.fulfilled
    })


    it('buy 80 tokens should pass', async () => {
      cost = cost.div(nTokenTypes).mul(80)
      buyTokenData = getBuyTokenData(
        userAddress, 
        new Array(80).fill('').map((a, i) => getBig(i)), 
        new Array(80).fill('').map((a, i) => getBig(1)), 
        10000000
      )

      const tx = userCurrencyContract.functions.safeTransferFrom(userAddress, kittyswapsExchangeContract.address, currencyID, cost, buyTokenData,
        {gasLimit: 8000000}
      )
      await expect(tx).to.be.fulfilled
    })

    it('buy 400 tokens should pass', async () => {
      cost = cost.div(nTokenTypes).mul(400)
      buyTokenData = getBuyTokenData(
        userAddress, 
        new Array(400).fill('').map((a, i) => getBig(i)), 
        new Array(400).fill('').map((a, i) => getBig(1)), 
        10000000
      )

      const tx = userCurrencyContract.functions.safeTransferFrom(userAddress, kittyswapsExchangeContract.address, currencyID, cost, buyTokenData,
        {gasLimit: 8000000}
      )
      await expect(tx).to.be.fulfilled
    })

  })


})
