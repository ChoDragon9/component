export const setStorage = value => {
	localStorage.setItem('Swoop', JSON.stringify(value))
}
export const getStorage = () => {
	return JSON.parse(localStorage.getItem('Swoop'))
}