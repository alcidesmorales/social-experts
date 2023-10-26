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
        <Link
          href="/positions"
          passHref>
          <Button type="primary" className="bg-blue-500 text-white hover:bg-blue-700">
            Discover your new office superstar
          </Button>
        </Link>        
        <Link
          href="/certify"
          passHref>
          <Button type="primary" className="bg-blue-500 text-white hover:bg-blue-700">
            Assist in achieving excellence
          </Button>
        </Link>        
      </div>
    </WalletLoader>
  );
}

export default Home
