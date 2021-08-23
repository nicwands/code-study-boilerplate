export default {
    data() {
        return {
            observer: null,
            intersected: false,
        }
    },
    mounted() {
        this.observer = new IntersectionObserver((entries) => {
            const image = entries[0]
            if (image.isIntersecting) {
                this.intersected = true
            }
        })

        this.observer.observe(this.$el)
    },
    destroyed() {
        if (this.observer) this.observer.disconnect()
    },
}
