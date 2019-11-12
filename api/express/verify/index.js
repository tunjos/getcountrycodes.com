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
    var verify_token = req.body.verify_token;

    if (!Validators.isValuePresent(verify_token)) {
      res
        .status(400)
        .json(ApiResponse.getFailure(0, "Verification token not provided"));
      return;
    }

    if (!Validators.isValidVerifyToken(verify_token)) {
      res
        .status(400)
        .json(ApiResponse.getFailure(0, "Invalid verification token provided"));
    }

    Users.findVerifyToken(verify_token)
      .then(docs => {
        if (!Validators.isValuePresent(docs)) {
          res
            .status(400)
            .json(
              ApiResponse.getFailure(0, "Invalid verification token provided")
            );
          return;
        }

        if (docs.verified) {
          res
            .status(400)
            .json(
              ApiResponse.getFailure(
                0,
                "Verification token already verified or is invalid"
              )
            );
          return;
        }

        var time_now = new Date().setDate(new Date().getDate());
        if (docs.verify_token_expiry < time_now) {
          res
            .status(400)
            .json(ApiResponse.getFailure(0, "Verification token has expired"));
          return;
        } else {
          Users.verifyAccount(verify_token).then(result => {
            if (result) {
              res
                .status(200)
                .json(ApiResponse.getSuccess("Account verified successfully"));
            } else {
              res
                .status(400)
                .json(ApiResponse.getFailure("Unable to verify account"));
            }
          });
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
