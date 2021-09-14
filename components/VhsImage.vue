<template>
    <div class="vhs-image">
        <video :src="imageSrc" ref="videoEl" muted autoplay loop />
        <canvas ref="canvasEl" id="canvas" width="256" height="128" hidden />

        <shader-doodle shadertoy>
            <!-- <sd-texture
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/476907/noise1.png"
                name="noise"
            ></sd-texture> -->
            <sd-texture :src="imageSrc" ref="texture" name="media" />
            <script type="x-shader/x-fragment" v-html="fragmentShader" />
        </shader-doodle>
    </div>
</template>

<script>
// import fragmentShader from 'raw-loader!glslify-loader!./fragment-shader.fs'
import fragmentShader from 'raw-loader!glslify-loader!./fragment-shader-2.fs'
if (!process.server) {
    require('shader-doodle')
}

export default {
    props: {
        imageSrc: String,
    },
    data() {
        return {
            fragmentShader,
            videoReady: false,
        }
    },
    mounted() {
        if (!process.server) {
            const videoEl = this.$refs.videoEl
            const canvas = this.$refs.canvasEl
            canvas.height = 1024
            canvas.width = 1024
            const ctx = canvas.getContext('2d')

            // videoEl.addEventListener('canplaythrough', () => {
            //     this.videoReady = true
            //     setInterval(() => {
            //         this.processFrame(canvas, ctx)
            //     }, 1000 / 30)
            // })
        }
    },
    methods: {
        initText() {
            const Text = require('gl-text')

            let text1 = new Text(this.$refs.canvas)

            text1.update({
                position: [0, 0],
                text: 'ABC',
                font: '16px Helvetica, sans-serif',
            })
            text1.render()
        },
        processFrame(canvas, ctx) {
            const video = this.$refs.videoEl
            if (ctx.drawImage) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            }
        },
    },
}
</script>

<style lang="scss">
.vhs-image {
    @include fill;
    width: 100%;
    height: 100%;

    shader-doodle {
        width: 100%;
        height: 100%;
    }

    video {
        opacity: 0;
        position: absolute;
    }
}
</style>
