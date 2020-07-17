import cloneDeep from 'lodash.clonedeep'

import { SETTINGS } from '../constants'

const initialState = {
  sidebar_collapse : false,
  selected_branch  : '',

  status           : {
    success : false,
    request : false,
    failed  : false,
    message : '',
  },
}

const journal = (state = initialState, { type, payload }) => {
  switch (type) {
    case SETTINGS.SAVE.REPLACE: {
      let newState = { ...state }

      const { status } = newState
      newState = { ...payload.data, status }

      return newState
    }
    case SETTINGS.SAVE.MODIFY: {
      const newState = cloneDeep(state)

      newState[payload.key] = payload.data.value

      return newState
    }
    case SETTINGS.STATUS.SUCCESS: {
      const newState = cloneDeep(state)

      newState.status.request = false
      newState.status.success = true

      return newState
    }
    case SETTINGS.STATUS.REQUEST: {
      const newState = cloneDeep(state)

      newState.status.success = false
      newState.status.failed = false
      newState.status.request = true

      return newState
    }
    case SETTINGS.STATUS.FAILED: {
      const newState = cloneDeep(state)

      newState.status.request = false
      newState.status.failed = true
      newState.status.message = payload

      return newState
    }
    default:
      return state
  }
}

export default journal
