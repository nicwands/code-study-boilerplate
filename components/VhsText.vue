<template>
    <div class="vhs-text">
        <span>
            <slot />

            <canvas ref="canvas" id="canvas" />

            <shader-doodle shadertoy>
                <sd-texture :src="$refs.canvas" ref="texture" name="media" />
                <script type="x-shader/x-fragment" v-html="fragmentShader" />
            </shader-doodle>
        </span>
    </div>
</template>

<script>
import fragmentShader from 'raw-loader!glslify-loader!./fragment-shader-2.fs'
if (!process.server) {
    require('shader-doodle')
}

export default {
    data() {
        return {
            fragmentShader,
        }
    },
    mounted() {
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
        const text = this.$slots.default[0].text
        ctx.font = 'Bold ' + canvas.width / 12 + "px 'Helvetica'"
        ctx.fillText(text, 0, 0)
    },
}
</script>

<style lang="scss">
.vhs-text {
    position: relative;

    canvas,
    shader-doodle {
        @include fill;
        height: 100%;
    }
}
</style>
