import {component} from '../core/component'
import {Line} from './Line'

export const Sketchbook = component({
  data () {
    return {
      line: [
        [100, 100],
        [100, 400],
        [400, 400],
        [400, 100]
      ]
    }
  },
  template () {
    return `
      <svg width="500"
           height="500"
           xmlns="http://www.w3.org/2000/svg" 
           xmlns:xlink="http://www.w3.org/1999/xlink">
        <line props="line"></line>
      </svg>
    `
  },
  components () {
    return [
      ['line', Line]
    ]
  }
})
