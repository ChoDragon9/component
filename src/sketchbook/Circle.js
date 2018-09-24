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
    const html = props.reduce((html, [x, y]) => {
      html += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}"></circle>`
      return html
    }, '')

    return `<g>${html}</g>`
  },
  events () {
    return [
      ['line', 'onmousedown', 'onMouseDown'],
      ['line', 'onmouseup', 'onMouseUp'],
      ['line', 'onmouseleave', 'onMouseLeave']
    ]
  },
  methods () {
    return {
      onMouseDown () { console.log('onMouseDown') },
      onMouseUp () { console.log('onMouseUp') },
      onMouseLeave () { console.log('onMouseLeave') }
    }
  },
  beforeCreate ({render}) {
    store.watch('coordinate', render)
  }
})