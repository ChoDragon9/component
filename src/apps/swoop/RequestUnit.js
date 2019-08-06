import {component} from "../../core/component";
import {RequestUnitListComponent} from "./RequestUnit/RequestUnitList";
import {RequestUnitFormComponent} from "./RequestUnit/RequestUnitForm";
import {getStorage, setStorage} from "./helper";

export const RequestUnitComponent = component({
	data () {
		const requestUnits = getStorage() || []
		return {
			requestUnits,
			selectedRequestUnit: null
		}
	},
	template () {
		return `<div>
      <h2>Request Unit</h2>
      <button type="button" class="add-unit">Unit 추가</button>
      <div>
	      <list 
	        bind-props="requestUnits"
	        on="selectUnit"></list>
	      <form 
	        bind-props="selectedRequestUnit"
	        on="onChangeUrl"></form>
        </div>
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
					url: '',
					params: [],
					headers: [],
					body: {
						type: 'json',
						data: []
					}
				}
				requestUnits.push(newUnit)
				store.set('requestUnits', requestUnits)
				store.set('selectedRequestUnit', newUnit)
			},
			onChangeUrl (selectedRequestUnit) {
				if (selectedRequestUnit === null) {
					const requestUnits = store.get('requestUnits')
					const selectedUnit = store.get('selectedRequestUnit')
					const index = requestUnits.findIndex(({url}) => url === selectedUnit.url)
					requestUnits.splice(index, 1)
					store.set('requestUnits', requestUnits)
				}
				store.set('selectedRequestUnit', selectedRequestUnit)

				setStorage(store.get('requestUnits'))
			},
			selectUnit (index) {
				const requestUnits = store.get('requestUnits')

				store.set('selectedRequestUnit', requestUnits[index])
			}
		}
	}
})

// - Request Unit
	// - HTTP 요청 버튼