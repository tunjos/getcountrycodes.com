const express = require("express");
const asyncMiddleware = require("../lib/asyncMiddleware");
const url = require("url");
const path = require("path");
const MongoDB = require("../lib/MongoDB");
const ApiResponse = require("../lib/ApiResponse");
const Validators = require("../lib/Validators");
const Collections = require("../lib/Collections");
const crypto = require("crypto");

const app = express();
app.use(
  express.urlencoded({
    extended: false
  })
);

app.disable('x-powered-by');
app.set("json spaces", 2);

app.post(
  "*",
  asyncMiddleware(async (req, res) => {
    const db = await MongoDB.connectToDatabase();

    var email = req.body.email;
    var password = req.body.password;

    if (!Validators.isValuePresent(email)) {
      res.status(400).json(ApiResponse.getFailure(0, "Email not provided"));
    }

    if (!Validators.isValidEmail(email)) {
      res.status(400).json(ApiResponse.getFailure(0, "Invalid email provided"));
    }

    if (!Validators.isValidPassword(password)) {
      res.status(400).json(ApiResponse.getFailure(0, "Invalid password provided"));
    }

    const collectionUser = db.collection(Collections.Users);
    collectionUser
      .findOne(
        {
          email: email
        },
        {
          projection: {
            email: 1
          }
        }
      )
      .then(docs => {
        if (Validators.isValuePresent(docs)) {
          res.status(400).json(ApiResponse.getFailure(0, "Email already registered"));
        } else {
          // Extract to PasswordUtils
          const salt = crypto.randomBytes(16).toString("hex");
          const passwordHash = crypto
            .pbkdf2Sync(password, salt, 10000, 32, "sha512")
            .toString("hex");

          const api_key =
            "gcc_" +
            crypto
              .randomBytes(24)
              .toString("base64")
              .replace(/\+/g, "-")
              .replace(/\//g, "_");

          const verify_token = crypto.randomBytes(32).toString("hex");
          const verify_token_expiry = new Date().setDate(
            new Date().getDate() + 5
          );

          // Store and give success message
          collectionUser.insertOne({
            user_id: 1,
            hash_id: "ABC",
            active: false,
            verified: false,
            permission_level: 1,
            api_key: api_key,
            email: email.toLowerCase(),
            password: passwordHash,
            salt: salt,
            verify_token: verify_token,
            verify_token_expiry: verify_token_expiry
          });

          res
            .status(400)
            .json(
              ApiResponse.getSuccess(
                "Account created successfully. Please check your email."
              )
            );
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
