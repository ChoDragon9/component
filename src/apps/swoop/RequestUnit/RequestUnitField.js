import {component} from "../../../core/component";

export const RequestUnitFieldComponent = component({
	data ({props}) {
		return {
			params: props,
			key: '',
			value: '',
			description: '',
		}
	},
	template ({data}) {
		const params = data.params
			.map(({key, value, description}, i) => {
				return `<tr data-index="${i}">
					<td>${key}</td>
					<td>${value}</td>
					<td>${description}</td>
				</tr>`
			})
			.join('')

		return `<div>
			<table>
				<tr>
					<td>
						<input 
							type="text"
							value="${data.key}"
							class="unit-param-key">
					</td>
					<td>
						<input 
							type="text"
							value="${data.value}"
							class="unit-param-value">
					</td>
					<td>
						<input 
							type="text"
							value="${data.description}"
							class="unit-param-description">
					</td>
					<td>
						<button
							type="button" 
							class="unit-param-save">Save</button>
					</td>
				</tr>
			</table>
			<table>${params}</table>
		</div>`
	},
	events () {
		return [
			['ul li', 'onclick', 'selectUnit'],
			['.unit-param-key', 'onkeyup', 'onChangeKey'],
			['.unit-param-value', 'onkeyup', 'onChangeValue'],
			['.unit-param-description', 'onkeyup', 'onChangeDescription'],
			['.unit-param-save', 'onclick', 'onSaveParam'],
		]
	},
	methods ({store, emit}) {
		return {
			selectUnit (event) {
				const {index} = event.target.dataset
				emit(index)
			},
			onChangeKey ({target: {value}}) {
				store.set('key', value, false)
			},
			onChangeValue ({target: {value}}) {
				store.set('value', value, false)
			},
			onChangeDescription ({target: {value}}) {
				store.set('description', value, false)
			},
			onSaveParam () {
				const params = store.get('params')
				const key = store.get('key')
				const value = store.get('value')
				const description = store.get('description')

				store.set('params', [].concat(params, {
					key,
					value,
					description
				}))
				emit(store.get('params'))
			},
		}
	}
})