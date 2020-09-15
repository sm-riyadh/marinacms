import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home/Home'

import Titlebar from '../component/layout/titlebar/titlebar'

// import electron from 'electron'

// const electron = window.require('electron')
// const fs = electron.remote.require('fs')
// const ipcRenderer = electron.ipcRenderer

function App() {
  return (
    <Fragment>
      <Titlebar />
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    </Fragment>
  )
}

export default App
