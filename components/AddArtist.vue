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
    methods: {
        async addArtist() {
            // TODO get wallet from vuex
            const wallet = ''
            const ownershipContract = new ethers.Contract(
                process.env.CONTRACT_ADDRESS,
                ScabShop.abi,
                wallet.signer
            )
            const minterRole = await ownershipContract.MINTER_ROLE()
            await ownershipContract.grantRole(minterRole, data.address)
        },
    },
}
</script>

<style lang="scss">
.add-artist {
    input {
        display: block;
    }
}
</style>
