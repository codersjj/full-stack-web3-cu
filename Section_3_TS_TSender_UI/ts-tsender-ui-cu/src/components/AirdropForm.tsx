'use client'

import { useMemo, useState } from 'react'
import { useChainId, useConfig, useAccount } from 'wagmi'
import { readContract } from '@wagmi/core'
import InputField from "@/components/ui/InputField"
import { chainsToTSender, erc20Abi, tsenderAbi } from '@/constants'
import { calculateTotal } from '@/utils'

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState('')
  const [recipients, setRecipients] = useState('')
  const [amounts, setAmounts] = useState('')
  const chainId = useChainId()
  const config = useConfig()
  const account = useAccount()
  const total: number = useMemo(() => {
    const res = calculateTotal(amounts)
    console.log("🚀 ~ AirdropForm ~ res:", res)
    return res
  }, [amounts])

  async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
    if (!tSenderAddress) {
      alert('No address found, please use a supported chain')
      return 0
    }

    // read from the chain to see if we have approved enough tokens
    // allowance
    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: 'allowance',
      args: [account.address, tSenderAddress]
    })
    // like token.allowance(account, tsender)

    return response as number
  }

  async function handleSubmit() {
    // 1a. If already approved, moved to step 2
    // 1b. Approve our tsender contract to send our tokens
    // 2. Call the airdrop function on the tsender contract
    // 3. Wait for the transaction to be mined

    const tSenderAddress = chainsToTSender[chainId].tsender
    console.log('chainId', chainId)
    console.log("🚀 ~ handleSubmit ~ tSenderAddress:", tSenderAddress)
    const approvedAmount = await getApprovedAmount(tSenderAddress)
    console.log("🚀 ~ handleSubmit ~ approvedAmount:", approvedAmount)

    // if (result < totalAmountNeed...)
  }

  return (
    <div>
      <InputField
        label="Token Address"
        placeholder="0x"
        value={tokenAddress}
        onChange={e => setTokenAddress(e.target.value)}
      />
      <InputField
        label="Recipients"
        placeholder='0x123..., 0x456...'
        value={recipients}
        onChange={e => setRecipients(e.target.value)}
        large
      />
      <InputField
        label="Amounts"
        placeholder='100, 200, 300...'
        value={amounts}
        onChange={e => setAmounts(e.target.value)}
        large
      />

      <button
        onClick={handleSubmit}
        className="
          px-6 py-3 
          bg-blue-500 hover:bg-blue-600 
          text-white font-medium 
          rounded-lg 
          transition-all duration-200 
          shadow-md hover:shadow-lg 
          transform hover:-translate-y-0.5 
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
          active:translate-y-0
        "
      >
        Set Tokens
      </button>
    </div>
  )
}