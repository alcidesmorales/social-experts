import { useSigningClient } from 'contexts/client'
import Link from 'next/link'
import Image from 'next/image'
import Router from 'next/router'
import { IClientContext } from 'hooks/client'

function Nav() {
  const { walletAddress, connectWallet, disconnect } = useSigningClient();
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet()
    } else {
      disconnect()
      Router.push('/')
    }
  }

  const PUBLIC_SITE_ICON_URL = process.env.NEXT_PUBLIC_SITE_ICON_URL || ''

  return (
    <div className="border-b w-screen px-2 md:px-16">
      <nav
        className="flex flex-wrap text-center md:text-left md:flex flex-row w-full justify-between items-center py-4 ">
        <div className="flex items-center">
          <Link href="/">

            {PUBLIC_SITE_ICON_URL.length > 0 ? (
              <Image
                src={PUBLIC_SITE_ICON_URL}
                height={32}
                width={32}
                alt="Logo"
              />
            ) : (
              <span className="text-2xl">⚛️ </span>
            )}

          </Link>
          <Link
            href="/"
            className="ml-1 md:ml-2 link link-hover font-semibold text-xl md:text-2xl align-top">

            {process.env.NEXT_PUBLIC_SITE_TITLE}

          </Link>
        </div>
        <div className="flex flex-grow lg:flex-grow-0 max-w-full">
          <button
            className="rounded-xl block btn btn-outline btn-primary w-full max-w-full truncate"
            onClick={handleConnect}
          >
            {walletAddress || 'Connect'}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Nav
