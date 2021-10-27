import { resizeHandler, scrollHandler } from '~/plugins/dom-handlers'
import { throttle } from 'lodash'
import Vue from 'vue'

export let zen

// plugin
export default async ({ store, route }, inject) => {
    require('intersection-observer')
    // require('requestidlecallback-polyfill')

    // prefers-reduced-motion tie-in to store
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    store.commit('SET_PREFERS_REDUCED_MOTION', mediaQuery.matches)
    // try to update if user changes while the page is open
    if (mediaQuery && mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', () => {
            store.commit('SET_PREFERS_REDUCED_MOTION', mediaQuery.matches)
        })
    }

    // Globals extensions
    // Vue.directive('intersect', Intersect)

    // setup dom listeners
    // ~16ms is 60fps
    window.addEventListener(
        'resize',
        throttle(() => resizeHandler(store), 30)
    )
    window.addEventListener(
        'scroll',
        throttle(() => scrollHandler(store), 30)
    )

    // kick handlers
    // mouseMoveHandler({ x: 0, y: 0, v: 0 }, store)
    resizeHandler(store)
    scrollHandler(store)

    // load fonts
    store.dispatch('browser/LOAD_FONTS')
}
