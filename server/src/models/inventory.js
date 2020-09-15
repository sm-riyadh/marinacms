import mongoose from 'mongoose'

const InventorySchema = new mongoose.Schema({
  branch    : {
    type : mongoose.Schema.ObjectId,
  },
  accountId : {
    type     : mongoose.Schema.ObjectId,
    required : true,
  },
  price     : {
    type : Number,
  },
  unit      : {
    type : String,
  },

  quantity  : {
    type : Number,
  },
})

InventorySchema.methods.toJSON = function() {
  const { _id, branch, accountId, price, unit, quantity } = this.toObject()

  return {
    id        : _id,
    branch,
    accountId,
    price,
    unit,
    quantity,
  }
}

/* --------------------------------- METHODS -------------------------------- */

// CODE: Fetch

InventorySchema.statics.fetchOne = id => Inventory.findById(id)

InventorySchema.statics.fetch = (branch, payload) => Inventory.find({ branch, ...payload })

// CODE: Create

InventorySchema.statics.create = ({ branch, accountId, price, unit, quantity }) =>
  Inventory({ branch, accountId, price, unit, quantity }).save()

// CODE: Modify

InventorySchema.statics.modify = (id, payload) =>
  Inventory.findByIdAndUpdate(id, {
    $set : {
      ...payload,
    },
  })

// CODE: Remove

InventorySchema.statics.remove = id => Inventory.findByIdAndRemove(id)

const Inventory = mongoose.model('Inventory', InventorySchema)

export default Inventory
