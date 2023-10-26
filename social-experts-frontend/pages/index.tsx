import type { NextPage } from 'next'
import Link from 'next/link'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/client'
import { Button, Space } from 'antd'

const Home: NextPage = () => {
  const { walletAddress } = useSigningClient()

  return (
    <WalletLoader>
      <h1 className="text-6xl font-bold">
        Welcome to Social Experts!
      </h1>

      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Link
          href="/profile"
          passHref>
          <Button type="primary" className="bg-blue-500 text-white hover:bg-blue-700">
            Find your next job
          </Button>
        </Link>
        <Button type="primary" className="bg-blue-500 text-white hover:bg-blue-700">
          Discover your new office superstar
        </Button>
        <Button type="primary" className="bg-blue-500 text-white hover:bg-blue-700">
          Assist in achieving excellence
        </Button>

        {/* <Link
          href="https://docs.coreum.dev/tools-ecosystem/faucet.html"
          passHref
          target="_blank"
          rel="noreferrer"
          className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">

          <h3 className="text-2xl font-bold">Fund wallet &rarr;</h3>
          <p className="mt-4 text-xl">
            Fund you wallet for the {process.env.NEXT_PUBLIC_CHAIN_NAME}.
          </p>

        </Link>
        <Link
          href="/send"
          passHref
          className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">

          <h3 className="text-2xl font-bold">Send to wallet &rarr;</h3>
          <p className="mt-4 text-xl">
            Execute a transaction to send funds to a wallet address.
          </p>

        </Link>
        <Link
          href="/nft"
          passHref
          className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">

          <h3 className="text-2xl font-bold">NFT &rarr;</h3>
          <p className="mt-4 text-xl">
            Create you NFT class and mint NFTs for it.
          </p>

        </Link> */}
      </div>


    </WalletLoader>
  );
}

export default Home
