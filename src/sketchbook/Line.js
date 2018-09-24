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
              stroke-width="${data.strokeWidth}" stroke="${data.stroke}"></line>`
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
        console.log(this)
        const {pageX, pageY} = event
        const {left, top} = store.get('svgOffset')
        const coordinate = store.get('coordinate')
        coordinate.push([pageX - left, pageY - top])
        store.set('coordinate', coordinate)
      }
    }
  }
})