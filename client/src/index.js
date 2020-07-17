import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import './global.scss'
import './utilities.scss'

import configureStore from './store'
import { Provider } from 'react-redux'

import App from './conatiner/App'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <StrictMode>
        <App />
      </StrictMode>
    </Router>,
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
