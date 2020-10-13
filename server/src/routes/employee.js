import Router from 'express'
import Validator from './validator/employee'
import Ops from '../operations/employee'

// Express > Router
const app = Router()

// Route
const url = 'api/employee'

// CODE: Fetch

app.get(`/${url}`, async (req, res, next) => {
  try {
    const { branch } = req.query

    // await Validator.fetch({ branch })

    const data = await Ops.fetch({ branch })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.get(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    // await Validator.fetchOne({ id })

    const data = await Ops.fetchOne({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Create

app.post(`/${url}`, async (req, res, next) => {
  try {
    const { branch, accountId, position, salary } = req.body

    // await Validator.create({ branch, accountId, position, salary })

    const data = await Ops.create({ branch, accountId, position, salary })

    // res.io.sockets.emit(socketLink, { action: 'add', data })
    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Modify

app.patch(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    const { position, salary } = req.body

    // await Validator.modify({ id, position, salary })

    const data = await Ops.modify({ id, position, salary })

    // res.io.sockets.emit(socketLink, { action: 'modify', data })
    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Remove

app.delete(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    // await Validator.remove({ id })

    const data = await Ops.remove({ id })

    res.io.sockets.emit(socketLink, { action: 'remove', data })
    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

export default app
