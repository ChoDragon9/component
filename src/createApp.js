import {component} from './core/component'
import {TodoList} from './basic/TodoList'
import {Sketchbook} from './sketchbook/Sketchbook'
import {store} from "./sketchbook/store";

export const createApp = component({
  template () {
    return `<div>
      <todo-list></todo-list>
      <sketchbook></sketchbook>
      <input type="button" value="Add">
    </div>`
  },
  events () {
    return [
      ['input[type="button"]', 'onclick', 'onClick']
    ]
  },
  methods () {
    return {
      onClick () {
        const rand = () => {
          return parseInt(Math.random() * 1000000)
        }

        const newKey = `coordinate${rand()}`
        const coordinates = store.get('coordinates')
        const val = [
          [100, 100],
          [100, 400],
          [400, 400],
          [400, 100]
        ]

        store.set(newKey, val)
        coordinates.push(newKey)
        store.set('coordinates', coordinates)
      }
    }
  },
  components () {
    return [
      ['todo-list', TodoList],
      ['sketchbook', Sketchbook]
    ]
  }
})