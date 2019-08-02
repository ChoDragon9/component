import {EntryComponent} from './EntryComponent'
import {getElem} from "../../core/component"

window.onload = () => {
  getElem('#container')[0]
    .appendChild(EntryComponent('Hello World'))
}
