import {createStore} from '../core/store'

const state = {
  coordinates: [],
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