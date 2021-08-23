<template>
    <div :class="classes" :style="styles">
        <nuxt />
    </div>
</template>

<script>
import _kebabCase from 'lodash/kebabCase'

export default {
    data() {
        return {
            mounted: false,
        }
    },
    mounted() {
        this.mounted = true
    },
    computed: {
        classes() {
            return [
                'container',
                { mounted: this.mounted },
                _kebabCase(this.$route.name),
                { 'fonts-loading': this.$store.state.browser.fontsLoading },
                {
                    'prefers-reduced-motion':
                        this.$store.state.prefersReducedMotion,
                },
            ]
        },
        styles() {
            return {
                '--winHeight': this.$store.state.browser.winHeight + 'px',
            }
        },
    },
}
</script>

<style lang="scss">
.container {
    transition: min-height 150ms linear;
    --winHeight: 100vh;
    min-height: var(--winHeight);
    position: relative;
    grid-template-rows: 1fr;
    display: grid;
}
</style>
