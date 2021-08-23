const webpack = require('webpack')

const dotenv = require('dotenv')
dotenv.config()

const universal = {
    /*
     * Build settings
     */
    components: ['~/components'],
    build: {
        plugins: [
            new webpack.ProvidePlugin({
                _get: 'lodash/get',
            }),
        ],
        html: {
            minify: {
                minifyCSS: false,
                minifyJS: false,
            },
        },
    },

    /*
     * Global CSS
     */
    css: ['~/assets/scss/_base.scss'],

    /*
     * Env variables
     */
    env: {
        ...process.env,
    },

    /*
     * Head
     */
    head: {
        htmlAttrs: {
            lang: 'en',
        },
        title: 'Code Study',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
        ],
        link: [
            { rel: 'icon', href: '/images/favicon.png' },
            { rel: 'stylesheet', href: '/fonts/fonts.css' },
        ],
    },

    /*
     * Loading bar
     */
    loading: false,

    /*
     * Build & target
     */
    target: 'static',

    /*
     * Modules
     */
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/component-cache',
        // '@nuxtjs/gtm',
    ],

    // gtm: {
    //     id: 'GTM-P9TGQDN',
    // },

    /*
     * Plugins
     */
    plugins: ['~/plugins/bootstrap', { src: '~/plugins/browser', ssr: false }],

    /*
     * Static Site Generation
     */
    generate: {
        fallback: true,
    },

    /*
     * Style resources
     */
    styleResources: {
        scss: ['~/assets/scss/_vars.scss'],
    },
}

/*
 * Dev-only config
 */
const dev = {
    /*
     * Webpack build options
     */
    build: {
        ...universal.build,
        analyze: false,
    },
}

/*
 * Prod-only config
 */
const prod = {
    /*
     * Server middleware
     */
    // serverMiddleware: ['redirect-ssl']
}

module.exports = {
    ...universal,
    ...(process.env.NODE_ENV === 'development' ? dev : prod),
}
