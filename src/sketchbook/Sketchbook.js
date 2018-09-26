import {store} from './store'
import {component} from '../core/component'
import {changeCoordinate, addCoordinate} from './mutation'
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
      <div>
        <svg width="500"
             height="500"
             xmlns="http://www.w3.org/2000/svg">
          ${html}
        </svg>
        <input type="button" value="Add">
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
      ['svg', 'onmousemove', 'onMouseMove'],
      ['input[type="button"]', 'onclick', 'onClick']
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
      },
      onClick () {
        addCoordinate()
      }
    }
  },
  beforeCreate ({render}) {
    store.watch('coordinates', render)
  }
})
