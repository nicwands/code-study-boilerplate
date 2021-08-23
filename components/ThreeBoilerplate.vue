<template>
    <div ref="container" class="three-canvas-wrapper">
        <canvas ref="canvas" class="three-canvas" />
    </div>
</template>

<script>
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
require('resize-observer-polyfill/dist/ResizeObserver.global')

export default {
    data() {
        return {
            resizeObserver: null,

            containerWidth: 0,
            containerHeight: 0,

            // set on this component, but not reacted to:
            // * renderer
            // * scene
            // * camera
        }
    },
    mounted() {
        // prep scene
        this.scene = new Scene()

        // prep camera
        const fov = 15
        this.camera = new PerspectiveCamera(fov, 0.5625, 0.1, 1000)

        // prep base renderer
        this.renderer = new WebGLRenderer({
            canvas: this.$refs.canvas,
            antialias: true,
            alpha: true,
        })

        // update canvas size
        this.updateSize()

        // prep resize observer
        this.resizeObserver = new ResizeObserver(this.updateSize)
        this.resizeObserver.observe(this.$refs.container)

        // start
        this.$emit('start', {
            renderer: this.renderer,
            scene: this.scene,
            camera: this.camera,
        })

        // update
        this.update()
    },
    methods: {
        update() {
            if (this && this.update) {
                requestAnimationFrame(this.update)
            }

            this.$emit('update', {
                renderer: this.renderer,
                scene: this.scene,
                camera: this.camera,
            })

            this.renderer.render(this.scene, this.camera)
        },
        updateSize() {
            const { container } = this.$refs

            if (!this.camera || !this.renderer || !container) return

            this.containerWidth = container.offsetWidth
            this.containerHeight = container.offsetHeight
            this.camera.aspect = this.containerWidth / this.containerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(this.containerWidth, this.containerHeight)
            this.renderer.render(this.scene, this.camera)
        },
    },
}
</script>

<style lang="scss">
.three-canvas-wrapper,
.three-canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>