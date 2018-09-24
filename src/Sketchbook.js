import {component} from './core/component'
import {Circle} from './Circle'
import {Icon} from './Icon'
import {Polygon} from './Polygon'

export const Sketchbook = component({
  data () {
    return {
      circle1: {name: 'Circle', count: 2},
      circle2: {name: 'Circle', count: 4},
      icon: {name: 'Icon', count: 2},
      polygon: {name: 'Polygon', count: 3}
    }
  },
  template () {
    return `
      <div>
        <circle props="circle1"></circle>
        <circle props="circle2"></circle>
        <icon props="icon"></icon>
        <polygon props="polygon"></polygon>
      </div>
    `
  },
  components () {
    return [
      ['circle', Circle],
      ['icon', Icon],
      ['polygon', Polygon]
    ]
  }
})
