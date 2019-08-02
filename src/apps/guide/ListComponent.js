import {component} from '../../core/component'

export const ListComponent = component({
  template ({props}) {
  	const html = props
		  .map(v => `<li>${v}</li>`)
		  .join('')
    return `<ul>${html}</ul>`
  }
})