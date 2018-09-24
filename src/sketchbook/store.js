import {createStore} from '../core/store'

export const store = createStore()
const state = {
  coordinate: [
    [100, 100],
    [100, 400],
    [400, 400],
    [400, 100]
  ]
}

store.set('coordinate', state.coordinate)