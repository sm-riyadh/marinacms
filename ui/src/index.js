import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './global.scss'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './conatiner/App'

ReactDOM.render(
  <Router>
    <StrictMode>
      <App />
    </StrictMode>
  </Router>,
  document.getElementById('root')
)

serviceWorker.unregister()
