// import { createStore, applyMiddleware } from 'redux'
// import { connectRouter, routerMiddleware } from 'connected-react-router'
// import { createBrowserHistory } from 'history'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import createSagaMiddleware from 'redux-saga'

// import rootReducer from './reducers'
// import sagas from './sagas'

// export const history = createBrowserHistory()

// const sagaMiddleware = createSagaMiddleware()

// const initialState = {}
// const enhancers = []
// const middleware = [ routerMiddleware(history), sagaMiddleware ]
// /*
// if (process.env.NODE_ENV === 'development') {
//   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
//   if (typeof devToolsExtension === 'function') {
//     enhancers.push(devToolsExtension());
//   }
// }*/

// const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers)

// const configureStore = createStore(connectRouter(history)(rootReducer), initialState, composedEnhancers)

// sagaMiddleware.run(sagas)

// export default configureStore

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import rootReducer from './reducers'

const monitor = window['__SAGA_MONITOR_EXTENSION__']

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor: monitor })
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__())
      : applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
