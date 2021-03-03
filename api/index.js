import express from 'express'
import mentor from './routes/mentor'
import upload from './routes/upload'

const app = express()
app.use(express.json())

app.use('/mentor', mentor)
app.use('/upload', upload)

module.exports = app
