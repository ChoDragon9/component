import {component} from './core/component'
import {TodoList} from './basic/TodoList'
import {Sketchbook} from './sketchbook/Sketchbook'

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