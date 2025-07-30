import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import NFTBox from "./NFTBox"
import Link from "next/link"

interface NFTQueryResponse {
  data: {
    allItemListeds: {
      nodes: NFTItem[]
    },
    allItemBoughts: {
      nodes: BoughtCanceled[]
    },
    allItemCanceleds: {
      nodes: BoughtCanceled[]
    }
  }
}

interface NFTItem {
  rindexerId: string,
  seller: string,
  nftAddress: string,
  price: string,
  tokenId: string,
  contractAddress: string,
  txHash: string,
  blockNumber: string
}

interface BoughtCanceled {
  nftAddress: string,
  tokenId: string
}

async function fetchNFTs(): Promise<NFTQueryResponse> {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: GET_RECENT_NFTS
    })
  })

  return response.json()
}

const GET_RECENT_NFTS = `
query AllItemListeds {
  allItemListeds(first: 20, orderBy: [BLOCK_NUMBER_DESC, TX_INDEX_DESC]) {
    nodes {
      seller
      nftAddress
      price
      tokenId
      contractAddress
      txHash
    }
  }
  allItemBoughts {
    nodes {
      nftAddress
      tokenId
    }
  }
  allItemCanceleds {
    nodes {
      nftAddress
      tokenId
    }
  }
}
`

console.log(await fetchNFTs())

// Main component that uses the custom hook
export default function RecentlyListedNFTs() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-8 text-center">
                <Link
                    href="/list-nft"
                    className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    List Your NFT
                </Link>
            </div>
            <h2 className="text-2xl font-bold mb-6">Recently Listed NFTs</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <img
                    src="/placeholder.png"
                    alt={`NFT`}
                    className="w-full h-auto max-h-96 object-contain bg-zinc-50"
                    onError={() => {
                        console.error("Error loading NFT image")
                    }}
                />
            </div>
        </div>
    )
}