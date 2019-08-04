import {component} from "../../core/component";

export const RequestUnitComponent = component({
	data () {
		return {
			requestUnits: [],
			selectedRequestUnit: null
		}
	},
	template ({data}) {
		const {requestUnits, selectedRequestUnit} = data

		const requestUnitsTemplate = requestUnits
			.map(({url}, i) => `<li data-index="${i}">${url}</li>`)
			.join('')
		const selectedUnitTemplate =
			selectedRequestUnit ?
				`<div>
					<h3>Selected Unit</h3>
					<button
						type="button" 
						class="save-unit">삭제</button>
					<input type="text" value="${selectedRequestUnit.method}">
					<input type="text" value="${selectedRequestUnit.url}" class="unit-url">
				</div>` :
				``

		return `<div>
      <h2>Request Unit</h2>
      <button type="button" class="add-unit">Unit 추가</button>
      <ul>${requestUnitsTemplate}</ul>
      ${selectedUnitTemplate}
    </div>`
	},
	events () {
		return [
			['.add-unit', 'onclick', 'addRequestUnit'],
			['.unit-url', 'onkeyup', 'onChangeUrl'],
			['ul li', 'onclick', 'selectUnit']
		]
	},
	methods ({store}) {
		return {
			addRequestUnit () {
				const requestUnits = store.get('requestUnits')
				const newUnit = {
					method: 'GET',
					url: Date.now(),
					params: [],
					headers: [],
					body: {
						type: 'none',
						data: []
					}
				}
				requestUnits.push(newUnit)
				store.set('requestUnits', requestUnits)
				store.set('selectedRequestUnit', newUnit)
			},
			onChangeUrl (event) {
				const selectedRequestUnit = store.get('selectedRequestUnit')
				selectedRequestUnit.url = event.target.value
				store.set('selectedRequestUnit', selectedRequestUnit)
			},
			selectUnit (event) {
				const {index} = event.target.dataset
				const requestUnits = store.get('requestUnits')

				store.set('selectedRequestUnit', requestUnits[index])
			}
		}
	}
})

// - [DONE] Request Unit Container
	// - [DONE] Request Unit List
	// - [DONE] Request Unit 추가
// - Request Unit
	// - 삭제 버튼
	// - HTTP 요청 버튼
	// - Method, URL 입력 폼
	// - Params / Headers / Body 탭
	// - Key-Value, Description
	// - Body의 None / json / binary / text / xml 탭