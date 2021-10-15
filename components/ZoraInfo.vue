<template>
    <div class="zora-info">zora</div>
</template>

<script>
import { auctionQuery } from '../libs/zora'

export default {
    async mounted() {
        const data = await this.$graphql.default.request(auctionQuery(5646))
        console.log(data)
    },
}
</script>

<style lang="scss">
.zora-info {
}
</style>
