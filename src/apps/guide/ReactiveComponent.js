import {component} from '../../core/component'
import {NowComponent} from "./NowComponent";
import {NowControllerComponent} from "./NowControllerComponent";

export const ReactiveComponent = component({
  data () {
    return {
      now: Date.now()
    }
  },
  template () {
    return `<div>
			<now props="now"></now>
			<now-controller on="changeNow"></now-controller>
		</div>`
  },
	components () {
  	return [
  	  ['now', NowComponent],
		  ['now-controller', NowControllerComponent],
	  ]
	},
  methods ({store}) {
    return {
      changeNow (data, message) {
      	console.log(message)
        store.set('now', data)
      },
    }
  }
})