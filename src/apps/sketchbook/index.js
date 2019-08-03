import {createApp} from './createApp'
import {getElem} from "../../core/helper";

window.onload = () => {
  getElem('#container')[0].appendChild(createApp())
}
