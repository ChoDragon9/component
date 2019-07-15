import {store} from './store'
import {component} from '../core/component'
import {
	addPoint, calibrateCoordinate, changeCoordinate, clearSelectedPoint, createGeometry,
	selectPoint
} from './mutation'
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
      ['svg', 'onmousemove', 'onMouseMove'],
      ['svg', 'onclick', 'onClick']
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
	    onClick (event) {
		    const {pageX, pageY} = event
        const {x, y} = calibrateCoordinate({pageX, pageY})
        const currentPoint = store.get('currentPoint')
        const currentPolygon = store.get('currentPolygon') || `custom_${Date.now()}`
        switch (currentPoint) {
          case 0: // Line 가능
            store.set('currentPolygon', currentPolygon)
	          createGeometry(currentPolygon, [[x, y], [x, y]])
	          selectPoint({coordinateKey: currentPolygon, pointIndex: 1})
	          store.set('currentPoint', 1)
            break
	        case 1:
	        case 2:
		        addPoint({coordinateKey: currentPolygon, coordinate: [x, y]})
		        selectPoint({coordinateKey: currentPolygon, pointIndex: currentPoint + 1})
		        store.set('currentPoint', currentPoint + 1)
		        break
	        case 3:
		        addPoint({coordinateKey: currentPolygon, coordinate: [x, y]})
		        clearSelectedPoint()
		        store.set('currentPoint', 0)
		        store.set('currentPolygon', null)
		        break
        }
      }
    }
  },
  beforeCreate ({render}) {
    store.watch('coordinates', render)
  }
})
