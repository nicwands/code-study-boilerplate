import loadFonts from '@fuzzco/font-loader'
import Vue from 'vue'

export const state = () => {
    return {
        fontsLoading: true,
        fontsLoaded: false,
        fontsFailed: false,
        docHeight: 675,
        winHeight: 675,
        winWidth: 1200,
        sTop: 0,
        referredFrom: null,
        mouseXVel: 0,
        mouseX: 0,
        mouseY: 0,
    }
}

export const mutations = {
    FONTS_LOADING: (state) => {
        state.fontsLoading = true
    },
    FONTS_LOADED: (state) => {
        state.fontsLoading = false
        state.fontsLoaded = true
    },
    FONTS_FAILED: (state) => {
        state.fontsLoading = false
        state.fontsFailed = true
    },
    SET_WIN_HEIGHT: (state, height) => {
        state.winHeight = height
    },
    SET_WIN_WIDTH: (state, width) => {
        state.winWidth = width
    },
    SET_SCROLL_TOP: (state, sTop) => {
        state.sTop = sTop
    },
    SET_DOC_HEIGHT: (state, height) => {
        state.docHeight = height
    },
    SET_REFERRED: (state, ref) => {
        state.referredFrom = ref
    },
    SET_MOUSE_POS: (state, { x, y }) => {
        state.mouseX = x
        state.mouseY = y
    },
    SET_MOUSE_VEL: (state, { x, y }) => {
        state.mouseXVel = x / state.winWidth
        // state.mouseYVel = y
    },
}

export const actions = {
    LOAD_FONTS: async (context) => {
        try {
            context.commit('FONTS_LOADING')
            await loadFonts([
                {
                    name: 'EB Garamund',
                    weights: [400, 700],
                },
                {
                    name: 'Poppins',
                    weights: [300, 400, 700],
                },
            ])
            context.commit('FONTS_LOADED')
        } catch (err) {
            context.commit('FONTS_FAILED')
        }
    },
}

export const getters = {
    breakpoint(state) {
        if (state.winWidth <= 750) return 'mobile'
        return 'desktop'
    },
}
