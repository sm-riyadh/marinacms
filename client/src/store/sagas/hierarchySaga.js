import { call, put, takeLatest } from 'redux-saga/effects'
import Api from './api/api'

import { HIERARCHY } from '../constants'
import { hierarchyAction } from '../actions'

const { replace } = hierarchyAction.save
const { request, success, failed } = hierarchyAction.status

const url = 'hierarchy'

/* --------------------------------- SAGA middleware --------------------------------- */

// CODE: FETCH

function* handleFetch({ payload = {} }) {
  try {
    const { company } = payload

    const query = { company }
    const params = []

    yield put(request())
    const { data, error } = yield call(Api.fetch, [ url, { params, query } ])

    if (!error) {
      yield put(replace({ key: 'hierarchy_id', data: data.id }))
      yield put(replace({ key: 'hierarchy', data: data.hierarchy }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Modify

function* handleReplace({ payload = {} }) {
  try {
    const { id, type, hierarchy } = payload

    const params = [ id ]
    const body = { type, hierarchy }

    yield put(request())
    const { data, error } = yield call(Api.replace, [ url, { params, body } ])

    if (!error) {
      // yield put(replace({ key: 'hierarchy', data: { id, name } }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

/* --------------------------------- WATCHERS --------------------------------- */

function* watch() {
  yield takeLatest(HIERARCHY.SEND.FETCH, handleFetch)
  yield takeLatest(HIERARCHY.SEND.REPLACE, handleReplace)
}

export default watch
