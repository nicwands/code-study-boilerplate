<template>
    <div class="clipped-video" :style="textStyles">
        <!-- TEXT -->
        <svg v-if="defaultSlot.text" class="text-svg" ref="textSvg">
            <defs>
                <clipPath :id="pathID">
                    <text x="0" :y="fontSize" ref="text">
                        {{ defaultSlot.text }}
                    </text>
                </clipPath>
            </defs>
        </svg>

        <!-- SVG -->
        <slot v-else />

        <!-- BACKGROUND -->
        <transition name="fade">
            <div v-if="pathID" class="clip-container" :style="clipStyles">
                <transition name="fade">
                    <img v-if="!videoSrc.length" :src="imageSrc" key="image" />
                    <video
                        v-else
                        :src="videoSrc"
                        muted
                        autoplay
                        loop
                        key="video"
                    />
                </transition>

                <div class="color-bg" />
            </div>
        </transition>
    </div>
</template>

<script>
import _camelCase from 'lodash/camelCase'

export default {
    props: {
        text: {
            type: String,
            default: '',
        },
        imageSrc: {
            type: String,
            default: '',
        },
        videoSrc: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            pathID: null,
            svgChildren: [],
        }
    },
    mounted() {
        if (this.defaultSlot.text) {
            this.pathID = _camelCase(this.defaultSlot.text)
            const textLength = this.$refs.text.getComputedTextLength()
            this.$refs.textSvg.style.width = textLength + 'px'
        } else {
            console.log(this.$slots.default[0])
            this.pathID = this.$el.querySelector('clipPath')?.id
        }
    },
    computed: {
        defaultSlot() {
            return this.$slots.default[0]
        },
        clipStyles() {
            return {
                clipPath: `url('#${this.pathID}')`,
            }
        },
        fontSize() {
            if (process.server) return
            return window
                .getComputedStyle(this.$el)
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
.clipped-video {
    position: relative;
    display: inline-block;

    svg {
        width: 100%;
        height: auto;
    }
    .text-svg {
        height: var(--set-font-size);

        text {
            font-size: inherit;
            font-weight: inherit;
        }
    }
    .clip-container {
        @include fill;
        width: 100%;
        height: 100%;

        .color-bg {
            opacity: 1;
            @include fill;
            background: currentColor;
            transition: opacity 300ms ease-in-out;
        }
        video,
        img {
            opacity: 0;
            transition: opacity 300ms ease-in-out;
            @include fill;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &:hover .clip-container {
        .color-bg {
            opacity: 0;
        }
        video,
        img {
            opacity: 1;
        }
    }
}
</style>
