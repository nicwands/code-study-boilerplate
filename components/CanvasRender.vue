<template>
    <div class="canvas-render">
        <video ref="video" src="/videos/shovel.mp4" muted autoplay loop />

        <canvas ref="canvas" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            // non-reactive
            // canvas
            // ctx: canvas context
        }
    },
    mounted() {
        this.canvas = this.$refs.canvas
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.drawFrame()
    },
    methods: {
        drawFrame() {
            requestAnimationFrame(this.drawFrame)

            const video = this.$refs.video
            this.ctx.drawImage(
                video,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            )
        },
    },
}
</script>

<style lang="scss">
.canvas-render {
    canvas {
        width: 100%;
    }
    video {
        width: 100%;
    }
}
</style>
