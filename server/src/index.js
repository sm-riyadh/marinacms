import './db/mongoose'
import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'
import { createServer } from 'http'
import socketIo from 'socket.io'

import { host, port } from './config'

// Routes
import journal from './routes/journal'
import account from './routes/account'
import branch from './routes/branch'
import hierarchy from './routes/hierarchy'
import employee from './routes/employee'
import inventory from './routes/inventory'

const app = express()
const server = createServer(app)

const io = socketIo(server, {
  perMessageDeflate : false,
  serveClient       : false,
})

// Cors Config
const whitelist = [ `http://${host}` ]
const corsOptions = {
  origin               : (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) callback(null, true)
    else callback(new Error('Not allowed by CORS'))
  },
  optionsSuccessStatus : 200,
}

// Middlewares
app.use(cors(corsOptions))
app.use(bodyparser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://${host}`)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accepcact')
  res.header('Access-Control-Allow-Methods', [ 'GET', 'POST', 'PATCH', 'DELETE' ])
  next()
})
app.use((req, res, next) => {
  res.io = io
  next()
})

const routes = [ journal, account, branch, hierarchy, employee, inventory ]

routes.map(route => app.use(route))

// Server Config

server.listen(port, () => {
  console.clear()
  console.log(`> Time: ${new Date()}\n> Host: ${host}\n> Post: ${port} \n----------------------------------------`)
})
