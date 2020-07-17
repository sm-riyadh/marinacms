import mongoose from 'mongoose'

const HierarchySchema = new mongoose.Schema([
  {
    branch    : {
      type     : mongoose.Schema.ObjectId,
      required : true,
    },
    hierarchy : {
      assets      : {
        type    : {},
        default : { base: [] },
      },
      liabilities : {
        type    : {},
        default : { base: [] },
      },
      equities    : {
        type    : {},
        default : { base: [] },
      },
      expenses    : {
        type    : {},
        default : { base: [] },
      },
      incomes     : {
        type    : {},
        default : { base: [] },
      },
    },
  },
])
/* --------------------------------- PARSING --------------------------------- */

HierarchySchema.methods.toJSON = function() {
  const { _id, hierarchy } = this.toObject()

  return { id: _id, hierarchy }
}

/* --------------------------------- METHODS -------------------------------- */

// CODE: Fetch

HierarchySchema.statics.fetchOne = id => Hierarchy.findById(id)

HierarchySchema.statics.fetch = payload => Hierarchy.findOne({ ...payload })

// CODE: Create

HierarchySchema.statics.create = ({ branch, hierarchy }) => Hierarchy({ branch, hierarchy }).save()

// CODE: Replace

HierarchySchema.statics.replace = ({ id, type, hierarchy }) =>
  Hierarchy.findByIdAndUpdate(
    id,
    {
      $set : { ['hierarchy.' + type]: { ...hierarchy } },
    },
    { upsert: true }
  )

HierarchySchema.statics.insert = ({ branch, type, location = 'base', accountId }) =>
  Hierarchy.findOneAndUpdate(
    { branch },
    {
      $push : { ['hierarchy.' + type + '.' + location]: accountId },
    },
    { upsert: true }
  )

// CODE: Remove

HierarchySchema.statics.remove = id => Hierarchy.findByIdAndRemove(id)

const Hierarchy = mongoose.model('Hierarchy', HierarchySchema)

export default Hierarchy
