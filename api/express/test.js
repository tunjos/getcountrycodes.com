const express = require('express')
const app = express()
const port = 3000

app.get('/test', (req, res) => {
  console.log("Hello Test!");
  res.json({ hello: "test" });
})

app.get('*', (req, res) => {
  console.log("Hello Test!");
  res.json({ hello: "test" });
})

module.exports = app
