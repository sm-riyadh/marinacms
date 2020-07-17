import { combineReducers } from 'redux'

import journal from './journal'
import account from './account'
import branch from './branch'
import hierarchy from './hierarchy'
import settings from './settings'
// import tree from './tree'

const rootReducer = combineReducers({
  journal,
  account,
  branch,
  hierarchy,
  settings,
  // tree
})

export default rootReducer
