import {component} from "../../../core/component";

export const RequestUnitFormComponent = component({
	template ({props}) {
		const selectedUnitTemplate =
			props ?
				`<button
					type="button" 
					class="delete">삭제</button>
				<button
					type="button" 
					class="save">저장</button>
				<input 
					type="text" 
					value="${props.method}"
					class="unit-method">
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
			['.save', 'onclick', 'onSave'],
			['.delete', 'onclick', 'onDelete'],
			['.unit-method', 'onkeyup', 'onChangeMethod'],
			['.unit-url', 'onkeyup', 'onChangeUrl'],
		]
	},
	methods ({emit, props}) {
		return {
			onDelete () {
				emit(null)
			},
			onSave () {
				emit(props)
			},
			onChangeMethod ({target: {value}}) {
				props.method = value
			},
			onChangeUrl ({target: {value}}) {
				props.url = value
			}
		}
	}
})