import {createStore} from '../core/store'

const state = {
  coordinates: [
    'coordinate0',
    'coordinate1'
  ],
  coordinate0: [
    [100, 100],
    [100, 400],
    [400, 400],
    [400, 100]
  ],
  coordinate1: [
    [150, 150],
    [150, 450],
    [450, 450],
    [450, 150]
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