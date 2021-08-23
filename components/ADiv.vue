<template>
    <a
        v-if="isAbsolute"
        :class="['a-div', 'has-link', { isAbsolute }]"
        :href="href"
        :target="isAbsolute ? '_blank' : '_self'"
    >
        <slot />
    </a>
    <nuxt-link v-else-if="href" class="a-div has-link" :to="href">
        <slot />
    </nuxt-link>
    <component :is="replaceWith" v-else class="a-div">
        <slot />
    </component>
</template>

<script>
const isRelativeLink = new RegExp('^(?:[a-z]+:)?//', 'i')

export default {
    props: {
        href: [String, Boolean],
        replaceWith: { type: String, default: 'div' },
        noNewTab: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isAbsolute() {
            // tel or mailto
            if (this.noNewTab || /^mailto:|^tel:|^#/.test(this.href))
                return true

            // other links
            return this.href && isRelativeLink.test(this.href)
        }
    }
}
</script>
