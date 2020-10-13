import Router from 'express'
import Validator from './validator/inventory'
import Ops from '../operations/inventory'

// Express > Router
const app = Router()

// Route
const url = 'api/inventory'

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
    const { branch, accountId, price, unit, quantity } = req.body

    // await Validator.create({ branch, accountId, price, unit, quantity })

    const data = await Ops.create({ branch, accountId, price, unit, quantity })

    res.io.sockets.emit(socketLink, { action: 'add', data })
    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Modify

app.patch(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    const { price, unit, quantity } = req.body

    // await Validator.modify({ id, price, unit, quantity })

    const data = await Ops.modify({ id, price, unit, quantity })

    res.io.sockets.emit(socketLink, { action: 'modify', data })
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
