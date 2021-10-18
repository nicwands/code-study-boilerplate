import Vue from 'vue'
import { Wallet, providers } from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

export const state = () => {
    return {
        wcCookiePresent: false,
        userWallet: null,
        nftHoldings: null,
    }
}

export const mutations = {
    SET_WC_COOKIE: (state, value) => {
        state.wcCookiePresent = value
    },
    SET_WALLET: (state, wallet) => {
        state.userWallet = wallet
    },
    SET_NFTS: (state, holdings) => {
        state.nftHoldings = holdings
    },
}

export const actions = {
    CONNECT_WALLET: async (context) => {
        /**
         * 1. Connect to provider through Wallet Connect -- https://docs.walletconnect.org/quick-start/dapps/web3-provider
         * 2. Create web3 instance -- https://web3js.readthedocs.io/en/v1.4.0/
         * 3. Retrieve data from accounts
         */

        try {
            //  Create WalletConnect Provider
            const provider = new WalletConnectProvider({
                // List of rpc providers to use, indexed by chainID of network
                rpc: {
                    // ETH
                    1: 'https://cloudflare-eth.com',
                    // Rinkeby
                    4: 'https://cloudflare-eth.com',
                },
                // qrcode: false,
            })

            /**
             * To use custom QR modal:
             *      1. uncomment below section
             *      2. uncomment 'qrcode: false' in WalletConnectProvider constructor
             */
            // provider.connector.on('display_uri', (err, payload) => {
            //     const uri = payload.params[0]
            //     console.log(uri)
            //     CustomQRCodeModal.display(uri)
            // })

            //  Enable session (triggers QR Code modal)
            await provider.enable()

            //  Wrap with Web3Provider from ethers.js
            const web3Provider = new providers.Web3Provider(provider)
            //  Create ethers wallet instance
            const wallet = Wallet.createRandom().connect(web3Provider)

            context.commit('SET_WALLET', Object.freeze(wallet))
        } catch (err) {
            throw err
        }
    },
}

export const getters = {}
