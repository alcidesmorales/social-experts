import {useState} from 'react'
import type {NextPage} from 'next'

import WalletLoader from 'components/WalletLoader'
import { JsonObject, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Button } from 'antd'

const Positions: NextPage = () => {
  const [loading, _setLoading] = useState(false)

  const queryPositions = async () => {
    const rpcEndpoint =
      process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT ||
      "https://full-node.testnet-1.coreum.dev:26657/";
    const PUBLIC_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
    const offlineSigner = await (window as any).getOfflineSigner(
      PUBLIC_CHAIN_ID,
    );
    if (!offlineSigner) {
      alert("Please install keplr extension");
    } else {
      const accounts = await offlineSigner.getAccounts();
      const walletAddress = accounts[0]?.address;
      console.log(`Wallet: ${walletAddress}`);

      const memo = "Social Experts - Create new profile";
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

      const client = await SigningCosmWasmClient.connectWithSigner(
        rpcEndpoint,
        offlineSigner,
      );

      let queryMsg : JsonObject = {"query_profile_list":{}} ;

      const result = await client.queryContractSmart(contractAddress, queryMsg );

      console.info("The query execution response:", JSON.stringify(result));
    }
  };

  
  return (
    <WalletLoader loading={loading}>
        <div>
          <h1 className="text-3xl font-bold my-8">
            List of open positions to apply... work in progress
          </h1>
          <Button onClick={queryPositions}>Query Positions</Button>
        </div>
    </WalletLoader>
  )
}

export default Positions