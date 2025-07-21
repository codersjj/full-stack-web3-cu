import {
  createWalletClient,
  custom,
  createPublicClient,
  parseEther,
  defineChain,
  formatEther,
  WalletClient,
  PublicClient,
  Chain,
  Address,
} from 'viem'
import 'viem/window'
import { contractAddress, abi as coffeeABI } from './constants-ts'

// Assert element types
const connectButton = document.getElementById(
  'connectButton'
) as HTMLButtonElement
const fundButton = document.getElementById('fundButton') as HTMLButtonElement
const ethAmountInput = document.getElementById('ethAmount') as HTMLInputElement
const balanceButton = document.getElementById(
  'balanceButton'
) as HTMLButtonElement
const withdrawButton = document.getElementById(
  'withdrawButton'
) as HTMLButtonElement

console.log('HI!!!')

async function connect(): Promise<void> {
  if (typeof window.ethereum === 'undefined') {
    connectButton.innerHTML = 'Please install MetaMask'
    return
  }

  const walletClient: WalletClient = createWalletClient({
    transport: custom(window.ethereum),
  })

  await walletClient.requestAddresses()
  connectButton.innerHTML = 'Connected'
}

async function fund(): Promise<void> {
  const amount: string = ethAmountInput.value
  console.log(`Funding with ${amount} ETH...`)

  if (typeof window.ethereum === 'undefined') {
    connectButton.innerHTML = 'Please install MetaMask'
    return
  }

  const walletClient: WalletClient = createWalletClient({
    transport: custom(window.ethereum),
  })
  const [connectedAccount]: Address[] = await walletClient.requestAddresses()

  const publicClient: PublicClient = createPublicClient({
    transport: custom(window.ethereum),
  })

  console.log('parseEther(amount):', parseEther(amount))

  const currentChain: Chain = await getCurrentChain(walletClient)

  const { request } = await publicClient.simulateContract({
    address: contractAddress,
    abi: coffeeABI,
    functionName: 'fund',
    account: connectedAccount,
    chain: currentChain,
    value: parseEther(amount),
  })
  console.log('🚀 ~ fund ~ request:', request)

  const hash: Address = await walletClient.writeContract(request)
  console.log('Transaction hash:', hash)
}

async function withdraw(): Promise<void> {
  console.log('Withdrawing funds...')

  if (typeof window.ethereum === 'undefined') {
    connectButton.innerHTML = 'Please install MetaMask'
    return
  }

  const walletClient: WalletClient = createWalletClient({
    transport: custom(window.ethereum),
  })
  const [connectedAccount]: Address[] = await walletClient.requestAddresses()

  const publicClient: PublicClient = createPublicClient({
    transport: custom(window.ethereum),
  })

  const currentChain: Chain = await getCurrentChain(walletClient)

  const { request } = await publicClient.simulateContract({
    address: contractAddress,
    abi: coffeeABI,
    functionName: 'withdraw',
    account: connectedAccount,
    chain: currentChain,
  })
  console.log('🚀 ~ withdraw ~ request:', request)

  const hash: Address = await walletClient.writeContract(request)
  console.log('Transaction hash:', hash)
}

async function getCurrentChain(client: WalletClient): Promise<Chain> {
  const chainId: number = await client.getChainId()
  console.log('Current chain ID:', chainId)

  const currentChain: Chain = defineChain({
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

async function getBalance(): Promise<void> {
  if (typeof window.ethereum === 'undefined') {
    connectButton.innerHTML = 'Please install MetaMask'
    return
  }

  const publicClient: PublicClient = createPublicClient({
    transport: custom(window.ethereum),
  })

  const balance: bigint = await publicClient.getBalance({
    address: contractAddress,
  })
  console.log('Balance:', formatEther(balance))
}

// Event listeners
connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw
