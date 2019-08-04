import {component} from "../../../core/component";

export const RequestUnitFormComponent = component({
	template ({props}) {
		const selectedUnitTemplate =
			props ?
				`<button
					type="button" 
					class="save-unit">삭제</button>
				<input 
					type="text" 
					value="${props.method}">
				<input 
					type="text" 
					value="${props.url}"
					class="unit-url">` :
				`Empty`

		return `<div>
			<h3>Selected Unit</h3>
			${selectedUnitTemplate}
		</div>`
	},
	events () {
		return [
			['.unit-url', 'onkeyup', 'onChangeUrl'],
		]
	},
	methods ({emit, props}) {
		return {
			onChangeUrl (event) {
				props.url = event.target.value
				emit(props)
			},
		}
	}
})