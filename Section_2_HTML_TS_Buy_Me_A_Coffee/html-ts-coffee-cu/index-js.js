import { createWalletClient, custom } from 'https://esm.sh/viem'

const connectButton = document.getElementById('connectButton')

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

connectButton.onclick = connect
