import queue from 'queue'

// Helper to get global
// store in browser
const getStore = () => {
    if (process.server) return false
    return $nuxt.$store
}

let Scrambler
export const q = queue({
    concurrency: 1,
    timeout: 500,
    autostart: true,
})

// Mark in vuex when complete
q.on('success', (a) => {
    if (q.length == 0) {
        const store = getStore()
        if (store) {
            store.commit('SCRAMBLES_COMPLETE')
        }
    }
})

const chars = '!<>-_\\/[]{}—=+*^?#________'
const scrambleSingleEl = async function (el) {
    setTimeout(() => {
        el.style.removeProperty('opacity')
    }, 25)
    const scrambler = new Scrambler()
    const text = el.innerText
    if (!text) return true

    scrambler.scramble(text, (newText) => {
        el.classList.add('scramble-ready')
        el.innerText = newText
    })

    await new Promise((res) => setTimeout(res, 200))
    return true
}

export default {
    bind: function (el) {
        el.style.opacity = 0
    },
    inserted: function (el, binding) {
        if (process.server) return false
        el.style.opacity = 0
        setTimeout(() => {
            el.classList.add('v-scramble-ready')
        }, 10)

        // import
        if (!Scrambler) {
            Scrambler = require('scrambling-text')
        }

        let childlessEls = []
        let searchEls = [el]
        let searchedCount = 0

        // Find all childless elements in this tree
        while (searchedCount < searchEls.length) {
            const targetEl = searchEls[searchedCount]
            const children = targetEl.children
            if (children && children.length) {
                searchEls = searchEls.concat([...children])
            } else {
                childlessEls.push(targetEl)
            }

            searchedCount++
        }

        // Push all to queue
        childlessEls.forEach((el) => {
            el.style.opacity = 0

            q.push(function () {
                return scrambleSingleEl(el)
            })
        })

        // If this has child elements,
        // Reveal the parent now
        if (searchedCount > 1) {
            el.style.removeProperty('opacity')
        }
    },
}
