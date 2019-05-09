const express = require('express')
const app = express()

app.get('/card', (req, res) => res.send('Hello Card!'))

app.get('*', (req, res) => {
  console.log("Hello World!");
  res.json({ hello: "world" });
})

app.all('*', (req, res) => {
  console.log("405");
  res.status(405).json({ error: 'only POST requests are accepted' })
})

// app.listen()
module.exports = app
