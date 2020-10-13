import Account from '../models/account'
import Branch from '../models/branch'

import accountOps from './account'
import hierarchyOps from './hierarchy'

// CODE: Fetch
const fetch = async () => {
  const branch = await Branch.fetch()

  return branch
}

const fetchOne = async ({ id }) => {
  const branch = await Branch.fetchOne(id)

  return branch
}

// CODE: Create

const create = async ({ name, isPrimary = false }) => {
  const allBrach = await Branch.fetch()
  if (allBrach.length === 0) {
    isPrimary = true
  }
  const newbranch = await Branch.create({ name, isPrimary })

  const { id } = newbranch
  // Creates Pre-made Accounts

  await hierarchyOps.create({
    branch    : id,
    hierarchy : {},
  })

  const { id: cashAccountId } = await accountOps.create({
    branch   : id,
    type     : 'assets',
    name     : 'Cash',
    path     : [ 'assets' ],
    location : 'base',
    isFolder : false,
  })
  const { id: bankFolderId } = await accountOps.create({
    branch   : id,
    type     : 'assets',
    name     : 'Bank',
    isSystem : true,
    path     : [ 'checkable' ],
    location : 'base',
    isFolder : true,
  })

  const { id: dueToFolderId } = await accountOps.create({
    branch   : id,
    type     : 'assets',
    name     : 'Due To',
    path     : [],
    location : 'base',
    isSystem : true,
    isFolder : true,
  })
  const { id: receivableFolderId } = await accountOps.create({
    branch   : id,
    type     : 'assets',
    name     : 'Receivable',
    path     : [],
    location : 'base',
    isFolder : true,
  })
  const { id: payableFolderId } = await accountOps.create({
    branch   : id,
    type     : 'liabilities',
    name     : 'Payable',
    path     : [],
    location : 'base',
    isFolder : true,
  })
  const { id: dueFromFolderId } = await accountOps.create({
    branch   : id,
    type     : 'liabilities',
    name     : 'Due From',
    path     : [],
    location : 'base',
    isSystem : true,
    isFolder : true,
  })

  await Branch.modify(id, {
    cashAccount: cashAccountId,
    dueFromFolder : dueFromFolderId,
    dueToFolder   : dueToFolderId,
  })

  await interbranchDueAccounts(id, name, cashAccountId, {
    dueFromFolderId,
    dueToFolderId,
  })

  return newbranch
}

// CODE: Modify

const modify = async ({ id, name, isPrimary }) => {
  const modifiedbranch = await Branch.modify(id, { name, isPrimary })

  if (name) {
    const { correspondingAccounts } = await Branch.fetchOne(id)
    correspondingAccounts.map(id => accountOps.modify({ id, name }))
  }

  return modifiedbranch
}

const activate = async ({ id }) => {
  await Branch.enable(id)
}

const deactivate = async ({ id }) => {
  await Branch.disable(id)
}

// CODE: Remove

const remove = async ({ id }) => {
  const account = await Account.fetch({ branch: id })

  account.map(async ({ id }) => await Account.remove(id))

  await Branch.remove(id)
}

/* -------------------------------- Utilities ------------------------------- */

const interbranchDueAccounts = async (id, name, cashAccountId, {dueToFolderId, dueFromFolderId}) => {
  let companies = await Branch.find()
  companies = companies.filter(e => e.id != id)

  // HACK: Map is not waiting for await

  for (const company of companies) {
    const { dueFromFolder: remoteDueFromFolderId, dueToFolder: remoteDueToFolderId } = await Branch.fetchOne(company.id)

    const { id: localDueFromId } = await accountOps.create({
      branch   : id,
      type     : 'liabilities',
      name     : company.name,
      path     : [ 'due from' ],
      location : dueFromFolderId,
    })

    const { id: remoteDueToId } = await accountOps.create({
      branch      : company.id,
      type        : 'assets',
      name        : name,
      path        : [ 'assets', 'due to' ],
      location    : remoteDueToFolderId,
      interbranch : {
        to_branch : id,
        deposit   : cashAccountId,
        due       : localDueFromId,
      },
    })

    const { id: remoteDueFromId } = await accountOps.create({
      branch   : company.id,
      name     : name,
      path     : [ 'due from' ],
      type     : 'liabilities',
      location : remoteDueFromFolderId,
    })
    const { id: localDueToId } = await accountOps.create({
      branch      : id,
      type        : 'assets',
      name        : company.name,
      path        : [ 'assets', 'due to' ],
      location    : dueToFolderId,
      interbranch : {
        to_branch : company.id,
        deposit   : remoteDueFromId,
        due       : cashAccountId,
      },
    })

    // CAVEAT: Add corresponding accounts to Branch

    await Branch.insertCorrespondingAccounts(company.id, localDueFromId)
    await Branch.insertCorrespondingAccounts(company.id, localDueToId)
    await Branch.insertCorrespondingAccounts(id, remoteDueFromId)
    await Branch.insertCorrespondingAccounts(id, remoteDueToId)
  }
}

export default { fetch, fetchOne, create, modify, activate, deactivate, remove }
