import {component} from '../../core/component'
import {createStore} from "../../core/store";

const store = createStore({
	count: 0
})

export const CounterComponent = component({
	template () {
		const count = store.get('count')
		return `<div>
			<button class="up">Up</button>
			${count}
			<button class="down">Down</button>
		</div>`
	},
	events () {
		return [
			['.up', 'onclick', 'upCount'],
			['.down', 'onclick', 'downCount'],
		]
	},
	methods () {
		return {
			upCount () {
				const count = store.get('count')
				store.set('count', count + 1)
			},
			downCount () {
				const count = store.get('count')
				store.set('count', count - 1)
			}
		}
	},
	created ({render}) {
		store.watch('count', render)
	}
})