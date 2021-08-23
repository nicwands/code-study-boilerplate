const defaultImage = '/images/og.jpg'

export default {
    head() {
        return {
            title: this.seoTitle || this.seoDefaultTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.seoDescription || this.seoDefaultDescription,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.seoDescription || this.seoDefaultDescription,
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: this.seoImage || this.seoDefaultImage,
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.seoTitle || this.seoDefaultTitle,
                },
                {
                    hid: 'og:type',
                    property: 'og:type',
                    content: this.seoType || 'website',
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.seoDescription || this.seoDefaultDescription,
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.seoTitle || this.seoDefaultTitle,
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.seoImage || this.seoDefaultImage,
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: 'summary_large_image',
                },
            ],
        }
    },
    computed: {
        seoDefaultImage() {
            const pageImage = _get(this.page, 'seo_image.url')
            const globalImage = _get(
                this.$store.state,
                'settings.seo_image.url'
            )

            return pageImage || globalImage || defaultImage
        },
        seoDefaultDescription() {
            const pageDescription = _get(this.page, 'seo_description')
            const globalDescription = _get(
                this.$store.state,
                'settings.seo_description'
            )

            return pageDescription || globalDescription || ''
        },
        seoDefaultTitle() {
            const pageTitle = _get(this.page, 'seo_title')
            const globalTitle = _get(this.$store.state, 'settings.seo_title')

            return pageTitle || globalTitle
        },
    },
}
