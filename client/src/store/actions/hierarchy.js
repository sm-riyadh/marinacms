import { HIERARCHY } from '../constants'

// CODE: Hierarchy

const hierarchy = {
  send   : {
    fetch   : payload => ({
      type    : HIERARCHY.SEND.FETCH,
      payload,
    }),
    replace : payload => ({
      type    : HIERARCHY.SEND.REPLACE,
      payload,
    }),
  },
  save   : {
    replace : payload => ({
      type    : HIERARCHY.SAVE.REPLACE,
      payload,
    }),
    addAt   : payload => ({
      type    : HIERARCHY.SAVE.ADDAT,
      payload,
    }),
  },
  status : {
    request : payload => ({
      type    : HIERARCHY.STATUS.REQUEST,
      payload,
    }),
    success : payload => ({
      type    : HIERARCHY.STATUS.SUCCESS,
      payload,
    }),
    failed  : payload => ({
      type    : HIERARCHY.STATUS.FAILED,
      payload,
    }),
  },
}

export default hierarchy
