import Validator from 'validator'

const fetch = async ({ company } = {}) => {
  if (!Validator.isMongoId(company)) throw 'Wrong company ID'
}

const replace = async ({ id, type, hierarchy } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Invalid ID'
  if (!Validator.isAlphanumeric(type)) throw 'Invalid type'

  // FIXME: Validate hierarchy ids
}

export default { fetch, replace }
