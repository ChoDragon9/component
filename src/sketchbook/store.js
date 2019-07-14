import {createStore} from '../core/store'
import {load} from "./helper";

let state = {
  coordinates: [
    'defaultRect',
    'defaultTriangle'
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
  selectedPoint: {
    index: null,
    key: null
  },
  selectedPolygon: {
    key: null
  },
  prevCoordinate: null
}

const storageState = load()
if (storageState) {
	state = {...state, ...storageState}
	console.log(state)
}

export const store = createStore(state)