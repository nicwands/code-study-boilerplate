<template>
    <main class="front-page">
        <div class="contained">
            <h1>CODE STUDY 1.0</h1>

            <client-only>
                <clipped-video
                    text="testing"
                    imageSrc="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.huffpost.com%2Fgen%2F3532216%2Fimages%2Fo-BABY-DUMMY-facebook.jpg&f=1&nofb=1"
                    videoSrc="https://prismic-io.s3.amazonaws.com/rumfoords/779247b4-87cb-4908-b0a1-1b0a96078fc1_Splash_BG+%281%29.mp4"
                />
            </client-only>
        </div>
    </main>
</template>

<script>
export default {}
</script>

<style lang="scss">
.front-page {
    font-weight: bold;
    font-family: var(--font-sans);
}
</style>
