import {component} from '../core/component'
import {store} from './store'
import {Line} from './Line'
import {Circle} from './Circle'
import {Polygon} from './Polygon'

export const Sketchbook = component({
  data () {
    return {
      coordinate: store.get('coordinate')
    }
  },
  template () {
    return `
      <svg width="500"
           height="500"
           xmlns="http://www.w3.org/2000/svg">
        <polygon props="coordinate"></polygon>
        <line props="coordinate"></line>
        <circle props="coordinate"></circle>
      </svg>
    `
  },
  components () {
    return [
      ['line', Line],
      ['circle', Circle],
      ['polygon', Polygon]
    ]
  },
  methods ({dom}) {
    setTimeout(() => {
      store.set('svgOffset', dom.getBoundingClientRect())
    })
  }
})
