import {component} from './core/component'
import {TodoList} from './TodoList'
import {Sketchbook} from './Sketchbook'

export const createApp = component({
  template () {
    return `<div>
      <todo-list></todo-list>
      <sketchbook></sketchbook>
    </div>`
  },
  components () {
    return [
      ['todo-list', TodoList],
      ['sketchbook', Sketchbook]
    ]
  }
})