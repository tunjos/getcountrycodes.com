const express = require("express");
const session = require("express-session");
const useragent = require("express-useragent");
const MongoDBStore = require("connect-mongodb-session")(session);

const ApiResponse = require("../lib/ApiResponse");
const Validators = require("../lib/Validators");
const Collections = require("../lib/Collections");
const IpGeolocation = require("../lib/IpGeolocation");

const Users = require("../controllers/Users");
const Sessions = require("../controllers/Sessions");

const crypto = require("crypto");

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

app.post("*", (req, res) => {
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
      if (Validators.isValuePresent(docs)) {
        res
          .status(400)
          .json(ApiResponse.getFailure(0, "Email already registered"));
      } else {
        Users.createUser(email, password).then(result => {
          if (result) {
            // Todo email verify_token
            res
              .status(400)
              .json(
                ApiResponse.getSuccess(
                  "Account created successfully. Please check your email"
                )
              );
            return;
          } else {
            res
              .status(400)
              .json(ApiResponse.getFailure(0, "Error creating account"));
            return;
          }
        });
      }
    })
    .catch(err => {
      res.status(400).json(ApiResponse.getFailure(0, "Error creating account"));
      console.log(err);
    });
});

app.all("*", (req, res) => {
  res.status(405).json(ApiResponse.getFailurePostOnly());
});

module.exports = app;
