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

const create = async ({ name }) => {
  const Bewbranch = await Branch.create({ name })

  const { id } = Bewbranch
  // Creates Pre-made Accounts

  await hierarchyOps.create({
    branch    : id,
    hierarchy : {},
  })

  const { id: checkableFolderId } = await accountOps.create({
    branch   : id,
    type     : 'assets',
    name     : 'Checkable',
    path     : [],
    location : 'base',
    isFolder : true,
  })
  const { id: cashAccountId } = await accountOps.create({
    branch   : id,
    type     : 'assets',
    name     : 'Cash',
    path     : [ 'assets' ],
    location : checkableFolderId,
    isFolder : false,
  })
  const { id: bankFolderId } = await accountOps.create({
    branch   : id,
    type     : 'assets',
    name     : 'Bank',
    isSystem : true,
    path     : [ 'checkable' ],
    location : checkableFolderId,
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
    dueFromFolder : dueFromFolderId,
    dueToFolder   : dueToFolderId,
  })

  await BnterbranchDueAccounts(id, name, cashAccountId, {
    dueFromFolderId,
    dueToFolderId,
  })

  return Bewbranch
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

const BnterbranchDueAccounts = async (id, name, cashAccountId, dueFoldersIds) => {
  let companies = await Branch.find()
  companies = companies.filter(e => e.id != id)

  // HACK: Map is not waiting for await

  for (let i = 0; i < companies.length; i++) {
    const { dueFromFolder: remoteDueFromFolderId, dueToFolder: remoteDueToFolderId } = await Branch.fetchOne(
      companies[i].id
    )

    const { id: localDueFromId } = await accountOps.create({
      branch   : id,
      type     : 'liabilities',
      path     : [ 'due from' ],
      location : dueFoldersIds.dueToFolderId,
      name     : companies[i].name,
    })

    const { id: remoteDueToId } = await accountOps.create({
      branch      : companies[i].id,
      type        : 'assets',
      name        : name,
      location    : remoteDueToFolderId,
      path        : [ 'assets', 'due to' ],
      interbranch : {
        to_branch : id,
        deposit   : cashAccountId,
        due       : localDueFromId,
      },
    })

    const { id: remoteDueFromId } = await accountOps.create({
      branch   : companies[i].id,
      name     : name,
      path     : [ 'due from' ],
      type     : 'liabilities',
      location : remoteDueFromFolderId,
    })

    const { id: localDueToId } = await accountOps.create({
      branch      : id,
      type        : 'assets',
      name        : companies[i].name,
      path        : [ 'assets', 'due to' ],
      location    : dueFoldersIds.dueFromFolderId,
      interbranch : {
        to_branch : companies[i].id,
        deposit   : remoteDueFromId,
        due       : cashAccountId,
      },
    })

    // CAVEAT: Add corresponding accounts to Branch

    await Branch.insertCorrespondingAccounts(companies[i].id, localDueFromId)
    await Branch.insertCorrespondingAccounts(companies[i].id, localDueToId)
    await Branch.insertCorrespondingAccounts(id, remoteDueFromId)
    await Branch.insertCorrespondingAccounts(id, remoteDueToId)
  }
}

export default { fetch, fetchOne, create, modify, activate, deactivate, remove }
