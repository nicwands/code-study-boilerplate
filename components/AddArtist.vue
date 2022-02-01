<template>
    <form class="add-artist" @submit.prevent="addArtist">
        <h4>Add Artist</h4>
        <label for="artistAddress">Wallet Address</label>
        <input type="text" v-model="walletAddress" id="artistAddress" />
        <button type="submit">Add</button>
    </form>
</template>

<script>
import { ethers } from 'ethers'
import ScabShop from '~/libs/abis/ScabShop.json'

export default {
    data() {
        return {
            walletAddress: '',
        }
    },
    computed: {
        userWallet() {
            return this.$store.state.web3.wallet
        },
    },
    methods: {
        async addArtist() {
            if (!this.userWallet) return
            const ownershipContract = new ethers.Contract(
                process.env.CONTRACT_ADDRESS,
                ScabShop.abi,
                this.userWallet.signer
            )
            const minterRole = await ownershipContract.MINTER_ROLE()
            await ownershipContract.grantRole(minterRole, this.walletAddress)
        },
    },
}
</script>

<style lang="scss">
.add-artist {
}
</style>
