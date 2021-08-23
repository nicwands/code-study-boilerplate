import _pick from 'lodash/pick'

let interval = null

export default function ({ store, from, route, redirect }) {
    if (from) {
        store.commit(
            'browser/SET_REFERRED',
            _pick(from, ['name', 'fullPath', 'path'])
        )
    }
}
