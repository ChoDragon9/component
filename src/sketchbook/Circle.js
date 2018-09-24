import {component} from '../core/component'

export const Circle = component({
  data () {
    return {
      radius: 10,
      fill: '#ff6633'
    }
  },
  template ({props, data: {radius, fill}}) {
    const html = props.reduce((html, [x, y]) => {
      html += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}"></circle>`
      return html
    }, '')

    return `<g>${html}</g>`
  }
})