import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()

export const loadGltf = (url) => {
    return new Promise((resolve, reject) => {
        loader.load(url, resolve, null, reject)
    })
}
