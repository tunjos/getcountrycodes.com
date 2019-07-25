const express = require('express')
const loadJsonFile = require('load-json-file');
const url = require('url')
const path = require('path');
const dynamoDB = require('./lib/dynamoDB');

const app = express();

app.set('json spaces', 2);

app.get('*', (req, res) => {

  var authorizationHeader = req.header("Authorization")
//TEST
  var token
  if (authorizationHeader !== undefined) {
    token = authorizationHeader.replace('Bearer ', '')

  console.log("Url: " + req.url);

//Store in variable and check for nullity, as toLowerCase called on a null object
  var country = req.url.split('/')[3]. toLowerCase called on a null object();
  var country = decodeURIComponent(country)
  console.log("Country: " + country);

  var detail = req.url.split('/')[4]
  console.log("Detail: " + detail);

  var countriesJson = path.join(__dirname, '../countries.json')
  var countries = loadJsonFile.sync(countriesJson)

  if (country == '' || country == 'undefined') {
    var countriesKeys = Object.keys(countries)
    var countriesJsonArray = [];
    for (var key in countriesKeys)
      countriesJsonArray.push(countries[countriesKeys[key]])
    res.json(countriesJsonArray)
  } else if (countries.hasOwnProperty(country)) {
    console.log("Gets Here: ");
    countryJson = countries[country]
    if (countryJson.hasOwnProperty(detail)) {
      res.json({
        detail: countryJson[detail]
      })
    } else if (detail == '' || detail === undefined) {
      res.json(countries[country])
    } else {
      res.status(400).json({
        error: true,
        error_code: 1,
        message: 'Invalid Country detail specified'
      })
    }
  } else {
    res.status(400).json({
      error: true,
      error_code: 1,
      message: 'Country not found'
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
