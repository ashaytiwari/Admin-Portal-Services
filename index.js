const express = require('express')
const request = require('request')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/harryPotter/characters', (req, res) => {
  let query = req.query.queryType
  console.log(query)
  let requestUrl = 'http://hp-api.herokuapp.com/api/characters'
  if (query) {
    requestUrl = `http://hp-api.herokuapp.com/api/characters/${query}`
  }
  request(
    {
      url: requestUrl,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message })
      }

      res.json(JSON.parse(body))
    },
  )
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`listening on ${PORT}`))
