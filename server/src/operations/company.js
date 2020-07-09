import Account from '../models/account'
import Company from '../models/company'

import accountOps from './account'
import hierarchyOps from './hierarchy'

// CODE: Fetch
const fetch = async () => {
  const company = await Company.fetch()

  return company
}

const fetchDetails = async ({ id }) => {
  const company = await Company.fetchOne(id)

  return company
}

// CODE: Create

const create = async ({ name }) => {
  const newCompany = await Company.create({ name })

  const { id } = newCompany
  // Creates Pre-made Accounts

  await hierarchyOps.create({
    company   : id,
    hierarchy : {},
  })

  const { id: checkableFolderId } = await accountOps.create({
    company  : id,
    type     : 'assets',
    name     : 'Checkable',
    path     : [],
    location : 'base',
    isFolder : true,
  })
  const { id: cashAccountId } = await accountOps.create({
    company  : id,
    type     : 'assets',
    name     : 'Cash',
    path     : [ 'assets' ],
    location : checkableFolderId,
    isFolder : false,
  })
  const { id: bankFolderId } = await accountOps.create({
    company  : id,
    type     : 'assets',
    name     : 'Bank',
    path     : [ 'checkable' ],
    location : checkableFolderId,
    isFolder : true,
  })

  const { id: dueToFolderId } = await accountOps.create({
    company  : id,
    type     : 'assets',
    name     : 'Due To',
    path     : [],
    location : 'base',
    isFolder : true,
  })
  const { id: receivableFolderId } = await accountOps.create({
    company  : id,
    type     : 'assets',
    name     : 'Receivable',
    path     : [],
    location : 'base',
    isFolder : true,
  })
  const { id: payableFolderId } = await accountOps.create({
    company  : id,
    type     : 'liabilities',
    name     : 'Payable',
    path     : [],
    location : 'base',
    isFolder : true,
  })
  const { id: dueFromFolderId } = await accountOps.create({
    company  : id,
    type     : 'liabilities',
    name     : 'Due From',
    path     : [],
    location : 'base',
    isFolder : true,
  })

  await Company.modify(id, {
    dueFromFolder : dueFromFolderId,
    dueToFolder   : dueToFolderId,
  })

  await interCompanyDueAccounts(id, name, cashAccountId, {
    dueFromFolderId,
    dueToFolderId,
  })

  return newCompany
}

// CODE: Modify

const modify = async ({ id, name }) => {
  const modifiedCompany = await Company.modify(id, { name })

  if (name) {
    const { correspondingAccounts } = await Company.fetchOne(id)
    correspondingAccounts.map(id => accountOps.modify({ id, name }))
  }

  return modifiedCompany
}

const activate = async ({ id }) => {
  await Company.enable(id)
}

const deactivate = async ({ id }) => {
  await Company.disable(id)
}

// CODE: Remove

const remove = async ({ id }) => {
  const account = await Account.fetch({ company: id })

  account.map(async ({ id }) => await Account.remove(id))

  await Company.remove(id)
}

/* -------------------------------- Utilities ------------------------------- */

const interCompanyDueAccounts = async (id, name, cashAccountId, dueFoldersIds) => {
  let companies = await Company.find()
  companies = companies.filter(e => e.id != id)

  // HACK: Map is not waiting for await

  for (let i = 0; i < companies.length; i++) {
    const { dueFromFolder: remoteDueFromFolderId, dueToFolder: remoteDueToFolderId } = await Company.fetchOne(
      companies[i].id
    )

    const { id: localDueFromId } = await accountOps.create({
      company  : id,
      type     : 'liabilities',
      path     : [ 'due from' ],
      location : dueFoldersIds.dueToFolderId,
      name     : companies[i].name,
    })

    const { id: remoteDueToId } = await accountOps.create({
      company      : companies[i].id,
      type         : 'assets',
      name         : name,
      location     : remoteDueToFolderId,
      path         : [ 'assets', 'due to' ],
      intercompany : {
        to_company : id,
        deposit    : cashAccountId,
        due        : localDueFromId,
      },
    })

    const { id: remoteDueFromId } = await accountOps.create({
      company  : companies[i].id,
      name     : name,
      path     : [ 'due from' ],
      type     : 'liabilities',
      location : remoteDueFromFolderId,
    })

    const { id: localDueToId } = await accountOps.create({
      company      : id,
      type         : 'assets',
      name         : companies[i].name,
      path         : [ 'assets', 'due to' ],
      location     : dueFoldersIds.dueFromFolderId,
      intercompany : {
        to_company : companies[i].id,
        deposit    : remoteDueFromId,
        due        : cashAccountId,
      },
    })

    // CAVEAT: Add corresponding accounts to Company

    await Company.insertCorrespondingAccounts(companies[i].id, localDueFromId)
    await Company.insertCorrespondingAccounts(companies[i].id, localDueToId)
    await Company.insertCorrespondingAccounts(id, remoteDueFromId)
    await Company.insertCorrespondingAccounts(id, remoteDueToId)
  }
}

export default { fetch, fetchDetails, create, modify, activate, deactivate, remove }
