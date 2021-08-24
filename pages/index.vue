<template>
    <main class="front-page">
        <div class="contained">
            <h1>CODE STUDY 1.0</h1>

            <section class="study-body">
                <clipped-video
                    class="text-clip"
                    imageSrc="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.huffpost.com%2Fgen%2F3532216%2Fimages%2Fo-BABY-DUMMY-facebook.jpg&f=1&nofb=1"
                    videoSrc="https://prismic-io.s3.amazonaws.com/rumfoords/779247b4-87cb-4908-b0a1-1b0a96078fc1_Splash_BG+%281%29.mp4"
                    showOnHover
                >
                    CTHDRL
                </clipped-video>

                <clipped-video
                    class="svg-clip"
                    imageSrc="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.huffpost.com%2Fgen%2F3532216%2Fimages%2Fo-BABY-DUMMY-facebook.jpg&f=1&nofb=1"
                >
                    <svg-social-facebook />
                </clipped-video>
            </section>
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

    .study-body {
        border: 1px solid var(--black);
        padding: 20px;
        box-sizing: border-box;
        margin-top: 20px;

        .text-clip {
            font-weight: bold;
            font-family: var(--font-sans);
            font-size: 50px;
        }
        .svg-clip {
            display: block;
            width: 50px;
        }
    }
}
</style>
