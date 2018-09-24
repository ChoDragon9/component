import {component} from './core/component'

export const Polygon = component({
  template ({props: {name, count}}) {
    return `<div>Name ${name}, Count : ${count}</div>`
  }
})