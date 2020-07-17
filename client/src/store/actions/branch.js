import { BRANCH } from '../constants'

// CODE: Branch

const branch = {
  send   : {
    fetch      : payload => ({
      type    : BRANCH.SEND.FETCH,
      payload,
    }),
    create     : payload => ({
      type    : BRANCH.SEND.CREATE,
      payload,
    }),
    modify     : payload => ({
      type    : BRANCH.SEND.MODIFY,
      payload,
    }),
    activate   : payload => ({
      type    : BRANCH.SEND.ACTIVATE,
      payload,
    }),
    deactivate : payload => ({
      type    : BRANCH.SEND.DEACTIVATE,
      payload,
    }),
    remove     : payload => ({
      type    : BRANCH.SEND.REMOVE,
      payload,
    }),
  },
  save   : {
    replace    : payload => ({
      type    : BRANCH.SAVE.REPLACE,
      payload,
    }),
    addTop     : payload => ({
      type    : BRANCH.SAVE.ADDTOP,
      payload,
    }),
    addBottom  : payload => ({
      type    : BRANCH.SAVE.ADDBOTTOM,
      payload,
    }),
    modify     : payload => ({
      type    : BRANCH.SAVE.MODIFY,
      payload,
    }),
    activate   : payload => ({
      type    : BRANCH.SAVE.ACTIVATE,
      payload,
    }),
    deactivate : payload => ({
      type    : BRANCH.SAVE.DEACTIVATE,
      payload,
    }),
    remove     : payload => ({
      type    : BRANCH.SAVE.REMOVE,
      payload,
    }),
  },
  status : {
    request : payload => ({
      type    : BRANCH.STATUS.REQUEST,
      payload,
    }),
    success : payload => ({
      type    : BRANCH.STATUS.SUCCESS,
      payload,
    }),
    failed  : payload => ({
      type    : BRANCH.STATUS.FAILED,
      payload,
    }),
  },
}

export default branch
