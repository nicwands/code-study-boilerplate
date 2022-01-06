<template>
    <div class="render-settings">
        <!-- LOADING -->
        <div v-if="loading">
            <loading-spinner />
            <p>RENDERING...</p>
        </div>

        <!-- ERROR -->
        <p v-else-if="error">An error has occured</p>

        <!-- FINAL IMAGE -->
        <a
            v-else-if="!loading && renderImage"
            :href="renderImage"
            download="houdini-render.png"
        >
            <img :src="renderImage" />
        </a>

        <!-- SETTINGS -->
        <div v-else class="settings">
            <input type="range" min="0" max="50" v-model="noiseOffset" />
            <p>Noise Offset: {{ noiseOffset }}</p>
            <button @click="submitRender">RENDER</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            noiseOffset: 0,
            renderImage: null,
            loading: false,
            error: false,
        }
    },
    methods: {
        async submitRender() {
            this.loading = true

            try {
                // const backendUrl = 'http://localhost:8008/render'
                const backendUrl = 'https://panola.ddns.net:5000/render'
                const blob = await fetch(backendUrl, {
                    method: 'POST',
                    body: JSON.stringify({
                        noise_offset: this.noiseOffset,
                    }),
                }).then((response) => {
                    return response.blob()
                })

                this.renderImage = URL.createObjectURL(blob)
                this.loading = false
            } catch (err) {
                console.error(err)
                this.error = true
                this.loading = false
            }
        },
    },
}
</script>

<style lang="scss">
.render-settings {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .settings {
        input {
            display: block;
        }
        button {
            background: var(--black);
            color: var(--white);
            padding: 5px 20px;
            border: 1px solid var(--black);
            transition: background 300ms ease, color 300ms ease;
            display: block;
            margin: 20px auto;

            &:hover {
                background: var(--white);
                color: var(--black);
            }
        }
    }
}
</style>
