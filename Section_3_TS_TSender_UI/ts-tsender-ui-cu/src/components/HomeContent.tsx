'use client'

import { useAccount } from 'wagmi';
import AirdropForm from "@/components/AirdropForm";

export default function HomeContent() {
  const { isConnected } = useAccount()
  
  return (
    <div className="home-content">
      {
        isConnected
          ? <AirdropForm />
          : <p className='flex justify-center items-center mt-2 text-xl text-zinc-600 font-mono font-medium'>Please connect a wallet...</p>
      }
    </div>
  )
}