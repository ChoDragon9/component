import {createStore} from '../core/store'

const state = {
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

export const store = createStore(state)