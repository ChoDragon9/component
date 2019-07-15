export const createStore = (state = {}) => {
  const store = new Map()
  const subscriber = new Map()
  const set = mutation({store, subscriber})

  setDefaultState({state, set})

  return {
    set,
    delete: remove({store, subscriber}),
    get: getter({store}),
    watch: watch({subscriber})
  }
}

const setDefaultState = ({state, set}) => {
  Object.entries(state).forEach(([key, value]) => set(key, value))
}

const mutation = ({store, subscriber}) => (key, value) => {
  store.set(key, value)
  nodify({subscriber, store, key})
}

const remove = ({store, subscriber}) => key => {
	store.delete(key)
	nodify({subscriber, store, key})
}

const nodify = ({subscriber, key, store}) => {
  if (subscriber.has(key)) {
    for (const listener of subscriber.get(key)) {
      listener(store.get(key))
    }
  }
}

const getter = ({store}) => key => store.get(key)

const watch = ({subscriber}) => (key, listener) => {
  let listeners
  if (subscriber.has(key)) {
    listeners = subscriber.get(key)
  } else {
    listeners = []
  }
  listeners.push(listener)
  subscriber.set(key, listeners)
}
