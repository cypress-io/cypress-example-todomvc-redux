import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'todomvc-app-css/index.css'
import App from './components/App'
import {store} from './store'

if (window.Cypress) {
  if (window.skipRender) {
    return
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
