const { ethers } = require('ethers')
const { abi: UniswapV3PoolABI } = require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json')
const { abi: SwapRouterABI} = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json')
const { getPoolImmutables, getPoolState } = require('./helpers')
const ERC20ABI = require('./abi.json')

require('dotenv').config()
const CHAIN_BASE_URL = process.env.CHAIN_BASE_URL
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

const provider = new ethers.providers.JsonRpcProvider(INFURA_URL_TESTNET) // Conexão com a bASE CHAIN
const poolAddress = process.env.POOL_ADDRESS_BASETH_ETH // Pool BASE ETH -> ETH
const swapRouterAddress = process.env.ROUTER_ADDRESS_BASE // Router Swap 02 

const name0 = 'BASE ETH'
const symbol0 = 'BETH'
const decimals0 = 18
const address0 = process.env.TOKEN0_ADDRESS

const name1 = 'USD COIN'
const symbol1 = 'USDC'
const decimals1 = 6
const address1 = process.env.TOKEN1_ADDRESS

async function executeTrade() {
  const poolContract = new ethers.Contract(
    poolAddress,
    UniswapV3PoolABI,
    provider
  )

  const immutables = await getPoolImmutables(poolContract)
  const state = await getPoolState(poolContract)

  const wallet = new ethers.Wallet(WALLET_SECRET)
  const connectedWallet = wallet.connect(provider)

  const swapRouterContract = new ethers.Contract(
    swapRouterAddress,
    SwapRouterABI,
    provider
  )

  const inputAmount = 0.001
  const amountIn = ethers.utils.parseUnits(
    inputAmount.toString(),
    decimals0
  )

  const approvalAmount = (amountIn * 100000).toString()
  const tokenContract0 = new ethers.Contract(
    address0,
    ERC20ABI,
    provider
  )
  const approvalResponse = await tokenContract0.connect(connectedWallet).approve(
    swapRouterAddress,
    approvalAmount
  )

  const tradeParams = {
    tokenIn: immutables.token1,
    tokenOut: immutables.token0,
    fee: immutables.fee,
    recipient: WALLET_ADDRESS,
    deadline: Math.floor(Date.now() / 1000) + (60 * 10),
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  }

  const transaction = swapRouterContract.connect(connectedWallet).exactInputSingle(
    tradeParams,
    {
      gasLimit: ethers.utils.hexlify(1000000)
    }
  ).then(transaction => {
    console.log(transaction)
  })
}

executeTrade()
