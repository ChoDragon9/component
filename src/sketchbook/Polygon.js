import {component} from '../core/component'
import {store} from "./store";

export const Polygon = component({
  data () {
    return {
      fill: 'rgba(255, 102, 51, .5)'
    }
  },
  template ({props, data: {fill}}) {
    const points = props.map(v => v.join(',')).join(' ')
    const html = `<polygon points="${points}" fill="${fill}"></polygon>`
    return `<g>${html}</g>`
  },
  beforeCreate ({render}) {
    store.watch('coordinate', render)
  }
})