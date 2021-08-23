<template>
    <div class="rainbow-clip" :style="textStyles">
        <!-- TEXT -->
        <svg v-if="text" class="text-svg" ref="textSvg">
            <defs>
                <clipPath :id="pathID">
                    <text x="0" :y="fontSize" ref="text">
                        {{ text }}
                    </text>
                </clipPath>
            </defs>
        </svg>

        <!-- SVG -->
        <slot />

        <!-- BACKGROUND -->
        <transition name="fade">
            <div v-if="pathID" class="clip-container" :style="clipStyles">
                <!--                 <prismic-image
                    v-bind="settings.hover_link_fallback"
                    :videoSrc="videoSrc"
                    fill-space
                /> -->
                <video
                    src="https://prismic-io.s3.amazonaws.com/rumfoords/779247b4-87cb-4908-b0a1-1b0a96078fc1_Splash_BG+%281%29.mp4"
                    muted
                    autoplay
                    loop
                />

                <div class="color-bg" />
            </div>
        </transition>
    </div>
</template>

<script>
import _camelCase from 'https://cdn.skypack.dev/lodash@4.17.21/camelCase'

export default {
    props: {
        text: {
            type: String,
            default: 'test text',
        },
    },
    data() {
        return {
            pathID: null,
        }
    },
    mounted() {
        if (this.text) {
            this.pathID = _camelCase(this.text)
            const textLength = this.$refs.text.getComputedTextLength()
            this.$refs.textSvg.style.width = textLength + 'px'
        } else if (this.$slots.default[0]) {
            this.pathID = this.$el.querySelector('clipPath')?.id
        }
    },
    computed: {
        settings() {
            return this.$store.state.settings
        },
        videoSrc() {
            return this.settings.hover_link_background?.url
        },
        clipStyles() {
            return {
                clipPath: `url('#${this.pathID}')`,
            }
        },
        fontSize() {
            return window
                .getComputedStyle(this.$el, null)
                .getPropertyValue('font-size')
        },
        textStyles() {
            return {
                '--set-font-size': this.fontSize,
            }
        },
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700');

body {
    font-family: 'Open Sans', sans-serif;
    font-size: 40px;
    color: black;
}

.rainbow-clip {
    position: relative;
    font-size: inherit;
    display: inline-block;
    cursor: pointer;

    svg {
        width: 100%;
        height: auto;
    }
    .text-svg {
        height: var(--set-font-size);

        text {
            font-size: inherit;
        }
    }
    .clip-container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        .color-bg {
            opacity: 1;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: currentColor;
            transition: opacity 300ms ease-in-out;
        }
        .video {
            opacity: 0;
            transition: opacity 300ms ease-in-out;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
    }
    &:hover .clip-container {
        .color-bg {
            opacity: 0;
        }
        .prismic-image {
            opacity: 1;
        }
    }
}
</style>
