<template>
    <main class="front-page">
        <div class="contained">
            <section class="info">
                <!-- STUDY TITLE -->
                <h1>CODE STUDY 1.0 - VHS IMAGE</h1>
                <!-- DESCRIPTION -->
                <p>
                    A reusable component for adding a VHS effect to images and
                    video
                </p>
                <!-- LINK -->
                <a
                    href="https://github.com/nicwands/code-study-boilerplate/blob/clipped-video/components/Clippy.vue"
                    target="_blank"
                    >SOURCE</a
                >
            </section>

            <study-body />
        </div>
    </main>
</template>

<script>
export default {}
</script>

<style lang="scss">
.front-page {
    > .contained {
        height: 100%;
        padding-top: var(--margin);
        padding-bottom: var(--margin);
        box-sizing: border-box;
        grid-template-rows: auto 1fr;
        display: grid;

        h1 {
            margin: 0;
            font-size: 20px;
        }
    }
}
</style>
