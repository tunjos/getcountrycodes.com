const express = require('express')
const loadJsonFile = require('load-json-file');
const url = require('url')
const path = require('path');

const app = express()

app.set('json spaces', 2);

app.get('*', (req, res) => {

  var authorizationHeader = req.header("Authorization")
  var token =  authorizationHeader.replace('Bearer ', '')

  console.log("Url: " + req.url);

  var country = req.url.split('/')[3].toLowerCase();
  var country = decodeURIComponent(country)
  console.log("Country: " + country);

  var detail = req.url.split('/')[4]
  console.log("Detail: " + detail);

  var countriesJson = path.join(__dirname, '../countries.json')
  var countries = loadJsonFile.sync(countriesJson)

  if (country == '' || country == 'undefined') {
    res.json(countries)
  } else if (countries.hasOwnProperty(country)) {
    countryJson = countries[country]
    if (countryJson.hasOwnProperty(detail)) {
      res.json({
        detail: countryJson[detail]
      })
    } else if (detail == '' || detail == 'undefined') {
      res.json(countries[country])
    } else {
      res.status(400).json({
        error: 'Invalid Country/Detail specified'
      })
    }
  } else {
    res.status(400).json({
      error: 'Invalid Country specified'
    })
  }
})

app.all('*', (req, res) => {
  console.log("405");
  res.status(405).json({
    error: true,
    error: 'only GET requests are accepted'
  })
})

module.exports = app
