<template>
    <div ref="container" class="three-canvas-wrapper">
        <canvas ref="canvas" class="three-canvas" />
    </div>
</template>

<script>
import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    PlaneGeometry,
    MeshPhongMaterial,
    TextureLoader,
    Mesh,
    PointLight,
    DoubleSide,
    Vector2,
    ShaderMaterial,
    BufferAttribute,
    BufferGeometry,
} from 'three'
import { OrbitControls } from '~/libs/OrbitControls'
import fragmentShader from '~/libs/shaders/fragment.glsl'
import vertexShader from '~/libs/shaders/vertex.glsl'
const glslify = require('glslify')

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

        const light = new PointLight(0xffffff, 2)
        light.position.set(0, 4, 3)
        this.scene.add(light)

        // prep camera
        const fov = 15
        this.camera = new PerspectiveCamera(fov, 0.5625, 0.1, 1000)

        // prep base renderer
        this.renderer = new WebGLRenderer({
            canvas: this.$refs.canvas,
            antialias: true,
            alpha: true,
        })

        this.orbitControls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        )

        const planeGeometry = new PlaneGeometry(1, 1)

        const diffuseTexture = new TextureLoader().load(
            '/images/skin-diffuse.jpg'
        )
        const normalTexture = new TextureLoader().load(
            '/images/skin-normals.jpg'
        )
        const specTexture = new TextureLoader().load('/images/skin-spec.jpg')
        const displaceTexture = new TextureLoader().load(
            '/images/skin-displace.jpg'
        )

        const material = new MeshPhongMaterial({
            map: diffuseTexture,
            normalMap: normalTexture,
            normalScale: new Vector2(1, 1),
            specularMap: specTexture,
            // displacementMap: displaceTexture,
            // displacementScale: 0.1,
            side: DoubleSide,
        })

        const plane = new Mesh(planeGeometry, material)
        this.scene.add(plane)

        this.camera.position.z = 5

        // tattoo
        const tattooGeometry = new BufferGeometry()
        // create a simple square shape. We duplicate the top left and bottom right
        // vertices because each vertex needs to appear once per triangle.
        const vertices = new Float32Array([
            -0.25, -0.25, 0.001, 0.25, -0.25, 0.001, 0.25, 0.25, 0.001, 0.25,
            0.25, 0.001, -0.25, 0.25, 0.001, -0.25, -0.25, 0.001,
        ])

        // itemSize = 3 because there are 3 values (components) per vertex
        tattooGeometry.setAttribute(
            'position',
            new BufferAttribute(vertices, 3)
        )

        const tattooMaterial = new ShaderMaterial({
            uniforms: {
                bgDiffuse: diffuseTexture,
                bgNormals: normalTexture,
                bgSpecular: specTexture,
            },
            vertexShader,
            fragmentShader,
        })

        const tattooMesh = new Mesh(tattooGeometry, tattooMaterial)

        this.scene.add(tattooMesh)

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
