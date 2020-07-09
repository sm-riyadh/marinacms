import Hierarchy from '../models/hierarchy'

// CODE: Fetch

const fetch = async ({ company }) => {
  const hierarchy = await Hierarchy.fetch({ company })

  return hierarchy
}

// CODE: Create

const create = async ({ company, hierarchy }) => {
  const newHierarchy = await Hierarchy.create({ company, hierarchy })

  return newHierarchy
}

// CODE: Replace

const replace = async ({ id, type, hierarchy }) => {
  const replacedhierarchy = await Hierarchy.replace({ id, type, hierarchy })

  return replacedhierarchy
}

// CODE: Remove

const remove = async ({ id }) => {
  const removedhierarchy = await Hierarchy.remove(id)

  return removedhierarchy
}

export default { fetch, create, replace, remove }
