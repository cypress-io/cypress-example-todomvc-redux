import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import todosReducer, { TODOS_FEATURE_KEY } from './slices/todos'
import visibilityFilterReducer, {
  VISIBILITY_FILTER_FEATURE_KEY,
} from './slices/visibilityFilter'

export const store = configureStore({
  reducer: {
    [TODOS_FEATURE_KEY]: todosReducer,
    [VISIBILITY_FILTER_FEATURE_KEY]: visibilityFilterReducer,
  },
})
export const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

// expose store during tests
/* istanbul ignore else */
if (window.Cypress) {
  window.store = store
}
