import {createStore} from '../core/store'

const state = {
  coordinate: [
    [100, 100],
    [100, 400],
    [400, 400],
    [400, 100]
  ],
  selectedPoint: null,
  selectedPolygon: false,
  prevCoordinate: null
}

export const store = createStore(state)