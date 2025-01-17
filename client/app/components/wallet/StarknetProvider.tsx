"use client"
import { sepolia, mainnet, Chain } from "@starknet-react/chains";
import {
    StarknetConfig,
    jsonRpcProvider,
    starkscan,
} from "@starknet-react/core";
import ControllerConnector from "@cartridge/connector/controller";
import { SessionPolicies } from "@cartridge/controller";

// Define your contract addresses
const ETH_TOKEN_ADDRESS =
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
const VRF_PROVIDER_ADDRESS = '0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f'

const MINT_NFT = '0x03378dcd8e66d245468a57839d29c8a79347c76ea01afa19559ceab49b45fd6f'

const ARENA_CONTRACT = '';

// Define session policies
const policies: SessionPolicies = {
    contracts: {
        [ETH_TOKEN_ADDRESS]: {
            methods: [
                {
                    name: "approve",
                    entrypoint: "approve",
                    description: "Approve spending of tokens",
                },
                { name: "transfer", entrypoint: "transfer" },
            ],
        },
        [VRF_PROVIDER_ADDRESS]: {
            methods: [
                {
                    name: "request_random",
                    entrypoint: "request_random",
                    description: "Request random numbers from VRF provider",
                },
            ],
        },
        [MINT_NFT]: {
            methods: [
                {
                    name: "safeMint",
                    entrypoint: "safeMint",
                    description: "Mint an NFT",
                },
            ],
        },
        // [ARENA_CONTRACT]: {
        //     methods: [
        //         {
        //             name: "enter_arena",
        //             entrypoint: "enter_arena",
        //             description: "Enter the arena",
        //         },
        //     ],
        // }
    }
}

// Initialize the connector
const connector = new ControllerConnector({
    policies,
    rpc: 'https://api.cartridge.gg/x/starknet/sepolia',
    namespace: "gladiastark",
    slot: "gladiastark",
    preset: "blob-arena",

})

// Configure RPC provider
const provider = jsonRpcProvider({
    rpc: (chain: Chain) => {
        switch (chain) {
            case mainnet:
                return { nodeUrl: 'https://api.cartridge.gg/x/starknet/mainnet' }
            case sepolia:
            default:
                return { nodeUrl: 'https://api.cartridge.gg/x/starknet/sepolia' }
        }
    },
})

export function StarknetProvider({ children }: { children: React.ReactNode }) {
    return (
        <StarknetConfig
            autoConnect
            chains={[mainnet, sepolia]}
            provider={provider}
            connectors={[connector]}
            explorer={starkscan}
        >
            {children}
        </StarknetConfig>
    )
}