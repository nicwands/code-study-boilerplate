<template>
    <main class="front-page">
        <div class="contained">
            <!-- STUDY TITLE -->
            <h1>CODE STUDY 1.0 - CLIPPY</h1>
            <!-- DESCRIPTION -->
            <p>
                A reusable component for masking videos and images with SVGs and
                text
            </p>
            <!-- LINK -->
            <a
                href="https://github.com/nicwands/code-study-boilerplate/blob/clipped-video/components/Clippy.vue"
                >SOURCE</a
            >

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
