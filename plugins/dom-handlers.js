// mouse move handler
export const mouseMoveHandler = ({ x, y, v }, store) => {
    store.commit('browser/SET_MOUSE_POS', { x, y })
}

// window resize handler
export const resizeHandler = (store) => {
    store.commit('browser/SET_WIN_WIDTH', window.innerWidth)
    store.commit('browser/SET_WIN_HEIGHT', window.innerHeight)
    const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    )
    store.commit('browser/SET_DOC_HEIGHT', docHeight)
}

// scroll handler
export const scrollHandler = (store) => {
    const sTop = window.pageYOffset || document.documentElement.scrollTop
    store.commit('browser/SET_SCROLL_TOP', sTop)
}
