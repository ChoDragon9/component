import {store} from './store'
import {component} from '../core/component'
import {changeCoordinate} from './mutation'
import {Line} from './Line'
import {Circle} from './Circle'
import {Polygon} from './Polygon'

export const Sketchbook = component({
  template () {
    const coordinates = store.get('coordinates')
    const html = coordinates.map(key => {
      return `<polygon props="${key}"></polygon>
      <line props="${key}"></line>
      <circle props="${key}"></circle>`
    })
    return `
      <div class="sketchbook">
        <svg width="100%"
             height="100%"
             xmlns="http://www.w3.org/2000/svg">
          ${html}
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
  },
  beforeCreate ({render}) {
    store.watch('coordinates', render)
  }
})
