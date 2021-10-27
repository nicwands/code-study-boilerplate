<template>
    <div class="face-morph">
        <div class="video-wrap" hidden>
            <video ref="video" autoplay @play="createCanvas" />
        </div>

        <div class="canvas-wrap" ref="canvasWrap" />

        <button @click="startWebcam">Activate</button>
        <button @click="stopWebcam">Stop</button>
    </div>
</template>

<script>
import * as faceapi from 'face-api.js'

export default {
    data() {
        return {
            webcamPaused: true,
        }
    },
    async mounted() {
        const MODEL_URL = '/models'
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
        await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL)
        // await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
    },
    methods: {
        async startWebcam() {
            try {
                this.stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { min: 1024, ideal: 1280, max: 1920 },
                        height: { min: 576, ideal: 720, max: 1080 },
                    },
                })
                this.video = this.$refs.video

                this.video.srcObject = this.stream
                this.webcamPaused = false
            } catch (err) {
                console.error(err)
            }
        },
        stopWebcam() {
            this.webcamPaused = true
            this.stream?.getTracks().forEach((track) => track.stop())
        },
        createCanvas() {
            this.canvas = faceapi.createCanvasFromMedia(this.video)
            const container = this.$refs.canvasWrap

            container.append(this.canvas)

            this.displaySize = {
                width: this.video.videoWidth,
                height: this.video.videoHeight,
            }
            faceapi.matchDimensions(this.canvas, this.displaySize)

            this.processFrame()
        },
        async processFrame() {
            this.ctx = this.canvas.getContext('2d')
            this.ctx.drawImage(this.video, 0, 0)
            await this.detectFeatures()

            if (!this.webcamPaused) {
                requestAnimationFrame(this.processFrame)
            }
        },
        async detectFeatures() {
            const detections = await faceapi
                .detectAllFaces(
                    this.video,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks(true)

            const resizedDetections = faceapi.resizeResults(
                detections,
                this.displaySize
            )
            faceapi.draw.drawFaceLandmarks(this.canvas, resizedDetections)
        },
    },
}
</script>

<style lang="scss">
.face-morph {
    .video-wrap,
    .canvas-wrap {
        width: 100%;
        padding-bottom: 56.25%;
        position: relative;
        background: var(--black);
    }
    video,
    .canvas-wrap canvas {
        @include fill;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
