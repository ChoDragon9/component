import {load} from "../helper";
import {createStore} from "../../../../core/store";

let state = {
	coordinates: [
		'defaultRect',
		'defaultTriangle',
		'defaultStar'
	],
	defaultRect: [
		[100, 100],
		[100, 200],
		[200, 200],
		[200, 100]
	],
	defaultTriangle: [
		[350, 100],
		[300, 200],
		[400, 200]
	],
	defaultStar: [[555, 89], [538, 124], [499, 128], [521, 162], [505, 189], [538, 188], [554, 220], [576, 186], [611, 185], [587, 152], [612, 123], [572, 125]],
	selectedPoint: {
		index: null,
		key: null
	},
	selectedPolygon: {
		key: null
	},
	prevCoordinate: null,
	currentPoint: 0,
	currentPolygon: null
}

const storageState = load()
if (storageState) {
	state = {...state, ...storageState}
}

export const store = createStore(state)