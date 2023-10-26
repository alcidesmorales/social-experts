import {useState} from 'react'
import type {NextPage} from 'next'

import WalletLoader from 'components/WalletLoader'
import { JsonObject, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Button, Table } from 'antd'

interface Profile {
  id: number;
  location: string;
  roles: { name: string; experience: number }[];
  skills: string[];
}

interface Props {
  profiles: Profile[];
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    key: 'roles',
    render: (roles: { name: string; experience: number }[]) => (
      <ul>
        {roles.map((role, index) => (
          <li key={index}>
            {role.name} (Experience: {role.experience} years)
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Skills',
    dataIndex: 'skills',
    key: 'skills',
    render: (skills: string[]) => (
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    ),
  },
];

const Positions: NextPage = () => {
  const [loading, _setLoading] = useState(false)
  const [profiles, setProfiles] = useState<Profile[]>([]);


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
      setProfiles(result.profiles);

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
        <Table columns={columns} dataSource={profiles} ></Table>
    </WalletLoader>
  )
}

export default Positions