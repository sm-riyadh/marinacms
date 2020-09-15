import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
  branch     : {
    type : mongoose.Schema.ObjectId,
  },
  accountId  : {
    type     : mongoose.Schema.ObjectId,
    required : true,
    unique   : true,
  },
  position   : { name: { type: String, trim: true } },
  salary     : { type: Number },
  isSupended : {
    type : {
      type    : String,
      default : 'NA',
    },
  },
})

EmployeeSchema.methods.toJSON = function() {
  const { _id, branch, accountId, position, salary, isSupended } = this.toObject()

  return {
    id         : _id,
    branch,
    accountId,
    position,
    salary,
    isSupended,
  }
}

/* --------------------------------- METHODS -------------------------------- */

EmployeeSchema.statics.fetchOne = id => Employee.findById(id)

EmployeeSchema.statics.fetch = (branch, payload) => Employee.find({ branch, ...payload })

// CODE: Create

EmployeeSchema.statics.create = ({ branch, accountId, position, salary, isSupended }) =>
  Employee({ branch, accountId, position, salary, isSupended }).save()

// CODE: Modify

EmployeeSchema.statics.modify = (id, payload) =>
  Employee.findByIdAndUpdate(id, {
    $set : {
      ...payload,
    },
  })

// CODE: Remove

EmployeeSchema.statics.remove = id => Employee.findByIdAndRemove(id)

const Employee = mongoose.model('Employee', EmployeeSchema)

export default Employee
