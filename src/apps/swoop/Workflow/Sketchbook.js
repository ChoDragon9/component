import {store} from './store/store'
import {
  addPoint, calibrateCoordinate, changeCoordinate, clearCustom, createGeometry, removeCoordinate,
  selectPoint
} from './store/mutation'
import {Line} from './components/Line'
import {Circle} from './components/Circle'
import {Polygon} from './components/Polygon'
import {createNewKey} from "./helper";
import {component} from "../../../core/component";

export const Sketchbook = component({
  template() {
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
  components() {
    return [
      ['line', Line],
      ['circle', Circle],
      ['polygon', Polygon]
    ]
  },
  events() {
    return [
      ['svg', 'onmousemove', 'onMouseMove'],
      ['svg', 'onclick', 'onClick'],
      ['document', 'onkeyup', 'onKeyUp'],
    ]
  },
  methods() {
    return {
      onMouseMove(event) {
        const {pageX, pageY} = event
        changeCoordinate({pageX, pageY})
      },
      onClick(event) {
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
      onKeyUp(event) {
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
  created({dom, render}) {
    setTimeout(() => {
      store.set('svgOffset', dom.getBoundingClientRect())
    })
    store.watch('coordinates', render)
  }
})
