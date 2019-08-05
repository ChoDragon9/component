import {component} from "../../../core/component";

export const RequestUnitListComponent = component({
	template ({props}) {
		const requestUnitsTemplate = props
		.map(({url}, i) => `<li data-index="${i}">${url}</li>`)
		.join('')

		return `<div style="width: 20%; float: left;">
			<h3>List</h3>
			<ul>${requestUnitsTemplate}</ul>
		</div>`
	},
	events () {
		return [
			['ul li', 'onclick', 'selectUnit']
		]
	},
	methods ({store, emit}) {
		return {
			selectUnit (event) {
				const {index} = event.target.dataset
				emit(index)
			}
		}
	}
})