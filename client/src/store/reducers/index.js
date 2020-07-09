import { combineReducers } from 'redux'

import journal from './journal'
import account from './account'
import company from './company'
import hierarchy from './hierarchy'
import settings from './settings'
// import tree from './tree'

const rootReducer = combineReducers({
  journal,
  account,
  company,
  hierarchy,
  settings,
  // tree
})

export default rootReducer
