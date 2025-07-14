import {
  createWalletClient,
  custom,
  createPublicClient,
} from 'https://esm.sh/viem'

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
    await walletClient.requestAddresses()

    const publicClient = createPublicClient({
      transport: custom(window.ethereum),
    })
    // await publicClient.simulateContract({
    //   // address: ???
    // })
  }
}

connectButton.onclick = connect
fundButton.onclick = fund
