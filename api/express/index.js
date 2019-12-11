const express = require("express");
const url = require("url");
const path = require("path");
const loadJsonFile = require("load-json-file");

const ApiResponse = require("./lib/ApiResponse");
const Validators = require("./lib/Validators");
const APIKey = require("./lib/APIKey");

const Users = require("./controllers/Users");

const app = express();

app.disable("x-powered-by");
app.set("json spaces", 2);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.get("*", (req, res) => {
  var authorizationHeader = req.header("Authorization");

  if (!Validators.isAuthorizationHeaderPresent(authorizationHeader)) {
    res
      .status(400)
      .json(ApiResponse.getFailure(0, "Authorization Header not provided"));
    return;
  }

  if (!Validators.isAPIKeyPresent(authorizationHeader)) {
    res.status(400).json(ApiResponse.getFailure(0, "API Key not provided"));
    return;
  }

  var apiKey = APIKey.extractApiKey(authorizationHeader);

  Users.findUserApiKey(apiKey)
    .then(docs => {
      console.log(docs);
      if (!Validators.isValuePresent(docs)) {
        res.status(400).json(ApiResponse.getFailure(0, "API Key invalid"));
        return;
      }

      if (!docs.active) {
        res.status(400).json(ApiResponse.getFailure(0, "Account inactive"));
        return;
      }

      if (!docs.verified) {
        res.status(400).json(ApiResponse.getFailure(0, "Account not verified"));
        return;
      }

      //TODO Validate the current plan of the user
      findCountry(req, res);
      console.log(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(ApiResponse.getFailure(0, "Error calling API"));
    });
});

app.all("*", (req, res) => {
  console.log("405");
  res.status(405).json({
    error: true,
    error: "only GET requests are accepted"
  });
});

function findCountry(req, res) {
  console.log("Url: " + req.url);

  //Store in variable and check for nullity, as toLowerCase called on a null object
  var country = req.url.split("/")[3].toLowerCase();
  var country = decodeURIComponent(country);
  console.log("Country: " + country);

  var detail = req.url.split("/")[4];
  console.log("Detail: " + detail);

  var countriesJson = path.join(__dirname, "../countries.json");
  var countries = loadJsonFile.sync(countriesJson);

  if (country == "" || country == "undefined") {
    var countriesKeys = Object.keys(countries);
    var countriesJsonArray = [];

    for (var key in countriesKeys)
      countriesJsonArray.push(countries[countriesKeys[key]]);

    res.json(countriesJsonArray);
  } else if (countries.hasOwnProperty(country)) {
    countryJson = countries[country];

    if (countryJson.hasOwnProperty(detail)) {
      // return specific detail ask the key
      res.json({ [detail]: countryJson[detail] });
    } else if (detail == "" || detail === undefined) {
      res.json(countries[country]);
    } else {
      res
        .status(400)
        .json(ApiResponse.getFailure(1, "Invalid Country detail specified"));
    }
  } else {
    res.status(400).json(ApiResponse.getFailure(1, "Country not found"));
  }
}

module.exports = app;
