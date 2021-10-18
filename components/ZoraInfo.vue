<template>
    <div class="zora-info">zora</div>
</template>

<script>
// import { auctionQuery } from '../libs/zora'
import { ethers, Wallet } from 'ethers'
import {
    Zora,
    AuctionHouse,
    Decimal,
    constructBid,
    approveERC20,
    getZoraProfiles,
} from '@zoralabs/zdk'

export default {
    async mounted() {
        if (!this.userWallet) {
            await this.$store.dispatch('web3/CONNECT_WALLET')
        }
        // create Zora instance, 1 for mainnet - 4 for rinkeby
        this.zora = new Zora(this.userWallet, 4)
        console.log(this.zora)

        // create AuctionHouse instance
        this.auctionHouse = new AuctionHouse(this.userWallet, 4)
        console.log(this.auctionHouse)

        return

        const mediaToken = '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656'
        await this.createAuction(mediaToken)

        const amount = Decimal.new(10).value // amount of bid (10*10^18)
        // if auction is on zora
        this.bidOnAuction(1234, amount)
        // to bid on anything using the Zora protocol
        await this.createBid(amount)
    },
    computed: {
        userWallet() {
            return this.$store.state.web3.userWallet
        },
    },
    methods: {
        async createAuction(tokenId) {
            // https://docs.zora.co/zoraos/dev/zdk/auction-house#create-an-auction

            // approve media to be placed on auction
            const approvalTx = await this.zora.approve(
                this.auctionHouse.address,
                tokenId
            )

            console.log(approvalTx)

            // await confirmation of the approval
            await approvalTx.wait()

            // create the Auction
            const createAuctionTx = await this.auctionHouse.createAuction(
                tokenId,
                duration, // auction runtime in seconds
                reservePrice, // minimum price for first bid
                curator, // address of the auction curator || zero address for uncurated auction
                curatorFeePercentage, // % of final bid to give to curator
                auctionCurrency // address of ERC-20 currency
            )

            // await confirmation from the Ethereum Network and receive a receipt
            const receipt = await createAuctionTx.wait()

            // get auction info
            const auction =
                await this.auctionHouse.fetchAuctionFromTransactionReceipt(
                    receipt
                )
        },
        async endAuction(auctionId) {
            return await this.auctionHouse.endAuction(auctionId)
        },
        async bidOnAuction(auctionId, amount) {
            return await this.auctionHouse.createBid(auctionId, amount)
        },
        async createBid(mediaId, amount) {
            // https://github.com/ourzora/zdk/blob/HEAD/docs/bidding.md

            const currency = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // address of the ERC-20 currency used to bid (DAI)

            // get approval for transfer of funds
            await approveERC20(
                this.userWallet,
                currency,
                this.zora.marketAddress,
                ethers.constants.MaxUint256
            )

            const bid = constructBid(
                currency,
                amount,
                this.userWallet.address, // bidder address
                this.userWallet.address, // recipient address (address to receive Media if bid is accepted)
                10 // sellOnShare
            )

            const tx = await this.zora.setBid(mediaId, bid)
            await tx.wait(8) // 8 confirmations to finalize
        },
    },
}
</script>

<style lang="scss">
.zora-info {
}
</style>
