const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.status(200)
  res.write('hello')
  res.end()
})

app.get('/hi', (req, res) => {
  res.status(200)
  res.write('ho')
  res.end()
})

app.get('/ho', (req, res) => {
  res.status(200)
  res.write('hi')
  res.end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('started listening on port ', PORT)
})