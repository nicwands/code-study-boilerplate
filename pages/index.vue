<template>
    <main class="front-page">
        <div class="contained">
            <section class="info">
                <!-- STUDY TITLE -->
                <h1>CODE STUDY 4.0 - TATTOO TEXTURE</h1>
                <!-- DESCRIPTION -->
                <p>A proof-of-concept for the Scab Shop tattoo NFTs</p>
                <!-- LINK -->
                <a
                    href="https://github.com/nicwands/code-study-boilerplate/blob/shader-text/components/ThreeBoilerplate.vue"
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
