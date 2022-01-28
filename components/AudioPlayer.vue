<template>
    <div class="audio-player">
        <audio src="/audio/jt-the_circle.wav" ref="audio" />
        <button @click="play">Play</button>
        <button @click="pause">Pause</button>

        <!-- Volume -->
        <label for="volume">Volume</label>
        <input
            v-model="volume"
            @input="changeVolume"
            id="volume"
            type="range"
            min="0"
            max="2"
            step="0.01"
        />

        <!-- Canvas -->
        <canvas ref="canvas" width="500" height="500" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            volume: '1',
        }
    },
    mounted() {
        // create context
        this.audioContext = new AudioContext()

        // get audio
        this.audioEl = this.$refs.audio
        const track = this.audioContext.createMediaElementSource(this.audioEl)

        /**
         * NODES
         */

        // Gain
        this.gainNode = this.audioContext.createGain()

        // Analyser
        this.analyser = this.audioContext.createAnalyser()
        this.analyser.fftSize = 2048
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
        this.analyser.getByteTimeDomainData(this.dataArray)

        /** */

        // connect source audio to destination
        track
            .connect(this.gainNode)
            .connect(this.analyser)
            .connect(this.audioContext.destination)

        // listen for end of audio
        this.audioEl.addEventListener('ended', () => {
            console.log('ended')
        })

        // Draw
        this.canvas = this.$refs.canvas
        this.ctx = this.canvas.getContext('2d')
        this.drawAudio()
    },
    methods: {
        play() {
            // check if context is in suspended state (autoplay policy)
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume()
            }

            this.audioEl.play()
        },
        pause() {
            this.audioEl.pause()
        },
        changeVolume() {
            this.gainNode.gain.value = this.volume
        },
        drawAudio() {
            requestAnimationFrame(this.drawAudio)

            this.analyser.getByteTimeDomainData(this.dataArray)

            this.ctx.fillStyle = 'rgb(200, 200, 200)'
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

            this.ctx.lineWidth = 2
            this.ctx.strokeStyle = 'rgb(0, 0, 0)'

            this.ctx.beginPath()

            var sliceWidth = (this.canvas.width * 1.0) / this.bufferLength
            var x = 0

            for (var i = 0; i < this.bufferLength; i++) {
                var v = this.dataArray[i] / 128.0
                var y = (v * this.canvas.height) / 2

                if (i === 0) {
                    this.ctx.moveTo(x, y)
                } else {
                    this.ctx.lineTo(x, y)
                }

                x += sliceWidth
            }

            this.ctx.lineTo(this.canvas.width, this.canvas.height / 2)
            this.ctx.stroke()
        },
    },
}
</script>

<style lang="scss">
.audio-player {
}
</style>
