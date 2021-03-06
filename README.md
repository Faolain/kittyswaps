Kittyswaps
=========
Uniswap for ERC-1155.  

*We are incredibly thankful for the work done by the Uniswap team, without which Kittyswaps wouldn't exists.*

# Description

Kittyswaps is a fork of [Uniswap](<https://hackmd.io/@477aQ9OrQTCbVR3fq1Qzxg/HJ9jLsfTz?type=view>), a protocol for automated token exchange on Ethereum. While Uniswap is for trading [ERC-20](<https://eips.ethereum.org/EIPS/eip-20>) tokens, Kittyswaps is a protocol for [ERC-1155](<https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md>) tokens. Both are designed to favor ease of use and provide guaranteed access to liquidity on-chain. 

Most exchanges maintain an order book and facilitate matches between buyers and sellers. Kittyswaps smart contracts hold liquidity reserves of various tokens, and trades are executed directly against these reserves. Prices are set automatically using the [constant product](https://ethresear.ch/t/improving-front-running-resistance-of-x-y-k-market-makers/1281)  $x*y = K$ market maker mechanism, which keeps overall reserves in relative equilibrium. Reserves are pooled between a network of liquidity providers who supply the system with tokens in exchange for a proportional share of transaction fees. 

An important feature of Nitfyswap is the utilization of a factory/registry contract that deploys a separate exchange contract for each ERC-1155 token contract. These exchange contracts each hold independent reserves of a single fungible ERC-1155 currency and their associated ERC-1155 token id. This allows trades between the [Currency](#currency) and the ERC-1155 tokens based on the relative supplies. 

For more details, see [Specification.md](https://github.com/kittyswaps/kittyswaps/blob/master/SPECIFICATIONS.md)

# Differences with Uniswap
There are some differences compared to the original Uniswap that we would like to outline below:

1. For ERC-1155 tokens, not ERC-20s
2. Base currency is not ETH, but needs to be an ERC-1155
3. Liquidity fee is 0.5% instead of 0.3%
4. All fees are taken from base currency (Uniswap takes trading fees on both sides). This will lead to some small inneficiencies which will be corrected via arbitrage.
4. Users do not need to set approvals before their first trade
5. 100% native meta-tx friendly for ERC-1155 implementations with native meta-tx functionalities
6. Front-end implementations can add arbitrary fee (in addition to the 0.5%) for tokens with native meta-transactions.
7. Less functions than Uniswap

There are pros and cons to these differences and we welcome you to discuss these by openning issues in this repository.

## Contracts

[KittyswapsExchange.sol](https://github.com/kittyswaps/kittyswaps/blob/master/contracts/exchange/KittyswapsExchange.sol): The exchange contract that handles the logic for exchanging assets for a given base token.
[KittyswapsFactory.sol](https://github.com/kittyswaps/kittyswaps/blob/master/contracts/exchange/KittyswapsFactory.sol): The exchange factory that allows the creation of nifyswap exchanges for the tokens of a given ERC-1155 token conract and an ERC-1155 base currency.

# Usage

## Dependencies
1. Install node v11, 
2. Install yarn : `npm install -g yarn`
3. Install Truffle npm package: `npm install truffle` or `yarn add truffle`
2. Install the multi-token-standard npm package `npm install kittyswaps` or `yarn add kittyswaps` 

## Dev / running the tests
1. `yarn install`
2. `yarn build`
3. `yarn ganache`
4. in another terminal run, `yarn test` - executes test suite


