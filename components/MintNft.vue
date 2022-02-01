<template>
    <form class="mint-nft" @submit.prevent="mintNft">
        <h4>Mint NFT</h4>
        <label for="nftName">Name</label>
        <input type="text" v-model="nftName" id="name" />
        <label for="artist">Artist</label>
        <input type="text" v-model="artist" id="artist" />
        <label for="description">Description</label>
        <textarea v-model="description" id="description" cols="30" rows="10" />
        <input type="file" />
        <label for="royalty">Royalty</label>
        <input type="text" v-model="royalty" id="royalty" />

        <button type="submit">Mint</button>
    </form>
</template>

<script>
import { ethers } from 'ethers'
import ScabShop from '~/libs/abis/ScabShop.json'

export default {
    data() {
        return {
            nftName: '',
            artist: '',
            description: '',
            royalty: '',
        }
    },
    computed: {
        userWallet() {
            return this.$store.state.web3.wallet
        },
    },
    methods: {
        async mintNft() {
            const data = await fetch(`${process.env.ENDPOINT}/api/nfts`, {
                method: 'POST',
                body: JSON.stringify({
                    name: this.nftName,
                    artist: this.artist,
                    description: this.description,
                    royalty: this.royalty,
                }),
            })
                .then((res) => res.json())
                .catch((err) => console.error(err))

            if (data) {
                this.onSuccess(data)
            }
        },
        async onSuccess(data) {
            if (!this.userWallet) return
            const ownershipContract = new ethers.Contract(
                process.env.CONTRACT_ADDRESS,
                ScabShop.abi,
                this.userWallet.signer
            )
            await ownershipContract.mint(
                data.metadata_hash,
                data.content_hash,
                data.royalty
            )
        },
    },
}
</script>

<style lang="scss">
.mint-nft {
}
</style>
