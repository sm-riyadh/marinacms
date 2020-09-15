import Validator from 'validator'

// CODE: Fetch

const fetch = async ({ branch }) => {
  if (!Validator.isMongoId(branch)) throw 'Wrong branch ID'
}

const fetchOne = async ({ id }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

// CODE: Create

const create = async ({ branch, accountId, price, unit, quantity }) => {
  if (!Validator.isMongoId(branch)) throw 'Wrong branch ID'
  if (!Validator.isMongoId(accountId)) throw 'Wrong branch ID'
  if (!Validator.isNumeric(price + '')) throw 'Invalid price'
  if (!Validator.isNumeric(quantity + '')) throw 'Invalid quantity'
}

// CODE: Modify

const modify = async ({ id, price, unit, quantity }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
  if (!Validator.isNumeric(price + '')) throw 'Invalid price'
  if (!Validator.isNumeric(quantity + '')) throw 'Invalid quantity'
}

// CODE: Remove

const remove = async ({ id }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

export default { fetch, fetchOne, create, modify, remove }
