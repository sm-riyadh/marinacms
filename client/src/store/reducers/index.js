import { combineReducers } from 'redux'

import journal from './journal'
import account from './account'
import branch from './branch'
import hierarchy from './hierarchy'
import settings from './settings'

const rootReducer = combineReducers({
  journal,
  account,
  branch,
  hierarchy,
  settings,
})

export default rootReducer
