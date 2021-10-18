<template>
    <main class="front-page">
        <div class="contained">
            <section class="info">
                <!-- STUDY TITLE -->
                <h1>CODE STUDY 3.0 - UPSHOT TECH</h1>
                <!-- DESCRIPTION -->
                <p>
                    A proof-of-concept for the tech stack of the Upshot
                    Tesseracts
                </p>
                <!-- LINK -->
                <a
                    href="https://github.com/nicwands/code-study-boilerplate/tree/upshot"
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
