import Vue from 'vue'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers, providers } from 'ethers'
import _cloneDeep from 'lodash/cloneDeep'

export const state = () => {
    return {
        wcCookiePresent: false,
        userWallet: null,
    }
}

export const mutations = {
    SET_WC_COOKIE: (state, value) => {
        state.wcCookiePresent = value
    },
    SET_WALLET: (state, wallet) => {
        state.userWallet = wallet
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

            //  Create Web3 instance
            const web3 = new providers.Web3Provider(provider)

            // Get wallet data
            const signer = web3.getSigner()
            const address = await signer.getAddress()
            const balance = await signer.getBalance()

            const wallet = _cloneDeep({
                address,
                balance,
                signer,
            })

            context.commit('SET_WALLET', wallet)
        } catch (err) {
            throw err
        }
    },
}

export const getters = {}
