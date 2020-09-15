import Router from 'express'

import Validator from './validator/journal'
import Ops from '../operations/journal'

// Express > Router
const app = Router()

// Route
const url = 'api/journal'
const socketLink = 'journal'

// CODE: Fetch

app.get(`/${url}`, async (req, res, next) => {
  try {
    const { branch, size, page, type, start_date, end_date } = req.query

    await Validator.fetch({ branch, size, page, type, start_date, end_date })

    const data = await Ops.fetch({ branch, size, page, type, start_date, end_date })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.get(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    await Validator.fetchOne({ id })

    const data = await Ops.fetchOne({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})
// CODE: Create

app.post(`/${url}`, async (req, res, next) => {
  try {
    const { date, branch, credit, credit_note, debit, debit_note, description, amount, comment } = req.body

    await Validator.create({ date, branch, credit, credit_note, debit, debit_note, description, amount, comment })

    const data = await Ops.create({
      date,
      branch,
      credit,
      credit_note,
      debit,
      debit_note,
      description,
      amount,
      comment,
    })

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

    const { date, credit_note, debit_note, description, comment } = req.body

    await Validator.modify({ id, date, credit_note, debit_note, description, comment })

    const data = await Ops.modify({ id, date, credit_note, debit_note, description, comment })

    res.io.sockets.emit(socketLink, { action: 'modify', data })
    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.patch(`/${url}/:id/activate`, async (req, res, next) => {
  try {
    const { id } = req.params

    await Validator.activate({ id })

    const data = await Ops.activate({ id })

    res.io.sockets.emit(socketLink, { action: 'activate', data })
    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.patch(`/${url}/:id/deactivate`, async (req, res, next) => {
  try {
    const { id } = req.params

    await Validator.deactivate({ id })

    const data = await Ops.deactivate({ id })

    res.io.sockets.emit(socketLink, { action: 'deactivate', data })
    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

export default app
