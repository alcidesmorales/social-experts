import {ReactNode} from 'react'
import {useSigningClient} from 'contexts/client'
import Loader from './Loader'

function WalletLoader({
                        children,
                        loading = false,
                      }: {
  children: ReactNode
  loading?: boolean
}) {
  const {
    walletAddress,
    loading: clientLoading,
    error,
    connectWallet,
  } = useSigningClient()

  if (loading || clientLoading) {
    return (
      <div className="justify-center">
        <Loader/>
      </div>
    )
  }

  if (walletAddress === '') {
    return (
      <div className="max-w-full">
        <h1 className="text-6xl font-bold">
          Welcome to Social Experts!
        </h1>
        <h2 className="text-2xl font-bold">
          Please connect your wallet.
        </h2>
      </div>
    )
  }

  if (error) {
    return <code>{JSON.stringify(error)}</code>
  }

  return <>{children}</>
}

export default WalletLoader
