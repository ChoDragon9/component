import {store} from './store'
import {component} from '../core/component'
import {
	addPoint, calibrateCoordinate, changeCoordinate, clearCustom, clearSelectedPoint, createGeometry, removeCoordinate,
	selectPoint
} from './mutation'
import {Line} from './Line'
import {Circle} from './Circle'
import {Polygon} from './Polygon'
import {createNewKey} from "./helper";

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
      ['svg', 'onclick', 'onClick'],
	    ['document', 'onkeyup', 'onKeyUp'],
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
        const currentPolygon = store.get('currentPolygon') || createNewKey()

		    if (currentPoint === 0) {
			    store.set('currentPolygon', currentPolygon)
			    createGeometry(currentPolygon, [[x, y], [x, y]])
		    }
		    if (currentPoint >= 0 && currentPoint <= 2) {
			    selectPoint({coordinateKey: currentPolygon, pointIndex: currentPoint + 1})
			    store.set('currentPoint', currentPoint + 1)
		    }
		    if (currentPoint >= 1 && currentPoint <= 3) {
			    addPoint({coordinateKey: currentPolygon, coordinate: [x, y]})
		    }
		    if (currentPoint === 3) {
			    clearCustom()
		    }
      },
	    onKeyUp (event) {
      	const {keyCode} = event
		    if (keyCode !== 27) {
      		return
		    }
		    const currentPolygon = store.get('currentPolygon')
		    if (currentPolygon) {
			    removeCoordinate(currentPolygon)
			    clearCustom()
		    }
	    }
    }
  },
  beforeCreate ({render}) {
    store.watch('coordinates', render)
  }
})
