import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
  branch      : {
    type     : mongoose.Schema.ObjectId,
    required : true,
  },
  name        : {
    type     : String,
    trim     : true,
    required : true,
  },
  type        : {
    type     : String,
    required : true,
  },
  code        : {
    type     : Number,
    min      : 100000,
    max      : 999999,
    required : true,
  },
  balance     : {
    type     : Number,
    default  : 0,
    required : true,
  },
  path        : [
    {
      type : String,
    },
  ],
  isSystem: {
    type     : Boolean,
    default  : false,
    required : true,
  },
  isFolder    : {
    type     : Boolean,
    default  : false,
    required : true,
  },
  interbranch : {
    to_branch : mongoose.Schema.ObjectId,
    deposit   : mongoose.Schema.ObjectId,
    due       : mongoose.Schema.ObjectId,
  },
  isDisabled  : {
    type     : Boolean,
    default  : false,
    required : true,
  },
  transaction : [
    {
      journal_id : mongoose.Schema.ObjectId,
    },
  ],
})

AccountSchema.methods.toJSON = function() {
  const {
    _id,
    branch,
    name,
    type,
    code,
    path,
    balance,
    interbranch,
    isSystem,
    isFolder,
    isDisabled,
    transaction,
  } = this.toObject()

  return {
    id          : _id,
    branch,
    name,
    type,
    code,
    path,
    balance,
    interbranch,
    isSystem,
    isFolder,
    isDisabled,
    transaction,
  }
}

/* --------------------------------- METHODS -------------------------------- */

// CODE: Fetch

AccountSchema.statics.fetchOne = id => Account.findById(id)

AccountSchema.statics.fetch = (branch, payload) => Account.find({ branch, ...payload })

AccountSchema.statics.fetchNonEmpty = (branch, payload) =>
  Account.find({ branch, ...payload, transacwtion: { $exists: true, $ne: [] } })

AccountSchema.statics.fetchInterBranch = id => Account.findOne({ _id: id, interbranch: { $exists: true } })

// CODE: Create

AccountSchema.statics.create = ({ branch, type, name, code, path, isSystem, isFolder, interbranch }) =>
  Account({ branch, type, name, code, path, isSystem, isFolder, interbranch }).save()

// CODE: Modify

AccountSchema.statics.modify = (id, payload) =>
  Account.findByIdAndUpdate(id, {
    $set : {
      ...payload,
    },
  })

AccountSchema.statics.modifyBalance = (id, amount) => Account.findByIdAndUpdate(id, { $inc: { balance: amount } })

AccountSchema.statics.addJournal = (id, journal_id) =>
  Account.findByIdAndUpdate(id, {
    $push : {
      transaction : { journal_id },
    },
  })

AccountSchema.statics.disable = id =>
  Account.findByIdAndUpdate(id, {
    $set : {
      isDisabled : true,
    },
  })

AccountSchema.statics.enable = id =>
  Account.findByIdAndUpdate(id, {
    $set : {
      isDisabled : false,
    },
  })

// CODE: Remove

AccountSchema.statics.remove = id => Account.findByIdAndRemove(id)

const Account = mongoose.model('Account', AccountSchema)

export default Account
