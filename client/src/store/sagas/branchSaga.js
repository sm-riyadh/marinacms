import { call, put, takeLatest } from 'redux-saga/effects'
import Api from './api/api'

import { BRANCH } from '../constants'
import { branchAction } from '../actions'

const { replace, addTop, modify, activate, deactivate, remove } = branchAction.save
const { request, success, failed } = branchAction.status

const url = 'branch'

/* --------------------------------- SAGA middleware --------------------------------- */

// CODE: FETCH

function* handleFetch({ payload = {} }) {
  try {
    const { id } = payload

    const params = [ id ]

    // yield put(request())
    const { data, error } = yield call(Api.fetch, [ url, { params } ])

    if (!error) {
      yield put(replace({ key: 'branch', data }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Create

function* handleCreate({ payload = {} }) {
  try {
    const { name } = payload

    const body = { name }

    yield put(request())
    const { data, error } = yield call(Api.create, [ url, { body } ])

    if (!error) {
      yield put(addTop({ key: 'branch', data }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Modify

function* handleModify({ payload = {} }) {
  try {
    const { id, name } = payload

    const params = [ id ]
    const body = { name }

    yield put(request())
    const { data, error } = yield call(Api.modify, [ url, { params, body } ])

    if (!error) {
      yield put(modify({ key: 'branch', data: { id, name } }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Activate

function* handleActivate({ payload = {} }) {
  try {
    const { id } = payload

    const params = [ id ]

    yield put(request())
    const { data, error } = yield call(Api.activate, [ url, { params } ])

    if (!error) {
      yield put(activate({ key: 'branch', data: { id } }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Deactivate

function* handleDeactivate({ payload = {} }) {
  try {
    const { id } = payload

    const params = [ id ]

    yield put(request())
    const { data, error } = yield call(Api.deactivate, [ url, { params } ])

    if (!error) {
      yield put(deactivate({ key: 'branch', data: { id } }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Remove

function* handleRemove({ payload = {} }) {
  try {
    const { id } = payload

    const params = [ id ]

    yield put(request())
    const { data, error } = yield call(Api.remove, [ url, { params } ])

    if (!error) {
      yield put(remove({ key: 'branch', data: { id } }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

/* --------------------------------- WATCHERS --------------------------------- */

function* watch() {
  yield takeLatest(BRANCH.SEND.FETCH, handleFetch)
  yield takeLatest(BRANCH.SEND.CREATE, handleCreate)
  yield takeLatest(BRANCH.SEND.MODIFY, handleModify)
  yield takeLatest(BRANCH.SEND.ACTIVATE, handleActivate)
  yield takeLatest(BRANCH.SEND.DEACTIVATE, handleDeactivate)
  yield takeLatest(BRANCH.SEND.REMOVE, handleRemove)
}

export default watch
