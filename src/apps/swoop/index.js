import {getElem} from "../../core/helper";
import {AppComponent} from "./App";

window.onload = () => {
  getElem('#container')[0].appendChild(AppComponent())
}
