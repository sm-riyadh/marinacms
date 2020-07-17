import { all } from 'redux-saga/effects'

import journalSaga from './journalSaga'
import accountSaga from './accountSaga'
import branchSaga from './branchSaga'
import hierarchySaga from './hierarchySaga'
import settingsSaga from './settingsSaga'

export default function* rootSaga() {
  yield all([ journalSaga(), accountSaga(), branchSaga(), hierarchySaga(), settingsSaga() ])
}
