import {component} from '../core/component'

export const Circle = component({
  template ({props: {name, count}}) {
    return `<div>Name ${name}, Count : ${count}</div>`
  }
})