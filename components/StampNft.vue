<template>
    <form class="stamp-nft" @submit.prevent="stampNft">
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
            stampedTo: '',
        }
    },
    methods: {
        async stampNft() {
            const data = await fetch(
                `${process.env.ENDPOINT}/api/nfts/TODO/stamp`,
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
            // TODO get wallet from vuex
            const wallet = ''
            // TODO get nft info
            const nft = ''
            const ownershipContract = new ethers.Contract(
                process.env.CONTRACT_ADDRESS,
                ScabShop.abi,
                wallet.signer
            )
            await ownershipContract.stamp(nft.token_id, data.metadata_hash)
        },
    },
}
</script>

<style lang="scss">
.stamp-nft {
    input {
        display: block;
    }
}
</style>
