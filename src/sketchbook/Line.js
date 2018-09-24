import {component} from '../core/component'

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
  }
})