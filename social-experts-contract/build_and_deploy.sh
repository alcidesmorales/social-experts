#!/bin/bash

RPC_URL="https://full-node.testnet-1.coreum.dev:26657"
COREUM_CHAIN_ID="coreum-testnet-1"
COREUM_DENOM="utestcore"
COREUM_NODE="$RPC_URL"
COREUM_VERSION="v2.0.2"
COREUM_CHAIN_ID_ARGS="--chain-id=$COREUM_CHAIN_ID"
COREUM_NODE_ARGS="--node=$COREUM_NODE"
COREUM_HOME=$HOME/.core/"$COREUM_CHAIN_ID"
COREUM_BINARY_NAME=$(arch | sed s/aarch64/cored-linux-arm64/ | sed s/x86_64/cored-linux-amd64/)

WALLET="Alice"

cargo run-script optimize

STORE_TXHASH=$(cored tx wasm store artifacts/social_experts_contract.wasm --from $WALLET --gas auto --gas-adjustment 1.3 -y -b sync --output json $COREUM_NODE_ARGS $COREUM_CHAIN_ID_ARGS| jq -r '.txhash')

CODE_ID=$(cored q tx $STORE_TXHASH $COREUM_NODE_ARGS $COREUM_CHAIN_ID_ARGS  --output json | jq -r '.logs[].events[] | select(.type == "store_code").attributes[] | select(.key == "code_id").value')

INSTANTITATE_TXHASH=$(cored tx wasm instantiate $CODE_ID  '{}' --label "Social Experts Jobs Search" --no-admin  --from $WALLET --gas auto --gas-adjustment 1.3 -b sync -y $COREUM_NODE_ARGS $COREUM_CHAIN_ID_ARGS --output json | jq -r '.txhash')

CONTRACT_ADDRESS=$(cored q tx  $INSTANTITATE_TXHASH  $COREUM_NODE_ARGS $COREUM_CHAIN_ID_ARGS  --output json | jq -r '.logs[].events[] | select(.type == "instantiate").attributes[] | select(.key == "_contract_address").value')

export STORE_TXHASH=$STORE_TXHASH
export INSTANTITATE_TXHASH=$INSTANTITATE_TXHASH
export CONTRACT_ADDRESS=$CONTRACT_ADDRESS
