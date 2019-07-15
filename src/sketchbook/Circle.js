import {component} from '../core/component'
import {store} from "./store";
import {clearSelectedPoint, hasActiveGeometry, selectPoint} from "./mutation";

export const Circle = component({
  data () {
    return {
      radius: 10,
      fill: 'rgba(255, 102, 51)'
    }
  },
  template ({data: {radius, fill}, props}) {
    const coordinate = store.get(props)
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
  methods ({props}) {
    const getIndex = elem => parseInt(elem.getAttribute('data-index'))
    return {
      select (event) {
        selectPoint({
	        coordinateKey: props,
          pointIndex: getIndex(event.target)
        })
      },
      unselect () {
        if (hasActiveGeometry()) {
          return
        }
        clearSelectedPoint()
      }
    }
  },
  beforeCreate ({render, props}) {
    store.watch(props, render)
  }
})