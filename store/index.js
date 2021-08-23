import Vue from 'vue'

export const state = () => {
    return {
        settings: {},
        allIssues: null,
        walletOverlayOpen: false,
        servicesOverlayOpen: false,
        servicesOverlayIndex: 0,
        prefersReducedMotion: false,
    }
}

export const mutations = {
    SET_SITE_SETTINGS: (state, data) => {
        return (state.settings = data)
    },
    SET_ALL_ISSUES: (state, issues) => {
        state.allIssues = issues
    },
    OPEN_WALLET_OVERLAY: (state) => {
        state.walletOverlayOpen = true
    },
    CLOSE_WALLET_OVERLAY: (state) => {
        state.walletOverlayOpen = false
    },
    OPEN_SERVICES_OVERLAY: (state) => {
        state.servicesOverlayOpen = true
    },
    CLOSE_SERVICES_OVERLAY: (state) => {
        state.servicesOverlayOpen = false
    },
    SET_SERVICES_OVERLAY_INDEX: (state, index) => {
        state.servicesOverlayIndex = index
    },
    SET_PREFERS_REDUCED_MOTION: (state, newVal) => {
        state.prefersReducedMotion = newVal
    },
}

export const actions = {}

export const getters = {}
