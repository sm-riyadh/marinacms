import Validator from 'validator'

import Branch from '../../models/branch'
import Account from '../../models/account'

// CODE: Fetch

const fetchOne = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

// CODE: Create

const create = async ({ name } = {}) => {
  if (!Validator.isAlphanumeric(name.split(' ').join(''))) throw 'Only letters and numbers are allowed for name'
}

// CODE: Modify

const modify = async ({ id, name, isPrimary } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
  if (!Validator.isAlphanumeric(name.split(' ').join(''))) throw 'Only letters and numbers are allowed for name'
  if (!Validator.isBoolean(isPrimary + '')) throw 'isPrimary must be a boolean'
}

const activate = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

const deactivate = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

// CODE: Remove

const remove = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'

  const branch = Branch.fetchOne(id)

  if (!branch) throw 'Branch does not exist'
  if ((await Account.fetchNonEmpty(branch.name)).length !== 0) throw 'Branch can not be removed'
}

export default { fetchOne, create, modify, activate, deactivate, remove }
