import {component} from '../../core/component'
import {NowComponent} from "./NowComponent";

export const ReactiveComponent = component({
  data () {
    return {
      now: Date.now()
    }
  },
  template ({data}) {
    return `<div>
			<now props="now"></now>
			<button class="now-btn">Change Now</button>
		</div>`
  },
	components () {
  	return [
  	  ['now', NowComponent]
	  ]
	},
  events () {
    return [
      ['button.now-btn', 'onclick', 'changeNow'],
    ]
  },
  methods ({store}) {
    return {
      changeNow () {
        store.set('now', Date.now())
      },
    }
  }
})