import Employee from '../models/employee'

// CODE: Fetch

const fetch = async ({ branch }) => {
  const employee = await Employee.fetch(branch)

  return employee
}

// CODE: Create

const create = async ({ branch, accountId, position, salary }) => {
  const newEmployee = await Employee.create({ branch, accountId, position, salary })

  return newEmployee
}

// CODE: Modify

const modify = async ({ id, position, salary, isSupended } = {}) => {
  await Employee.modify(id, { position, salary, isSupended })
  const modifiedEmployee = await Employee.fetchOne(id)

  return modifiedEmployee
}

// CODE: Remove

const remove = async ({ id }) => {
  const removedEmployee = await Employee.remove(id)

  return removedEmployee
}

export default { fetch, create, modify, remove }
