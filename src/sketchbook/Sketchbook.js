import {store} from './store'
import {component} from '../core/component'
import {changeCoordinate} from './mutation'
import {Line} from './Line'
import {Circle} from './Circle'
import {Polygon} from './Polygon'

export const Sketchbook = component({
  template () {
    return `
      <div>
        <svg width="500"
             height="500"
             xmlns="http://www.w3.org/2000/svg">
          <polygon></polygon>
          <line></line>
          <circle></circle>
        </svg>
      </div>
    `
  },
  components () {
    return [
      ['line', Line],
      ['circle', Circle],
      ['polygon', Polygon]
    ]
  },
  events () {
    return [
      ['svg', 'onmousemove', 'onMouseMove']
    ]
  },
  methods ({dom}) {
    setTimeout(() => {
      store.set('svgOffset', dom.getBoundingClientRect())
    })
    return {
      onMouseMove (event) {
        const {pageX, pageY} = event
        changeCoordinate ({pageX, pageY})
      }
    }
  }
})
