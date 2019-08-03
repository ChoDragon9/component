import * as _ from './fp'
import {createStore} from "./store";
import {addEvent, getAttr, getElem} from "./helper";

/**
 * @param options
	{
		 data = _.always({}),
		 template = _.noop,
		  template({data: state, props})
		 components = _.always([]),
		 methods = _.always([]),
		 events = _.always([]),
		 beforeCreate = _.noop,
     created = _.noop
	 }
 */
export const component = (options) => (props = null) => {
  const {
	  data = _.always({}),
	  template = _.noop,
	  components = _.always([]),
	  methods = _.always([]),
	  events = _.always([]),
    beforeCreate = _.noop,
    created = _.noop
  } = options
  const state = data()
	const store = createStore(state)

  beforeCreate({props, data: state})

  const render = create({
	  state,
	  template,
	  components,
	  methods,
	  events,
	  store,
  })
  const dom = render(props)

	created({
		dom,
		props,
    data: state,
		render: replaceWith({dom, render, props}),
	})
  return dom
}

const create = ({
		state,
		template,
		components,
		methods,
		events,
		store,
  }) => props => {
  const dom = parseDOM(template({data: state, props}))
  bindEvent(events(), methods({dom, data: state, props, store}), dom)
  bindComponent(components(), dom, state)
  return dom
}

const replaceWith = ({dom, render, props}) => () => {
  const newDom = render(props)
  dom.replaceWith(newDom)
  dom = newDom
}

export const parseDOM = (template) => {
  var tmp = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  tmp.innerHTML = template
  return tmp.children[0]
}

export const bindEvent = (events, methods, dom) => {
  for (const [selector, event, methodName] of events) {
	  if (selector === 'document') {
      document[event] = addEvent(methods, methodName)
    } else {
      getElem(selector, dom).forEach(elem => {
        elem[event] = addEvent(methods, methodName)
      })
    }
  }
}

export const bindComponent = (components, dom, state) => {
	for (const [selector, component] of components) {
		getElem(selector, dom).forEach(elem => {
			replaceWith({
				dom: elem,
				render: component,
				props: getProps(elem, state)
			})()
		})
	}
}

const getProps = (elem, state) => {
  const attr = getAttr(elem, 'props')
  if (attr) {
    if (state[attr]) {
      return state[attr]
    } else {
      return attr
    }
  } else {
    return {}
  }
}