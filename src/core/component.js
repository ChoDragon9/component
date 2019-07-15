import * as _ from './fp'

export const component = (options) => (props = _.always({})) => {
  const { beforeCreate = _.noop } = options
  const render = create(options)
  let dom = render(props)
  beforeCreate({
    render: replaceWith({dom, render, props}),
    props
  })
  return dom
}

const create = ({
    data = _.always({}),
    template = _.noop,
    components = _.always([]),
    methods = _.always([]),
    events = _.always([])
  }) => props => {
  const state = data()
  const dom = parseDOM(template({data: state, props}))
  bindEvent(events(), methods({dom, data: state, props}), dom)
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
      document[event] = methods[methodName]
    } else {
      getElem(selector, dom).forEach(elem => {
        elem[event] = methods[methodName]
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

export const getElem = (selector, parent = document) => {
  return parent.querySelectorAll(selector)
}

const getAttr = (elem, attr) => elem.getAttribute(attr)