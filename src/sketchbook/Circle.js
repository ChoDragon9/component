import {component} from '../core/component'
import {store} from "./store";

export const Circle = component({
  data () {
    return {
      radius: 10,
      fill: 'rgba(255, 102, 51)'
    }
  },
  template ({props, data: {radius, fill}}) {
    const html = props.reduce((html, [x, y], index) => {
      html += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" data-index="${index}"></circle>`
      return html
    }, '')

    return `<g>${html}</g>`
  },
  events () {
    return [
      ['circle', 'onmousedown', 'onMouseDown'],
      ['circle', 'onmouseup', 'onMouseUp'],
      ['circle', 'onmouseleave', 'onMouseLeave']
    ]
  },
  methods () {
    const getIndex = elem => parseInt(elem.getAttribute('data-index'))
    return {
      onMouseDown (event) {
        store.set('selectedPoint', getIndex(event.target))
      },
      onMouseUp () {
        store.set('selectedPoint', null)
      },
      onMouseLeave () {
        store.set('selectedPoint', null)
      }
    }
  },
  beforeCreate ({render}) {
    store.watch('coordinate', render)
  }
})