import mongoose from 'mongoose'

const BranchSchema = new mongoose.Schema({
  name                  : {
    type      : String,
    minlength : 1,
    unique    : true,
    trim      : true,
    required  : true,
  },
  cashAccount: {
    type : mongoose.Schema.ObjectId,
  },
  dueFromFolder           : {
    type : mongoose.Schema.ObjectId,
  },
  dueToFolder           : {
    type : mongoose.Schema.ObjectId,
  },
  correspondingAccounts : {
    type    : [ mongoose.Schema.ObjectId ],
    default : [],
  },
  isPrimary             : {
    type     : Boolean,
    default  : false,
    required : true,
  },
  balance               : {
    assets      : {
      type     : Number,
      default  : 0,
      required : true,
    },
    liabilities : {
      type     : Number,
      default  : 0,
      required : true,
    },
    equities    : {
      type     : Number,
      default  : 0,
      required : true,
    },
    expenses    : {
      type     : Number,
      default  : 0,
      required : true,
    },
    incomes     : {
      type     : Number,
      default  : 0,
      required : true,
    },
  },
  accountCount          : {
    assets      : {
      type     : Number,
      default  : 0,
      required : true,
    },
    liabilities : {
      type     : Number,
      default  : 0,
      required : true,
    },
    equities    : {
      type     : Number,
      default  : 0,
      required : true,
    },
    expenses    : {
      type     : Number,
      default  : 0,
      required : true,
    },
    incomes     : {
      type     : Number,
      default  : 0,
      required : true,
    },
  },
  isDisabled            : {
    type     : Boolean,
    required : true,
    default  : false,
  },
})

/* --------------------------------- PARSING --------------------------------- */

BranchSchema.methods.toJSON = function() {
  const { _id, name, balance, cashAccount, correspondingAccounts, accountCount, isPrimary, isDisabled } = this.toObject()
  return {
    id                    : _id,
    name,
    balance,
    cashAccount,
    correspondingAccounts,
    accountCount,
    isPrimary,
    isDisabled,
  }
}

/* --------------------------------- METHODS -------------------------------- */

// CODE: Fetch

BranchSchema.statics.fetchOne = id => Branch.findById(id)

BranchSchema.statics.fetch = payload => Branch.find({ ...payload })

// CODE: Create

BranchSchema.statics.create = ({ name, isPrimary }) => Branch({ name, isPrimary }).save()

// CODE: Modify

BranchSchema.statics.modify = (id, payload) =>
  Branch.findByIdAndUpdate(id, {
    $set : { ...payload },
  })

BranchSchema.statics.modifyBalance = (id, type, amount) =>
  Branch.findByIdAndUpdate(id, { $inc: { ['balance.' + type]: amount } })

BranchSchema.statics.modifyCount = (id, type) => Branch.findByIdAndUpdate(id, { $inc: { ['accountCount.' + type]: 1 } })

BranchSchema.statics.insertCorrespondingAccounts = (id, accountId) =>
  Branch.findByIdAndUpdate(id, { $push: { correspondingAccounts: accountId } })

BranchSchema.statics.enable = id =>
  Branch.findByIdAndUpdate(id, {
    $set : {
      isDisabled : false,
    },
  })

BranchSchema.statics.disable = id =>
  Branch.findByIdAndUpdate(id, {
    $set : {
      isDisabled : true,
    },
  })

// CODE: Remove

BranchSchema.statics.remove = id => Branch.findByIdAndRemove(id)

const Branch = mongoose.model('Branch', BranchSchema)

export default Branch
