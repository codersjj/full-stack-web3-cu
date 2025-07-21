# What are we making?

- Minimal HTML/JS site
- That has the following button which map to the solidity smart contract:
  - Connect✅
  - Buy coffee✅
    - Button to buy coffee✅
    - Call a function on a smart contract✅
    - Have a test blockchain that we can call?✅
  - Get Balance✅
  - Withdraw✅
  - TypeScript✅

## Get Started

```bash
anvil --load-state fundme-anvil.json
```

## Examples of working with AI

### Example 1

Here is my product spec:

```
# What are we making?

- Minimal HTML/JS site
- That has the following button which map to the solidity smart contract:
  - Connect
  - Buy coffee
  - Get Balance
  - Withdraw
```

Could you please make me a basic HTML template with this?

### Example 2

Here is the code to call the `fund` function on a smart contract from my website.

Can you please use this as a template to create a `withdraw` function, that calls the `withdraw` function, it should send 0 value.

```
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
```
