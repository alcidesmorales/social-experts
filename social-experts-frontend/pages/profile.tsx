import { memo, useEffect, useState } from "react";
import type { NextPage } from "next";
import { Coin } from "@cosmjs/amino";
import WalletLoader from "components/WalletLoader";
import { useSigningClient } from "contexts/client";
import {
  convertDenomToMicroDenom,
  convertFromMicroDenom,
  convertMicroDenomToDenom,
} from "util/conversion";
import { JsonObject } from "@cosmjs/cosmwasm-stargate/build/modules/wasm/queries";
import { Button } from "antd";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, GasPrice } from "@cosmjs/stargate";

const PUBLIC_CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME;
const PUBLIC_STAKING_DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || "";

const Send: NextPage = () => {
  const { walletAddress, signingClient } = useSigningClient();
  const [balance, setBalance] = useState("");
  const [loadedAt, setLoadedAt] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return;
    }
    setError("");
    setSuccess("");

    signingClient
      .getBalance(walletAddress, PUBLIC_STAKING_DENOM)
      .then((response: any) => {
        const { amount, denom }: { amount: number; denom: string } = response;
        setBalance(
          `${convertMicroDenomToDenom(amount)} ${convertFromMicroDenom(denom)}`,
        );
      })
      .catch((error) => {
        setError(`Error! ${error.message}`);
      });
  }, [signingClient, walletAddress, loadedAt]);

  const handleSend = () => {
    setError("");
    setSuccess("");
    setLoading(true);
    const amount: Coin[] = [
      {
        amount: convertDenomToMicroDenom(sendAmount),
        denom: PUBLIC_STAKING_DENOM,
      },
    ];

    signingClient
      ?.sendTokens(walletAddress, recipientAddress, amount, "auto")
      .then(() => {
        const message = `Success! Sent ${sendAmount}  ${convertFromMicroDenom(
          PUBLIC_STAKING_DENOM,
        )} to ${recipientAddress}.`;

        setLoadedAt(new Date());
        setLoading(false);
        setSendAmount("");
        setSuccess(message);
      })
      .catch((error) => {
        setLoading(false);
        setError(`Error! ${error.message}`);
      });
  };

  const execContract = async (msg: JsonObject) => {
    try {
      const memo = "Social Experts - Execute contract";
      const contractAddress =
        "testcore1gz5vwjeal4s3rmmvway6gr0ayj25hjtsmgagvgrk849gkfz0arkq3q2tm4";
      const resp = await signingClient?.execute(
        walletAddress,
        contractAddress,
        msg,
        "auto",
        memo,
      );
      console.log(`Execute contract Tx hash: ${resp?.transactionHash}`);
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      setError(`Error! ${error}`);
      return false;
    }
  };

  const createNewProfile = async () => {
    let msg: JsonObject = {
      new_profile: {
        min_salary: 120000,
        location: "Hybrid",
        roles: [
          {
            name: "Data Engineer",
            experience: 10,
          },
        ],
        skills: ["Python"],
        active: true,
      },
    };

    const rpcEndpoint =
      process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT ||
      "https://full-node.testnet-1.coreum.dev:26657/";
    const PUBLIC_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
    const offlineSigner = await (window as any)
      .getOfflineSigner(PUBLIC_CHAIN_ID);
    if (!offlineSigner) {
      alert("Please install keplr extension");
    } else {
      const accounts = await offlineSigner.getAccounts()
      const walletAddress = accounts[0]?.address;
      console.log(`Wallet: ${walletAddress}`);

      const memo = "Social Experts - Create new profile";
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

      const client = await SigningCosmWasmClient.connectWithSigner(
        rpcEndpoint,
        offlineSigner,
      );
      const gasPrice = GasPrice.fromString("0.025" + process.env.NEXT_PUBLIC_STAKING_DENOM);
      const executeFee = calculateFee(300000, gasPrice);

      const result = await client.execute(
        walletAddress,
        contractAddress,
        msg,
        executeFee,
        memo,
      );
      console.info("The contract execution response:", result);
    }

    // await execContract(msg)
  };

  return (
    <WalletLoader loading={loading}>
      <Button onClick={() => createNewProfile()}>Execute contract</Button>
    </WalletLoader>
  );
};

export default Send;
