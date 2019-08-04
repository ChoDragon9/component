import {component} from "../../core/component";
import {RequestUnitListComponent} from "./RequestUnit/RequestUnitList";
import {RequestUnitFormComponent} from "./RequestUnit/RequestUnitForm";

export const RequestUnitComponent = component({
	data () {
		return {
			requestUnits: [],
			selectedRequestUnit: null
		}
	},
	template () {
		return `<div>
      <h2>Request Unit</h2>
      <button type="button" class="add-unit">Unit 추가</button>
      <list 
      	props="requestUnits"
      	on="selectUnit"></list>
      <form 
      	props="selectedRequestUnit"
        on="onChangeUrl"></form>
    </div>`
	},
	events () {
		return [
			['.add-unit', 'onclick', 'addRequestUnit'],
		]
	},
	components () {
		return [
			['list', RequestUnitListComponent],
			['form', RequestUnitFormComponent],
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
			onChangeUrl (selectedRequestUnit) {
				store.set('selectedRequestUnit', selectedRequestUnit)
			},
			selectUnit (index) {
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