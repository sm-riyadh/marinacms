import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'

import { SETTINGS } from '../constants'

const initialState = {
  selected_branch    : '5f5fa2baae87662ac405baef',
  selected_branch_cash_account: '',
  sidebar_collapse   : false,
  selected_branch    : '',

  // Journal Filters
  filter_date_single : false,
  filter_type        : 'journal',
  filter_date_type   : 'voucher',
  filter_date        : 'custom',
  filter_account     : '',
  filter_voucher_id  : '',
  filter_size        : 50,
  filter_page        : 0,
  start_date         : moment().subtract(30, 'days'),
  end_date           : moment(),

  status             : {
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

      newState[payload.key] = payload.data

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
