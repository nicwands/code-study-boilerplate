<template>
    <section class="study-body">
        <!-- SELECT IMAGE -->
        <span>IMAGE</span>
        <select v-model="selectedImage">
            <option
                v-for="(image, i) in images"
                :value="image.url"
                :selected="image.url === selectedImage"
                :key="i"
            >
                {{ image.name }}
            </option>
        </select>

        <!-- SELECT VIDEO -->
        <span>VIDEO</span>
        <select v-model="selectedVideo">
            <option
                v-for="(video, i) in videos"
                :value="video.url"
                :selected="video.url === selectedVideo"
                :key="i"
            >
                {{ video.name }}
            </option>
        </select>

        <!-- IMAGE ONLY -->
        <h4>IMAGE ONLY</h4>
        <clippy class="text-clip" :imageSrc="selectedImage"> CTHDRL </clippy>
        <clippy class="svg-clip" :imageSrc="selectedImage">
            <svg-social-twitter />
        </clippy>

        <!-- VIDEO -->
        <h4>WITH VIDEO</h4>
        <clippy
            class="text-clip"
            :imageSrc="selectedImage"
            :videoSrc="selectedVideo"
        >
            CTHDRL
        </clippy>
        <clippy
            class="svg-clip"
            :imageSrc="selectedImage"
            :videoSrc="selectedVideo"
        >
            <svg-social-facebook />
        </clippy>

        <!-- HOVER -->
        <h4>REVEAL ON HOVER</h4>
        <clippy
            class="text-clip"
            :imageSrc="selectedImage"
            :videoSrc="selectedVideo"
            showOnHover
        >
            CTHDRL
        </clippy>
        <clippy
            class="svg-clip"
            :imageSrc="selectedImage"
            :videoSrc="selectedVideo"
            showOnHover
        >
            <svg-social-instagram />
        </clippy>
    </section>
</template>

<script>
export default {
    data() {
        return {
            selectedImage:
                'https://alpacapower.co.uk/wp-content/uploads/2013/07/073.jpg',
            selectedVideo:
                'https://prismic-io.s3.amazonaws.com/cthdrl/2a24e61d-f79b-4167-8f2a-dbbeeb243bd9_FL_Desktop_2B.mp4',
        }
    },
    computed: {
        images() {
            return [
                {
                    name: 'Alpaca',
                    url: 'https://alpacapower.co.uk/wp-content/uploads/2013/07/073.jpg',
                },
                {
                    name: 'Sheep',
                    url: 'https://images.complex.com/complex/image/upload/c_fill,g_center,w_1200/fl_lossy,pg_1,q_auto/spcukrgxinitof0jhiqp.jpg',
                },
                {
                    name: 'Chicken',
                    url: 'https://cdn.britannica.com/s:700x500/07/183407-050-C35648B5/Chicken.jpg',
                },
            ]
        },
        videos() {
            return [
                {
                    name: 'Foot Locker',
                    url: 'https://prismic-io.s3.amazonaws.com/cthdrl/2a24e61d-f79b-4167-8f2a-dbbeeb243bd9_FL_Desktop_2B.mp4',
                },
                {
                    name: 'Buntin',
                    url: 'https://prismic-io.s3.amazonaws.com/cthdrl/8a7d866d-7286-474b-82f7-93b033578e80_Buntin_CS_site.mp4',
                },
                {
                    name: 'FWB',
                    url: 'https://prismic-io.s3.amazonaws.com/cthdrl/a6cd93f2-c71a-4c10-bfa2-7b6f50ab95ca_FWB_CS_Gate.mp4',
                },
            ]
        },
    },
}
</script>

<style lang="scss">
.study-body {
    border: 1px solid var(--black);
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;

    h4 {
        margin: 10px 0;
    }
    .text-clip {
        font-weight: bold;
        font-family: var(--font-sans);
        font-size: 90px;
    }
    .svg-clip {
        display: block;
        width: 50px;
    }
}
</style>
