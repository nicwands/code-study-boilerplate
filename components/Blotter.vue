<template>
    <div class="blotter">
        <h1 ref="blotterText"></h1>
    </div>
</template>

<script>
export default {
    async mounted() {
        var text = new Blotter.Text('Hello', {
            family: 'serif',
            size: 120,
            fill: '#171717',
        })

        var material = new Blotter.ChannelSplitMaterial()
        // const mainImageSource = `
        //     void mainImage(out vec4 mainImage, in vec2 fragCoord) {
        //         vec2 uv = fragCoord.xy / uResolution.xy;
        //         vec3 color = vec3(0.0, 0.0, 0.0);

        //         // color.r = 1.0

        //         mainImage = vec4(color, textTexture(uv).a);
        //     }
        // `

        // var material = new Blotter.ShaderMaterial(mainImageSource, {
        //     uniforms: {
        //         uColor: { type: '3f', value: [1.0, 1.0, 0.0] }, // (R, G, B)
        //     },
        // })

        var blotter = new Blotter(material, { texts: text })

        var scope = blotter.forText(text)

        scope.appendTo(this.$refs.blotterText)
    },
}
</script>

<style lang="scss">
.blotter {
}
</style>
