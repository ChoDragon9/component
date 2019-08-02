import {component} from '../../../core/component'
import {store} from '../store/store'

export const Line = component({
  data () {
    return {
      strokeWidth: 5,
      stroke: 'rgba(255, 102, 51)'
    }
  },
  template ({data, props}) {
    const coordinate = store.get(props)
    let html = ''
    for (let i = 0, len = coordinate.length; i < len; i++) {
      const endIndex = i === len - 1 ? 0 : i + 1
      const [x1, y1] = coordinate[i]
      const [x2, y2] = coordinate[endIndex]

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
  methods ({props}) {
    return {
      addPoint (event) {
        event.preventDefault()
	      event.stopPropagation()

        const {pageX, pageY, target} = event
        const index = parseInt(target.getAttribute('data-index'))
        const {left, top} = store.get('svgOffset')
        const coordinate = store.get(props)
        coordinate.splice(index + 1, 0, [pageX - left, pageY - top])
        store.set(props, coordinate)
      }
    }
  },
	created ({render, props}) {
    store.watch(props, render)
  }
})