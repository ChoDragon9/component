import {store} from './store'
import * as _ from "../core/fp";
import {save} from "./helper";

export const createGeometry = (key, value) => {
	const coordinates = store.get('coordinates')
	store.set(key, value)
	coordinates.push(key)
	store.set('coordinates', coordinates)
	save()
}

export const changeCoordinate = ({pageX, pageY}) => {
  const {left, top} = store.get('svgOffset')
  const x = pageX - left
  const y = pageY - top

  switch (true) {
    case _.isNumber(store.get('selectedPoint').index):
      changePoint({x, y})
      break
    case _.isString(store.get('selectedPolygon').key):
      changePolygon({x, y})
      break
  }
	save()
}

export const changePoint = ({x, y}) => {
  const {index, key} = store.get('selectedPoint')
  const coordinate = store.get(key)
  coordinate[index] = [x, y]
  store.set(key, coordinate)
	save()
}

export const changePolygon = ({x, y}) => {
  const prevCoordinate = store.get('prevCoordinate')
  if (prevCoordinate === null) {
    store.set('prevCoordinate', [x, y])
  } else {
    const key = store.get('selectedPolygon').key
    const coordinate = store.get(key)
    const movedX = x - prevCoordinate[0]
    const movedY = y - prevCoordinate[1]
    const newCoord = coordinate.map(([x, y]) => [x + movedX, y + movedY])
    store.set(key, newCoord)
    store.set('prevCoordinate', [x, y])
  }
	save()
}

export const selectPoint = ({coordinateKey, pointIndex}) => {
	store.set('selectedPoint', {
		index: pointIndex,
		key: coordinateKey
	})
}

export const clearSelectedPoint = () => {
	store.set('selectedPoint', {
		index: null,
		key: null
	})
}