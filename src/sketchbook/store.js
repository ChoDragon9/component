import {createStore} from '../core/store'

export const store = createStore()
const state = {
  coordinate: [
    [100, 100],
    [100, 400],
    [400, 400],
    [400, 100]
  ],
  selectedPoint: null,
  selectedPolygon: false
}

store.set('coordinate', state.coordinate)
store.set('selectedPoint', state.selectedPoint)
store.set('selectedPolygon', state.selectedPolygon)