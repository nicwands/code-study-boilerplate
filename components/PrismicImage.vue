<template>
    <component
        :class="[
            'prismic-image',
            { 'fill-space': fillSpace },
            `fit-${fit}`,
            { intersected },
        ]"
        :is="wrapper"
        :style="styles"
    >
        <component
            class="image-sizer"
            :is="innerWrapper"
            :style="wrapperStyles"
        >
            <!-- 2x2 version of image stretched to full size -->
            <!-- <img
                class="loader"
                :src="tinyUrl"
                :width="cmpWidth"
                :height="cmpHeight"
                aria-hidden="true"
                v-if="!hidePreview"
            /> -->
            <transition :name="transition">
                <img
                    @load="loaded = true"
                    :src="cmpUrl"
                    :srcset="cmpSrcset"
                    :width="cmpWidth"
                    :height="cmpHeight"
                    :alt="alt"
                    v-show="loaded"
                    key="main-image"
                    class="media media-image"
                />
            </transition>
            <transition v-if="videoSrc" :name="transition">
                <video
                    v-show="videoLoaded"
                    @canplay="videoLoaded = true"
                    :height="cmpHeight"
                    :width="cmpWidth"
                    :src="videoSrc"
                    class="media media-video"
                    playsinline
                    autoplay
                    muted
                    loop
                />
            </transition>
        </component>
    </component>
</template>

<script>
import intersected from '~/mixins/intersected'
const defaultSizes = [null, 1920, 1100, 800, 500]

export default {
    mixins: [intersected],
    name: 'prismic-image',
    props: {
        wrapper: {
            type: String,
            default: 'div',
        },
        videoSrc: {
            type: String,
            default: '',
        },
        src: {
            type: String,
            default: '',
        },
        aspect: {
            type: [String, Number],
            default: -1,
        },
        innerWrapper: {
            type: String,
            default: 'div',
        },
        sizes: {
            type: Array,
            default: () => defaultSizes,
        },
        transition: {
            type: String,
            default: 'fade',
        },
        hidePreview: {
            type: Boolean,
            default: false,
        },
        fillSpace: {
            type: Boolean,
            default: false,
        },
        fit: {
            type: String,
            default: 'cover',
        },
        // props from Prismic
        dimensions: {
            type: Object,
            default: () => ({ width: -1, height: -1 }),
        },
        alt: {
            type: String,
            default: '',
        },
        url: {
            type: String,
            default: '',
        },
        // end props from Prismic
    },
    watch: {
        cmpUrl: {
            immediate: true,
            async handler(cmpUrl) {
                this.colors = null
                if (cmpUrl) {
                    const stripped = cmpUrl.replace(/\?.+/g, '')
                    const res = await fetch(`${stripped}?palette=json`)
                        .then((r) => r.json())
                        .catch((err) => {
                            console.log('color error: ', err)
                        })
                    if (res && res.colors.length) {
                        this.colors = res.dominant_colors
                    }
                }
            },
        },
    },
    data() {
        return {
            colors: null,
            loaded: false,
            videoLoaded: false,
        }
    },
    computed: {
        styles() {
            return { '--aspect': this.cmpAspect + '%' }
        },
        wrapperStyles() {
            return {
                backgroundColor: this.primaryColor,
                backgroundImage: `linear-gradient(${this.primaryColor}, ${this.secondaryColor})`,
            }
        },
        primaryColor() {
            return _get(this.colors, 'vibrant_dark.hex') || ''
        },
        secondaryColor() {
            return _get(this.colors, 'muted_dark.hex') || ''
        },
        cmpUrl() {
            return this.url || this.src
        },
        cmpWidth() {
            return this.dimensions.width
        },
        cmpHeight() {
            return this.dimensions.height
        },
        cmpAspect() {
            // calculate if no aspect provided
            if (this.aspect === -1) {
                return (this.dimensions.height / this.dimensions.width) * 100
            }

            // otherwise, parse provided aspect, handling both 56.25 and 0.5625 style
            const toParse = parseFloat(this.aspect)
            return toParse <= 1 ? toParse * 100 : toParse
        },
        cmpSrcset() {
            return this.sizes
                .map((size) => {
                    const width = size === null ? this.cmpWidth : size
                    const height = Math.round(width / (this.cmpAspect / 100))
                    return this.cmpUrl + `&w=${width}&h=${height} ${width}w`
                })
                .join(', ')
        },
        tinyUrl() {
            return this.cmpUrl + `&w=2&h=2`
        },
    },
}
</script>

<style lang="scss">
.prismic-image {
    position: relative;
    width: 100%;

    .image-sizer {
        overflow: hidden;
        padding-bottom: var(--aspect);

        & > * {
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
        }
    }

    // fill space
    &.fill-space {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;

        .image-sizer {
            padding-bottom: 0;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    }

    // fits
    &.fit-cover .image-sizer > * {
        object-fit: cover;
    }
    &.fit-contain .image-sizer > * {
        object-fit: contain;
    }
}
</style>
