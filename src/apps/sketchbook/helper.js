import {store} from './store/store'

const setStorage = value => {
	localStorage.setItem('Sketchbook', JSON.stringify(value))
}
const getStorage = () => {
	return JSON.parse(localStorage.getItem('Sketchbook'))
}

export const clear = () => {
	setStorage(null)
}

export const save = () => {
	const coordinates = store.get('coordinates')
	const coordinatesAxis = coordinates
		.reduce((acc, key) => {
			return {...acc, [key]: store.get(key) }
		}, {})
	setStorage({coordinates, ...coordinatesAxis})
}

export const load = () => getStorage()

export const createNewKey = () => `coordinate${rand()}`

export const rand = () => {
	return parseInt(Math.random() * 1000000)
}
