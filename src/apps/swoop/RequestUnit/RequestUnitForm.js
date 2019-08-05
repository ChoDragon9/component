import {component} from "../../../core/component";
import {RequestUnitFieldComponent} from "./RequestUnitField";

export const RequestUnitFormComponent = component({
	data () {
		return {
			params: [],
			key: '',
			value: '',
			description: '',
		}
	},
	template ({props, data}) {
		props && (data.params = props.params)
		const selectedUnitTemplate =
			props ?
				`
				<table>
					<tr>
						<td>Method</td>
						<td>
							<input 
								type="text" 
								value="${props.method}"
								class="unit-method">
						</td>
					</tr>
					<tr>
						<td>Url</td>
						<td>
							<input 
								type="text" 
								value="${props.url}"
								class="unit-url">
						</td>
					</tr>
					<tr>
						<td>Params</td>
						<td>
							<field 
								props="params"
								on="onChangeParams"></field>
						</td>
					</tr>
					<tr>
						<td>Headers</td>
					</tr>
					<tr>
						<td>Body Type</td>
						<td>
							<input 
								type="text" 
								value="${props.body.type}"
								readonly>
						</td>
					</tr>
				</table>
				<button
					type="button" 
					class="delete">삭제</button>
				<button
					type="button" 
					class="save">저장</button>
				` :
				`Empty`

		return `<div style="width: 80%; float: left;">
			<h3>Selected Unit</h3>
			${selectedUnitTemplate}
		</div>`
	},
	components () {
		return [
			['field', RequestUnitFieldComponent]
		]
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
			},
			onChangeParams (params) {
				props.params = params
			}
		}
	}
})