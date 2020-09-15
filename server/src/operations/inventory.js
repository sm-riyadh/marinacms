import Employee from '../models/employee'

// CODE: Fetch

const fetch = async ({ branch }) => {
  const employee = await Employee.fetch({branch})

  return employee
}

// CODE: Create

const create = async ({ branch, accountId, price, unit, quantity }) => {
  const newEmployee = await Employee.create({ branch, accountId, price, unit, quantity })

  return newEmployee
}

// CODE: Modify

const modify = async ({ id, price, unit, quantity } = {}) => {
  await Employee.modify(id, { price, unit, quantity })
  const modifiedEmployee = await Employee.fetchOne(id)

  return modifiedEmployee
}

// CODE: Remove

const remove = async ({ id }) => {
  const removedEmployee = await Employee.remove(id)

  return removedEmployee
}

export default { fetch, create, modify, remove }
