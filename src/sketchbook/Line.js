import {component} from '../core/component'
import {store} from './store'

export const Line = component({
  data () {
    return {
      strokeWidth: 5,
      stroke: 'rgba(255, 102, 51)'
    }
  },
  template ({props, data}) {
    let html = ''
    for (let i = 0, len = props.length; i < len; i++) {
      const endIndex = i === len - 1 ? 0 : i + 1
      const [x1, y1] = props[i]
      const [x2, y2] = props[endIndex]

      html += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
              stroke-width="${data.strokeWidth}" stroke="${data.stroke}" data-index="${i}"></line>`
    }

    return `<g>${html}</g>`
  },
  events () {
    return [
      ['line', 'onclick', 'addPoint']
    ]
  },
  methods () {
    return {
      addPoint (event) {
        event.preventDefault()
        const {pageX, pageY, target} = event
        const index = parseInt(target.getAttribute('data-index'))
        const {left, top} = store.get('svgOffset')
        const coordinate = store.get('coordinate')
        coordinate.splice(index + 1, 0, [pageX - left, pageY - top])
        store.set('coordinate', coordinate)
      }
    }
  },
  beforeCreate ({render}) {
    store.watch('coordinate', render)
  }
})