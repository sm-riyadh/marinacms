import Validator from 'validator'

// CODE: Fetch

const fetch = async ({ branch }) => {
  if (!Validator.isMongoId(branch)) throw 'Wrong branch ID'
}

const fetchOne = async ({ id }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

// CODE: Create

const create = async ({ branch, accountId, position, salary }) => {
  if (!Validator.isMongoId(branch)) throw 'Wrong branch ID'
  if (!Validator.isMongoId(accountId)) throw 'Wrong branch ID'
}

// CODE: Modify

const modify = async ({ id, position, salary }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
  if (salary && !Validator.isNumeric(salary + '')) throw 'Invalid salary'
}

// CODE: Remove

const remove = async ({ id }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

export default { fetch, fetchOne, create, modify, remove }
