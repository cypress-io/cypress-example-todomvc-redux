import { createStore } from 'redux'
import reducer from './reducers'

export const store = createStore(reducer)

// expose store during tests
/* istanbul ignore else */
if (window.Cypress) {
  window.store = store
}
