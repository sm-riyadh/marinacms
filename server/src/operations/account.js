import Account from '../models/account'
import Branch from '../models/branch'
import Hierarchy from '../models/hierarchy'

// CODE: Fetch

const fetch = async ({ branch, nonempty } = {}) => {
  let account

  if (nonempty === 'true') account = await Account.fetchNonEmpty(branch)
  else account = await Account.fetch(branch)

  // const { balance } = await Branch.fetchOne(branch)

  // const sortedAccount = { balance, ...accountSorter(account) }

  return account
}

const fetchOne = async ({ id }) => {
  const account = await Account.fetchOne(id)

  return account
}

//  CODE: Create

const create = async ({ branch, type, name, path, location, isSystem, isFolder, interbranch } = {}) => {
  //  Generate Account Code
  const { accountCount } = await Branch.fetchOne(branch)

  const code = codeGen(type, accountCount[type])

  const newAccount = await Account.create({ branch, type, name, code, path, isSystem, isFolder, interbranch })


  await Hierarchy.insert({ branch, type, location, accountId: newAccount.id })

  // Increase Account Count
  await Branch.modifyCount(branch, type)

  return newAccount
}

// CODE: Modify

const modify = async ({ id, name, path, interbranch } = {}) => {
  await Account.modify(id, { name, path, interbranch })
  const modifiedAccount = await Account.fetchOne(id)

  return modifiedAccount
}

const activate = async ({ id }) => {
  await Account.enable(id)
}

const deactivate = async ({ id }) => {
  await Account.disable(id)
}

// CODE: Remove

const remove = async ({ id }) => {
  const removedAccount = await Account.remove(id)

  return removedAccount
}

/* -------------------------------- Utilities ------------------------------- */

const codeGen = (name, count = 0) => {
  switch (name) {
    case 'assets':
      return 100000 + count + 1
    case 'liabilities':
      return 200000 + count + 1
    case 'equities':
      return 300000 + count + 1
    case 'expenses':
      return 400000 + count + 1
    case 'incomes':
      return 500000 + count + 1
  }
}
const accountSorter = account => {
  const sortedAccount = {
    assets      : [],
    liabilities : [],
    equities    : [],
    expenses    : [],
    incomes     : [],
  }
  sortedAccount.assets = account.filter(({ code }) => code > 100000 && code < 200000)
  sortedAccount.liabilities = account.filter(({ code }) => code > 200000 && code < 300000)
  sortedAccount.equities = account.filter(({ code }) => code > 300000 && code < 400000)
  sortedAccount.expenses = account.filter(({ code }) => code > 400000 && code < 500000)
  sortedAccount.incomes = account.filter(({ code }) => code > 500000 && code < 600000)

  return sortedAccount
}

export default { fetch, fetchOne, create, modify, activate, deactivate, remove }
