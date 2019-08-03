import {component} from '../../core/component'

export const ReactiveComponent = component({
  data () {
    return {
      message: 'message',
      arr: [1, 2],
      obj: {
        key: 'value'
      },
      bool: false,
      number: 0
    }
  },
  template ({data}) {
    const {
      message,
      arr,
      obj,
      bool,
      number
    } = data
    return `<div>
			<h1>Reactive Component</h1>
			<button class="message-btn">Change Message</button>
			<button class="arr-btn">Add Arr</button>
			<button class="obj-btn">Change Obj</button>
			<button class="bool-btn">Toggle Bool</button>
			<button class="number-btn">Up Count</button>
			<hr>
			<ul>
			  <li>Message: ${message}</li>
			  <li>Arr: ${arr}</li>
			  <li>Obj: ${JSON.stringify(obj)}</li>
			  <li>Boolean: ${bool ? 'True' : 'False'}</li>
			  <li>Number: ${number}</li>
      </ul>
		</div>`
  },
  events () {
    return [
      ['button.message-btn', 'onclick', 'changeMessage'],
	    ['button.arr-btn', 'onclick', 'changeArr'],
	    ['button.obj-btn', 'onclick', 'changeObj'],
	    ['button.bool-btn', 'onclick', 'toggle'],
	    ['button.number-btn', 'onclick', 'upCount'],
    ]
  },
  methods ({store}) {
    return {
      changeMessage () {
        store.set('message', 'Now ' + Date.now())
      },
	    changeArr () {
		    const arr = store.get('arr')
		    arr.push(arr[arr.length - 1] + 1)
		    store.set('arr', arr)
	    },
	    changeObj () {
		    const obj = store.get('obj')
        Object.assign(obj, {key: Date.now()})
		    store.set('obj', obj)
	    },
      toggle () {
	      store.set('bool', !store.get('bool'))
      },
	    upCount () {
		    store.set('number', store.get('number') + 1)
      }
    }
  }
})