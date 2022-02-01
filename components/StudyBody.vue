<template>
    <section class="study-body">
        <button v-if="!loading && !success" @click="connectWallet">
            Connect Wallet
        </button>

        <loading-spinner v-else-if="!success" />

        <div v-else class="forms">
            <add-artist />
            <mint-nft />
            <stamp-nft />
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            success: false,
        }
    },
    methods: {
        async connectWallet() {
            this.loading = true

            try {
                await this.$store.dispatch('web3/CONNECT_WALLET')
                this.loading = false
                this.success = true
            } catch (err) {
                this.loading = false
                // do nothing if user closed modal
                if (err.toString().includes('closed')) return
                console.error(err)
                this.error = true
            }
        },
    },
}
</script>

<style lang="scss">
.study-body {
    border: 1px solid var(--black);
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    position: relative;

    button[type='submit'] {
        background: var(--black);
        padding: 10px 30px;
        color: var(--white);
        margin: 20px 0;
        border: 1px solid var(--black);
        transition: color 300ms ease, background 300ms ease;

        @include hover {
            color: var(--black);
            background: var(--white);
        }
    }
    input,
    textarea {
        display: block;
        margin: 10px 0;
    }
}
</style>
