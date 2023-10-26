import {useEffect, useState} from 'react'
import type {NextPage} from 'next'
import {sha256} from 'js-sha256'

import WalletLoader from 'components/WalletLoader'
import {useSigningClient} from 'contexts/client'

const Positions: NextPage = () => {
  const {walletAddress, signingClient, coreumQueryClient} = useSigningClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [classCreated, setClassCreated] = useState(false)
  const [nftClassDescription, setNFTClassDescription] = useState('')
  const [nfts, setNfts] = useState<{ classId: string; id: string, uri: string, uriHash: string, owner: string }[]>([])
  const [transferID, setTransferID] = useState("")
  const [recipientAddress, setRecipientAddress] = useState('')

  return (
    <WalletLoader loading={loading}>
        <div>
          <h1 className="text-3xl font-bold my-8">
            List of open positions to apply... work in progress
          </h1>
        </div>
    </WalletLoader>
  )
}

export default Positions