import * as _ from '../core/fp'
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
      <div>
        <svg width="500"
             height="500"
             xmlns="http://www.w3.org/2000/svg">
          <polygon props="coordinate"></polygon>
          <line props="coordinate"></line>
          <circle props="coordinate"></circle>
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
    let prevCoord = null
    return {
      onMouseMove (event) {
        const {pageX, pageY} = event
        const {left, top} = store.get('svgOffset')
        const mousePosition = [pageX - left, pageY - top]
        const coordinate = store.get('coordinate')

        const selectedPoint = store.get('selectedPoint')
        if (_.isNumber(selectedPoint)) {
          coordinate[selectedPoint] = mousePosition
          store.set('coordinate', coordinate)
        } else {
          if (store.get('selectedPolygon')) {
            if (prevCoord === null) {
              prevCoord = mousePosition
            } else {
              const [movedX, movedY] = [
                prevCoord[0] - mousePosition[0],
                prevCoord[1] - mousePosition[1]
              ]
              coordinate.map(([x, y]) => {
                console.log([x + movedX, y + movedY])
                return [x + movedX, y + movedY]
              })
              store.set('coordinate', )
            }
          } else {
            prevCoord = null
          }
        }
      }
    }
  }
})
