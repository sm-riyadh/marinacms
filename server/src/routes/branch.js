import Router from 'express'

import Validator from './validator/branch'
import Ops from '../operations/branch'

// Express > Router
const app = Router()

// Route
const url = 'api/branch'
const socketLink = 'branch'
// CODE: Fetch

app.get(`/${url}`, async (req, res, next) => {
  try {
    const data = await Ops.fetch()

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
    const { name, isPrimary } = req.body

    // await Validator.create({ name, isPrimary })

    const data = await Ops.create({ name, isPrimary })

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
    const { name, isPrimary } = req.body

    // await Validator.modify({ id, name, isPrimary })

    const data = await Ops.modify({ id, name, isPrimary })

    // res.io.sockets.emit(socketLink, { action: 'modify', data })
    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.patch(`/${url}/:id/activate`, async (req, res, next) => {
  try {
    const { id } = req.params

    // await Validator.activate({ id })

    const data = await Ops.activate({ id })

    // res.io.sockets.emit(socketLink, { action: 'activate', data })
    return res.send(data)
  } catch (error) {
    return next(error)
  }
})
app.patch(`/${url}/:id/deactivate`, async (req, res, next) => {
  try {
    const { id } = req.params

    // await Validator.deactivate({ id })

    const data = await Ops.deactivate({ id })

    // res.io.sockets.emit(socketLink, { action: 'deactivate', data })
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

    // res.io.sockets.emit(socketLink, { action: 'remove', data })
    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

export default app
