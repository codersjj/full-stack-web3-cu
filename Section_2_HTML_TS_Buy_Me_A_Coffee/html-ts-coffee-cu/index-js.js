import {
  createWalletClient,
  custom,
  createPublicClient,
  parseEther,
  defineChain,
} from 'https://esm.sh/viem'
import { contractAddress, abi as coffeeABI } from './constants-js.js'

const connectButton = document.getElementById('connectButton')
const fundButton = document.getElementById('fundButton')
const ethAmountInput = document.getElementById('ethAmount')

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

    const currentChain = getCurrentChain(walletClient)

    const { result } = await publicClient.simulateContract({
      address: contractAddress,
      abi: coffeeABI,
      functionName: 'fund',
      account: connectedAccount,
      chain: currentChain,
      value: parseEther(amount),
    })
    console.log('🚀 ~ fund ~ result:', result)
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

connectButton.onclick = connect
fundButton.onclick = fund
