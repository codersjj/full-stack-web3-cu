import {
  createWalletClient,
  custom,
  createPublicClient,
  parseEther,
  defineChain,
  formatEther,
} from 'https://esm.sh/viem'
import { contractAddress, abi as coffeeABI } from './constants-js.js'

const connectButton = document.getElementById('connectButton')
const fundButton = document.getElementById('fundButton')
const ethAmountInput = document.getElementById('ethAmount')
const balanceButton = document.getElementById('balanceButton')
const withdrawButton = document.getElementById('withdrawButton')
const getAmountFundedButton = document.getElementById('getAmountFundedButton')

async function connect() {
  if (typeof window.ethereum === 'undefined') {
    connectButton.innerHTML = 'Please install MetaMask'
  } else {
    const walletClient = createWalletClient({
      transport: custom(window.ethereum),
    })

    await walletClient.requestAddresses()
    connectButton.innerHTML = 'Connected'
  }
}

async function fund() {
  const amount = ethAmountInput.value
  console.log(`Funding with ${amount} ETH...`)

  if (typeof window.ethereum === 'undefined') {
    connectButton.innerHTML = 'Please install MetaMask'
  } else {
    const walletClient = createWalletClient({
      transport: custom(window.ethereum),
    })
    const [connectedAccount] = await walletClient.requestAddresses()

    const publicClient = createPublicClient({
      transport: custom(window.ethereum),
    })
    console.log('parseEther(amount):', parseEther(amount))

    const currentChain = await getCurrentChain(walletClient)

    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: coffeeABI,
      functionName: 'fund',
      account: connectedAccount,
      chain: currentChain,
      value: parseEther(amount), // 1 -> 1e18
    })
    console.log('🚀 ~ fund ~ request:', request)

    const hash = await walletClient.writeContract(request)
    console.log('Transaction hash:', hash)
  }
}

async function withdraw() {
  console.log('Withdrawing funds...')

  if (typeof window.ethereum === 'undefined') {
    connectButton.innerHTML = 'Please install MetaMask'
  } else {
    const walletClient = createWalletClient({
      transport: custom(window.ethereum),
    })
    const [connectedAccount] = await walletClient.requestAddresses()

    const publicClient = createPublicClient({
      transport: custom(window.ethereum),
    })

    const currentChain = await getCurrentChain(walletClient)

    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: coffeeABI,
      functionName: 'withdraw',
      account: connectedAccount,
      chain: currentChain,
      // No value needed for withdrawal
    })
    console.log('🚀 ~ withdraw ~ request:', request)

    const hash = await walletClient.writeContract(request)
    console.log('Transaction hash:', hash)
  }
}

async function getCurrentChain(client) {
  const chainId = await client.getChainId()
  console.log('Current chain ID:', chainId)
  const currentChain = defineChain({
    id: chainId,
    name: 'Custom Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['http://localhost:8545'],
      },
    },
  })

  return currentChain
}

async function getBalance() {
  if (typeof window.ethereum === 'undefined') {
    connectButton.innerHTML = 'Please install MetaMask'
  } else {
    const publicClient = createPublicClient({
      transport: custom(window.ethereum),
    })

    const balance = await publicClient.getBalance({
      address: contractAddress,
    })
    console.log('Balance:', formatEther(balance)) // 1e18 -> 1
  }
}

async function getAddressToAmountFunded() {
  if (typeof window.ethereum === 'undefined') {
    connectButton.innerHTML = 'Please install MetaMask'
  } else {
    const publicClient = createPublicClient({
      transport: custom(window.ethereum),
    })

    const currentChain = await getCurrentChain(publicClient)

    const walletClient = createWalletClient({
      transport: custom(window.ethereum),
    })
    const [connectedAccount] = await walletClient.requestAddresses()

    const addressToAmountFunded = await publicClient.readContract({
      address: contractAddress,
      abi: coffeeABI,
      functionName: 'getAddressToAmountFunded',
      args: [connectedAccount], // Replace with the actual address you want to check
      chain: currentChain,
    })
    console.log('Address to Amount Funded:', addressToAmountFunded)
  }
}

connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw
getAmountFundedButton.onclick = getAddressToAmountFunded
