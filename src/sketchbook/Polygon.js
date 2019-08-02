import {component} from '../core/component'
import {store} from "./store";

export const Polygon = component({
  data () {
    return {
      fill: 'rgba(255, 102, 51, .5)'
    }
  },
  template ({data: {fill}, props}) {
    const coordinate = store.get(props)
    const points = coordinate.map(v => v.join(',')).join(' ')
    const html = `<polygon points="${points}" fill="${fill}"></polygon>`
    return `<g>${html}</g>`
  },
  created ({render, props}) {
    store.watch(props, render)
  },
  events () {
    return [
      ['polygon', 'onmousedown', 'select'],
      ['polygon', 'onmouseup', 'unselect'],
      ['polygon', 'onmouseleave', 'unselect']
    ]
  },
  methods ({props}) {
    return {
      select () {
        store.set('selectedPolygon', { key: props })
      },
      unselect () {
        store.set('selectedPolygon', { key: null })
        store.set('prevCoordinate', null)
      }
    }
  }
})