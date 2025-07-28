'use client'

import { useAccount } from 'wagmi';
import HomeContent from '@/components/HomeContent'

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <div>
      {
        isConnected
          ? <HomeContent />
          : <p className='flex justify-center items-center mt-2 text-xl text-zinc-600 font-mono font-medium'>Please connect a wallet...</p>
      }
    </div>
  );
}
