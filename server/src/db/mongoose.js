import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/demodb2', { useNewUrlParser: true })
// mongoose.connect('mongodb://localhost:27017/mcalais', { useNewUrlParser: true })

export default mongoose
