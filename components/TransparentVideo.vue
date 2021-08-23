<template>
    <video
        :class="['transparent-video', { 'can-play': canPlay }]"
        v-intersect="(e) => handleIntersect(e)"
        ref="video"
        :autoplay="!playOnIntersect"
        loop
        playsinline
        muted
        v-if="ready && !useFallbackImage"
        @canplay="onCanPlay"
    >
        <source v-if="showM4V" :src="m4v.url" type='video/mp4; codecs="hvc1"' />
        <source :src="webm.url" type="video/webm" />
        <img
            class="fallback"
            v-if="fallback && fallback.url"
            :src="fallback.url"
            :alt="fallback.alt"
            hide-preview
        />
    </video>
    <img
        :class="['fallback', 'transparent-video', { 'can-play': canPlay }]"
        v-else-if="ready"
        :src="fallback.url"
        :alt="fallback.alt"
        hide-preview
    />
</template>

<script>
export default {
    props: {
        m4v: {
            type: Object,
            default: () => ({}),
        },
        webm: {
            type: Object,
            default: () => ({}),
        },
        fallback: {
            type: Object,
            default: () => ({}),
        },
        playOnIntersect: {
            type: Boolean,
            default: () => false,
        },
    },
    data() {
        return {
            // whether or not to mount the component
            ready: false,
            // whether or not the video can play
            canPlay: false,
            useFallbackImage: false,
            showM4V: false,
        }
    },
    mounted() {
        // https://css-tricks.com/overlaying-video-with-transparency-while-wrangling-cross-browser-support/
        const navigator = window.navigator
        const ua = navigator.userAgent.toLowerCase()
        const hasMediaCapabilities = !!(
            navigator.mediaCapabilities &&
            navigator.mediaCapabilities.decodingInfo
        )
        const isSafari =
            ua.indexOf('safari') != -1 &&
            !(ua.indexOf('chrome') != -1) &&
            ua.indexOf('version/') != -1

        // is client on safari with media capabilities? use m4v
        if (isSafari) {
            this.showM4V = true
        }

        if (isSafari && !hasMediaCapabilities) {
            // is client on safari without media capabilities?
            // if so force the fallback image
            this.useFallbackImage = true
            this.canPlay = true
        }

        this.ready = true
    },
    methods: {
        handleIntersect(e) {
            if (this.playOnIntersect && e[0] && e[0].isIntersecting) {
                if (this.$refs.video.paused) {
                    this.$refs.video.play()
                }
            }
        },
        onCanPlay() {
            this.canPlay = true
        },
    },
}
</script>

<style lang="scss">
.transparent-video {
    transition: opacity 0.3s;

    &:not(.can-play) {
        opacity: 0;
    }

    .fallback {
        @include fill;
    }
}
</style>
