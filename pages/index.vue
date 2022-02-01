<template>
    <main class="front-page">
        <div class="contained">
            <section class="info">
                <!-- STUDY TITLE -->
                <h1>Scab Shop Vue Components</h1>
                <!-- DESCRIPTION -->
                <p>
                    Vue components ported over from Greg's
                    <a href="https://github.com/CTHDRL/scabshop-contracts"
                        >React library</a
                    >
                </p>
                <!-- LINK -->
                <a
                    href="https://github.com/nicwands/code-study-boilerplate/tree/scab-shop-frontend"
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
            text-transform: uppercase;
        }
    }
}
</style>
