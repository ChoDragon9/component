import {component} from '../core/component'
import {store} from "./store";

export const Circle = component({
  data () {
    return {
      radius: 10,
      fill: 'rgba(255, 102, 51)'
    }
  },
  template ({data: {radius, fill}}) {
    const coordinate = store.get('coordinate')
    const html = coordinate.reduce((html, [x, y], index) => {
      html += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" data-index="${index}"></circle>`
      return html
    }, '')

    return `<g>${html}</g>`
  },
  events () {
    return [
      ['circle', 'onmousedown', 'select'],
      ['circle', 'onmouseup', 'unselect'],
      ['circle', 'onmouseleave', 'unselect']
    ]
  },
  methods () {
    const getIndex = elem => parseInt(elem.getAttribute('data-index'))
    return {
      select (event) {
        store.set('selectedPoint', getIndex(event.target))
      },
      unselect () {
        store.set('selectedPoint', null)
      }
    }
  },
  beforeCreate ({render}) {
    store.watch('coordinate', render)
  }
})