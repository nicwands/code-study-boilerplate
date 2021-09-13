<template>
    <div class="blotter">
        <!-- <vue-blotter material-type="rollingDistortMaterial"> -->
        <h1 ref="blotterText"></h1>
        <!-- </vue-blotter> -->
    </div>
</template>

<script>
export default {
    mounted() {
        var text = new Blotter.Text('Hello', {
            family: 'serif',
            size: 120,
            fill: '#171717',
        })

        var material = new Blotter.ChannelSplitMaterial()

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
