<template>
    <section class="study-body">
        <client-only>
            <vhs-image :imageSrc="image" />
        </client-only>
    </section>
</template>

<script>
const imageUrl = '/images/alpaca.jpg'
// const imageUrl = '/videos/shovel.mp4'
// const imageUrl =
// ;('https://prismic-io.s3.amazonaws.com/cthdrl/cbf0be61-e359-44ea-9c37-3416fbc5d352_WW_REEL_Crop.mp4')

export default {
    data() {
        return {
            image: imageUrl,
        }
    },
}
</script>

<style lang="scss">
.study-body {
    border: 1px solid var(--black);
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    position: relative;
}
</style>
