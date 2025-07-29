'use client'

import { useMemo, useState, useEffect } from 'react'
import { useChainId, useConfig, useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContracts } from 'wagmi'
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { CgSpinner } from 'react-icons/cg'
import InputField from "@/components/ui/InputField"
import { chainsToTSender, erc20Abi, tsenderAbi } from '@/constants'
import { calculateTotal, formatTokenAmount } from '@/utils'

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState('')
  const [recipients, setRecipients] = useState('')
  const [amounts, setAmounts] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasEnoughTokens, setHasEnoughTokens] = useState(true)
  const chainId = useChainId()
  const config = useConfig()
  const account = useAccount()
  const total: number = useMemo(() => {
    const res = calculateTotal(amounts)
    console.log("🚀 ~ AirdropForm ~ res:", res)
    return res
  }, [amounts])
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed, isError } = useWaitForTransactionReceipt({
    hash: hash,
    confirmations: 1
  })
  const {
    data: [tokenNameData, tokenDecimalsData, tokenBalanceOfData] = [undefined, undefined, undefined],
    isLoading: isTokenDataLoading,
    error: tokenDataError
  } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: 'name',
      },
      {
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: 'decimals',
      },
      {
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: 'balanceOf',
        args: [account.address]
      }
    ]
  })

  useEffect(() => {
    const tokenAddress = localStorage.getItem('tokenAddress') ?? ''
    const recipients = localStorage.getItem('recipients') ?? ''
    const amounts = localStorage.getItem('amounts') ?? ''

    setTokenAddress(tokenAddress)
    setRecipients(recipients)
    setAmounts(amounts)

    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('tokenAddress', tokenAddress)
    }
  }, [tokenAddress, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('recipients', recipients)
    }
  }, [recipients, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('amounts', amounts)
    }
  }, [amounts, isInitialized])

  useEffect(() => {
    if (tokenAddress && total > 0 && tokenBalanceOfData?.result) {
      const userBalance = tokenBalanceOfData?.result as number
      setHasEnoughTokens(userBalance >= total)
    } else {
      setHasEnoughTokens(true)
    }
  }, [tokenAddress, tokenBalanceOfData, total])

  function getButtonContent() {
    if (isPending) {
      return (
        <div className='flex justify-center items-center gap-2 w-full'>
          <CgSpinner className='animate-spin' size={20} />
          <span>Confirming in wallet...</span>
        </div>
      )
    }

    if (isConfirming) {
      return (
        <div className="flex justify-center items-center gap-2 w-full">
          <CgSpinner className='animate-spin' size={20} />
          <span>Waiting for transaction to be included...</span>
        </div>
      )
    }

    if (error || isError) {
      console.log(error)
      return (
        <div className="flex justify-center items-center gap-2 w-full">
          <span>Error, see console.</span>
        </div>
      )
    }

    if (isConfirmed) {
      return 'Transaction confirmed.'
    }

    return 'Set Tokens'
  }

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

    if (approvedAmount < total) {
      const approvalHash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: 'approve',
        args: [tSenderAddress, BigInt(total)]
      })

      const approvalReceipt = await waitForTransactionReceipt(config, {
        hash: approvalHash
      })

      console.log('Approval confirmed', approvalReceipt)
    }

    await writeContractAsync({
      abi: tsenderAbi,
      address: tSenderAddress as `0x${string}`,
      functionName: 'airdropERC20',
      args: [
        tokenAddress,
        recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
        amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
        BigInt(total)
      ]
    })
  }

  return (
    <div className='p-4 md:p-6 lg:p-8'>
      <div className='flex flex-col max-w-2xl min-w-full xl:min-w-lg w-full lg:mx-auto space-y-6 p-6 rounded-xl border-2 border-blue-500 ring-[4px] ring-blue-500/25'>
        <InputField
          label="Token Address"
          placeholder="0x"
          value={tokenAddress}
          onChange={e => setTokenAddress(e.target.value)}
        />
        <InputField
          label="Recipients (comma or new line separated)"
          placeholder='0x123..., 0x456...'
          value={recipients}
          onChange={e => setRecipients(e.target.value)}
          large
        />
        <InputField
          label="Amounts (wei; comma or new line separated)"
          placeholder='100, 200, 300...'
          value={amounts}
          onChange={e => setAmounts(e.target.value)}
          large
        />

        {/* Token Details Box */}
        {tokenAddress && (
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">Transaction Details</h3>
            
            {isTokenDataLoading ? (
              <div className="flex items-center text-gray-500">
                <CgSpinner className="animate-spin mr-2" />
                Loading token info...
              </div>
            ) : tokenDataError ? (
              <div className="text-red-500 text-sm">{tokenDataError.message}</div>
            ) : tokenNameData?.result ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-600">Token Name:</span>
                  <span className="font-mono text-zinc-900">{tokenNameData.result as string}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-600">Amount (wei):</span>
                  <span className="font-mono text-zinc-900">{total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-600">Amount (tokens):</span>
                  <span className="font-mono text-zinc-900">
                    {formatTokenAmount(total, tokenDecimalsData.result as number)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                Enter valid ERC-20 token address
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className={`
            relative
            flex justify-center items-center
            px-6 py-3
            cursor-pointer
            bg-blue-500 hover:bg-blue-600 
            text-white font-medium 
            rounded-lg 
            transition-all duration-200 
            shadow-md hover:shadow-lg 
            transform hover:-translate-y-0.5 
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
            active:translate-y-0
            ${!tokenAddress || !hasEnoughTokens ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          disabled={!tokenAddress || !hasEnoughTokens}
        >
          {/* Gradient */}
          <div className="absolute w-full inset-0 bg-gradient-to-b from-white/25 via-80% to-transparent mix-blend-overlay z-10 rounded-lg" />
          {
            isPending || isConfirming || error
              ? getButtonContent()
              : hasEnoughTokens
                ? 'Set Tokens'
                : 'Insufficient token balance'
                
          }
        </button>
      </div>
    </div>
  )
}