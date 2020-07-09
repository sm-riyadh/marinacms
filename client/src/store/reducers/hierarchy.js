import cloneDeep from 'lodash.clonedeep'

import { HIERARCHY } from '../constants'

const initialState = {
  hierarchy_id : '',
  hierarchy    : {
    assets      : {
      base : [],
    },
    liabilities : {
      base : [],
    },
    equities    : {
      base : [],
    },
    expenses    : {
      base : [],
    },
    incomes     : {
      base : [],
    },
  },
  status       : {
    success : false,
    request : false,
    failed  : false,
    message : '',
  },
}

const hierarchy = (state = initialState, { type, payload }) => {
  switch (type) {
    case HIERARCHY.SAVE.REPLACE: {
      const newState = { ...state }
      newState[payload.key] = payload.data
      return newState
    }
    case HIERARCHY.SAVE.ADDAT: {
      const newState = cloneDeep(state)

      const { type, location, id } = payload.data

      if (newState[payload.key][type][location]) {
        newState[payload.key][type][location].push(id)
      } else {
        newState[payload.key][type] = { ...newState[payload.key][type], [location]: [ id ] }
      }

      return newState
    }
    case HIERARCHY.STATUS.SUCCESS: {
      const newState = cloneDeep(state)
      newState.status.request = false
      newState.status.success = true

      return newState
    }
    case HIERARCHY.STATUS.REQUEST: {
      const newState = cloneDeep(state)
      newState.status.success = false
      newState.status.failed = false
      newState.status.request = true

      return newState
    }
    case HIERARCHY.STATUS.FAILED: {
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

export default hierarchy
