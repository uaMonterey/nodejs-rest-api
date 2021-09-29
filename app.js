const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')

const {contactsRouter} = require('./routes/api')
const {authRouter} = require('./routes/api')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(cors())
app.use(express.json())
app.use(express.json({limit: 1000}))
app.use(logger(formatsLogger))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/contacts', contactsRouter)
app.use('/api/v1/users', authRouter)

app.use((_, res) => {
    res.status(404).json({message: 'Not found'})
})

app.use((err, _, res, __) => {
    const {status = 500, message = 'Server error'} = err
    res.status(status).json({status: 'error', code: status, message})
})

module.exports = app

