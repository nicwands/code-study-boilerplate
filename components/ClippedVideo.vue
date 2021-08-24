<template>
    <div class="clipped-video" :style="textStyles">
        <!-- SVG -->
        <slot v-if="!defaultSlot.text" />

        <svg
            ref="renderSvg"
            :class="{ 'text-svg': defaultSlot.text }"
            :width="svgWidth"
            :height="svgHeight"
            viewBox="0 0 28 29"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <clipPath
                    :id="pathID"
                    :clipPathUnits="clipPathUnits"
                    :transform="clipTransform"
                >
                    <text
                        v-if="defaultSlot.text"
                        x="0"
                        :y="fontSize"
                        ref="text"
                    >
                        {{ defaultSlot.text }}
                    </text>
                    <component
                        v-for="(child, i) in svgChildren"
                        :is="child.tagName"
                        v-bind="getDrawAttribute(child)"
                        :key="i"
                    />
                </clipPath>
            </defs>
        </svg>

        <!-- BACKGROUND -->
        <transition name="fade">
            <div
                v-if="pathID"
                :class="['clip-container', { 'show-on-hover': showOnHover }]"
                :style="clipStyles"
            >
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
        imageSrc: {
            type: String,
            default: '',
        },
        videoSrc: {
            type: String,
            default: '',
        },
        showOnHover: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            pathID: null,
            svgEl: {},
            svgChildren: [],
        }
    },
    mounted() {
        if (this.defaultSlot.text) {
            this.pathID = _camelCase(this.defaultSlot.text)
            const textLength = this.$refs.text.getComputedTextLength()
            this.$refs.renderSvg.style.width = textLength + 'px'
        } else {
            this.svgEl = this.defaultSlot.elm
            this.svgEl.style.display = 'none'
            this.svgChildren = [...this.svgEl.children]
            this.pathID = 'clip' + this.svgEl.id
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
        clipPathUnits() {
            return this.defaultSlot.text
                ? 'userSpaceOnUse'
                : 'objectBoundingBox'
        },
        svgWidth() {
            if (!this.svgEl.getAttribute) return 0
            return this.svgEl?.getAttribute('width')
        },
        svgHeight() {
            if (!this.svgEl.getAttribute) return 0
            return this.svgEl?.getAttribute('height')
        },
        xScale() {
            return 1 / parseInt(this.svgWidth)
        },
        yScale() {
            return 1 / parseInt(this.svgHeight)
        },
        clipTransform() {
            if (!this.svgEl.getAttribute) return ''
            return `scale(${this.xScale}, ${this.yScale})`
        },
    },
    methods: {
        getDrawAttribute(el) {
            return { d: el.getAttribute('d') }
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
            opacity: 0;
        }
        video,
        img {
            @include fill;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &.show-on-hover {
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
            }

            &:hover {
                .color-bg {
                    opacity: 0;
                }
                video,
                img {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
