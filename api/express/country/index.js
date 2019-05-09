const express = require('express')
const app = express()

app.set('json spaces', 2);

app.get('/country', (req, res) => {
  res.json({ hello: "country me" });
})

app.get('*', (req, res) => {
  console.log("Hello Country!");
  res.json({ hello: "country" });
})

app.all('*', (req, res) => {
  console.log("405");
  res.status(405).json({ error: 'only POST requests are accepted' })
})

module.exports = app
