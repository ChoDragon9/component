import {store} from './store'
import * as _ from "../core/fp";

export const changeCoordinate = ({pageX, pageY}) => {
  const {left, top} = store.get('svgOffset')
  const x = pageX - left
  const y = pageY - top
  const coordinate = store.get('coordinate')

  switch (true) {
    case _.isNumber(store.get('selectedPoint')):
      changePoint({x, y, coordinate})
      break
    case store.get('selectedPolygon'):
      changePolygon({x, y, coordinate})
      break
  }
}

export const changePoint = ({x, y, coordinate}) => {
  const selectedPoint = store.get('selectedPoint')
  coordinate[selectedPoint] = [x, y]
  store.set('coordinate', coordinate)
}

export const changePolygon = ({x, y, coordinate}) => {
  const prevCoordinate = store.get('prevCoordinate')
  if (prevCoordinate === null) {
    store.set('prevCoordinate', [x, y])
  } else {
    const movedX = x - prevCoordinate[0]
    const movedY = y - prevCoordinate[1]
    const newCoord = coordinate.map(([x, y]) => [x + movedX, y + movedY])
    store.set('coordinate', newCoord)
    store.set('prevCoordinate', [x, y])
  }
}