import {component} from './core/component'

export const Icon = component({
  template ({props: {name, count}}) {
    return `<div>Name ${name}, Count : ${count}</div>`
  }
})