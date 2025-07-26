'use client'

import { useState } from 'react'
import InputField from "@/components/ui/InputField"

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState('')
  const [recipients, setRecipients] = useState('')
  const [amounts, setAmounts] = useState('')

  async function handleSubmit() {
    console.log('handleSubmit')
    console.log('tokenAddress', tokenAddress)
    console.log('recipients', recipients)
    console.log('amounts', amounts)
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

      <button onClick={handleSubmit}>Set Tokens</button>
    </div>
  )
}