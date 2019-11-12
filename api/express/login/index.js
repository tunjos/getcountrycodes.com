const express = require("express");
const session = require("express-session");
const useragent = require("express-useragent");
const MongoDBStore = require("connect-mongodb-session")(session);
const url = require("url");
const path = require("path");

const asyncMiddleware = require("../lib/asyncMiddleware");
const ApiResponse = require("../lib/ApiResponse");
const Validators = require("../lib/Validators");
const Collections = require("../lib/Collections");
const IpGeolocation = require("../lib/IpGeolocation");

const Users = require("../controllers/Users");
const Sessions = require("../controllers/Sessions");

const app = express();

app.disable("x-powered-by");
app.set("json spaces", 2);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(useragent.express());

var store = new MongoDBStore({
  uri: process.env.GCC_MONGODB_URI,
  collection: Collections.Sessions
});
store.on("error", function(error) {
  console.log(error);
});

app.use(
  session({
    secret: "secret_value",
    name: "gcc.sid",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false
  })
);

app.post(
  "*",
  asyncMiddleware(async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if (!Validators.isValuePresent(email)) {
      res.status(400).json(ApiResponse.getFailure(0, "Email not provided"));
      return;
    }

    if (!Validators.isValidEmail(email)) {
      res.status(400).json(ApiResponse.getFailure(0, "Invalid email provided"));
      return;
    }

    if (!Validators.isValidPassword(password)) {
      res
        .status(400)
        .json(ApiResponse.getFailure(0, "Invalid password provided"));
      return;
    }

    Users.findUserLogin(email)
      .then(docs => {
        if (!Validators.isValuePresent(docs)) {
          res.status(400).json(ApiResponse.getFailure(0, "Account not found"));
          return;
        }

        if (!docs.active) {
          res.status(400).json(ApiResponse.getFailure(0, "Account inactive"));
          return;
        }

        if (Users.validatePassword(password, docs.salt, docs.password)) {
          var ip =
            req.headers["x-forwarded-for"] || req.connection.remoteAddress;
          var device = req.useragent.browser + " - " + req.useragent.platform;
          var login_history_length = 0;
          if (docs.login_history) {
            login_history_length = docs.login_history.length;
          }

          IpGeolocation.geoLocate(ip)
            .then(response => {
              var country = {
                iso_code: "",
                capital: "",
                name: ""
              };

              if (response.data.geo) {
                if (response.data.geo["country-iso-code"] != null) {
                  country.iso_code = response.data.geo["country-iso-code"];
                }
                if (response.data.geo.capital != null) {
                  country.capital = response.data.geo.capital;
                }
                if (response.data.geo["country-name"] != null) {
                  country.name = response.data.geo["country-name"];
                }
              }

              var location =
                country.iso_code +
                " - " +
                country.capital +
                ", " +
                country.name;

              Users.updateLoginHistory(
                email,
                ip,
                location,
                device,
                req.useragent.os,
                new Date(),
                login_history_length
              ).then(result => {
                if (result) {
                  console.log(result);

                  Sessions.createSession(req, res, ip, docs.hash_id);

                  var loginResponse = {
                    error: false,
                    error_code: 0,
                    message: "Login successful",
                    user: {
                      user_id: "1",
                      hash_id: docs.hash_id,
                      email: docs.email
                    }
                  };
                  res.status(200).json(loginResponse);
                  return;
                } else {
                  res
                    .status(400)
                    .json(ApiResponse.getFailure(0, "Login failure"));
                  return;
                }
              });
            })
            .catch(err => {
              res
                .status(400)
                .json(ApiResponse.getFailure(0, "Error logging in"));
              console.log(err);
            });
        } else {
          res
            .status(400)
            .json(ApiResponse.getFailure(0, "Invalid password provided"));
          return;
        }
      })
      .catch(err => {
        res.status(400).json(ApiResponse.getFailure(0, "Error logging in"));
        console.log(err);
      });
  })
);

app.all("*", (req, res) => {
  res.status(405).json(ApiResponse.getFailurePostOnly());
});

module.exports = app;
