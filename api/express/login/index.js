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

const Users = require("../controllers/Users");
const Sessions = require("../controllers/Sessions");

const app = express();

app.disable("x-powered-by");
app.set("json spaces", 2);

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
    }

    if (!Validators.isValidEmail(email)) {
      res.status(400).json(ApiResponse.getFailure(0, "Invalid email provided"));
    }

    if (!Validators.isValidPassword(password)) {
      res
        .status(400)
        .json(ApiResponse.getFailure(0, "Invalid password provided"));
    }

    Users.findUserLogin(email)
      .then(docs => {
        if (!Validators.isValuePresent(docs)) {
          res.status(400).json(ApiResponse.getFailure(0, "User not found"));
        }

        if (Users.validatePassword(password, docs.salt, docs.password)) {
          var ip =
            req.headers["x-forwarded-for"] || req.connection.remoteAddress;

          var device = req.useragent.browser + " - " + req.useragent.platform;

          Users.updateLoginHistory(
            email,
            ip,
            "Berlin, Germany",
            device,
            req.useragent.os,
            new Date(),
            docs.login_history.length
          );

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
        } else {
          res
            .status(400)
            .json(ApiResponse.getFailure(0, "Invalid password provided"));
        }
      })
      .catch(err => {
        console.log(err);
      });
  })
);

app.all("*", (req, res) => {
  res.status(405).json(ApiResponse.getFailurePostOnly());
});

module.exports = app;
