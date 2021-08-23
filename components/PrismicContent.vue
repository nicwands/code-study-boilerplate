<template>
    <div
        class="prismic-content"
        v-if="content && content.length"
        v-html="formattedContent"
    />
</template>

<script>
import fitvids from 'fitvids'

export default {
    props: {
        content: {
            type: Array,
            default: () => [],
        },
        asText: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        formattedContent() {
            const action = this.asText ? 'asText' : 'asHtml'
            return this.$prismic[action](this.content) || ''
        },
    },
    async mounted() {
        await this.$nextTick()
        fitvids('div[data-oembed]')
    },
    watch: {
        async content() {
            await this.$nextTick()
            fitvids('div[data-oembed]')
        },
    },
}
</script>
