import _throttle from 'lodash/throttle'

export default (selector) => {
    return {
        data() {
            return {
                clientRect: null,
                rectThrottle: 150,
            }
        },
        mounted() {
            window.addEventListener(
                'scroll',
                _throttle(this.setRect, this.rectThrottle)
            )
            window.addEventListener(
                'resize',
                _throttle(this.setRect, this.rectThrottle)
            )
            this.$nextTick(this.setRect)
        },
        methods: {
            setRect() {
                const el = selector
                    ? this.$el.querySelector(selector)
                    : this.$el
                if (el && el.getBoundingClientRect)
                    this.clientRect = el.getBoundingClientRect()
            },
        },
    }
}
