import {component} from '../../core/component'

export const ReactiveComponent = component({
  data () {
    return {
      message: 'message',
      arr: ['1', '2'],
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
			<ul>
			  <li>Message: ${message} <button class="now">Now!</button></li>
			  <li>Arr: ${arr}</li>
			  <li>Obj: ${JSON.stringify(obj)}</li>
			  <li>Boolean: ${bool ? 'True' : 'False'}</li>
			  <li>Number: ${number}</li>
      </ul>
		</div>`
  },
  events () {
    return [
      ['button.now', 'onclick', 'changeMessage']
    ]
  },
  methods ({store}) {
    return {
      changeMessage () {
        console.log(store.get('message'))
        // store.set('message', 'Now ' + Date.now())
      }
    }
  }
})