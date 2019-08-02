import {component} from '../../core/component'
import {ListComponent} from "./ListComponent";
import {ButtonComponent} from "./ButtonComponent";

export const EntryComponent = component({
  data () {
    return {
      message: 'Hello World',
      btn: 'Click!',
	    list: [
	    	'Apple',
		    'Orange',
		    'Banana'
	    ]
    }
  },
  template ({data, props}) {
    const {message, btn} = data
    return `<div>
      <h1>${message}</h1>
      <button class="my-btn">${btn}</button>
      <h2>Props: ${props}</h2>
      <button-component></button-component>
      <list-component props="list"></list-component>
    </div>`
  },
	components () {
  	return [
  		['list-component', ListComponent],
		  ['button-component', ButtonComponent]
	  ]
	},
  events () {
    return [
      ['button.my-btn', 'onclick', 'onClick'],
    ]
  },
  methods () {
    return {
      onClick() {
        this.alert()
      },
      alert () {
	      alert('Hello World')
      }
    }
  },
	beforeCreate ({props, data}) {
  	console.log('beforeCreate', {props, data})
	},
	created ({dom, render, props, data}) {
		console.log('created', {dom, render, props, data})
	}
})