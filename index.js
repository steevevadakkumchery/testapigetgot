const express = require('express')
const cors = require('cors')
fs = require('fs');


const app = express()
app.use(cors())
app.use(express.json())

app.post('/save-highscore', (req, res) => {
  res.status(200)
  let currentData = null

  try {
    currentData = JSON.parse(fs.readFileSync('data.json', 'utf8'))
  } catch (err) {
    console.error(err)
  }
  let newScoreList = {
    highScores: [
      ...req.body.newHighScore,
      ...currentData.highScores
    ]
  }

  newScoreList.highScores.sort((a, b) => (a.score < b.score) ? 1 : -1)
  newScoreList.highScores = newScoreList.highScores.slice(0, 10)

  fs.writeFile('data.json', JSON.stringify(newScoreList), function (err) {
    if (err) return console.log(err);
    console.log(newScoreList);
  });
  res.end()
})

app.get('/get-highscore', (req, res) => {
  let scores = null
  try {
    scores = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    res.status(200)
  } catch (err) {
    res.status(500)
    console.error(err)
  }
  res.json(scores)
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