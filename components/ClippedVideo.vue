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
                <transition name="fade">
                    <img v-if="!videoSrc.length" :src="imageSrc" />
                    <video v-else :src="videoSrc" muted autoplay loop />
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
        clipStyles() {
            return {
                clipPath: `url('#${this.pathID}')`,
            }
        },
        fontSize() {
            console.log(typeof this.$el)
            return '40px'
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
body {
    font-family: 'Open Sans', sans-serif;
    font-size: 40px;
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
            font-weight: inherit;
        }
    }
    .clip-container {
        @include fill;

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
