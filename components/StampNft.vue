<template>
    <form class="stamp-nft" @submit.prevent="stampNft">
        <h4>Stamp NFT</h4>
        <label for="nftId">NFT ID</label>
        <input type="text" v-model="nftId" />
        <label for="stampedTo">Stamped To</label>
        <input type="text" v-model="stampedTo" id="stampedTo" />

        <button type="submit">Stamp</button>
    </form>
</template>

<script>
import { ethers } from 'ethers'
import ScabShop from '~/libs/abis/ScabShop.json'

export default {
    data() {
        return {
            nftId: '',
            stampedTo: '',
        }
    },
    computed: {
        userWallet() {
            return this.$store.state.web3.wallet
        },
    },
    methods: {
        async stampNft() {
            const data = await fetch(
                `${process.env.ENDPOINT}/api/nfts/${this.nftId}/stamp`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        stamped_to: this.stampedTo,
                    }),
                }
            )
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
            await ownershipContract.stamp(nft.token_id, data.metadata_hash)
        },
    },
}
</script>

<style lang="scss">
.stamp-nft {
}
</style>
