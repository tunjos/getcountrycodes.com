const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const ApiResponse = require("../lib/ApiResponse");
const Collections = require("../lib/Collections");

const app = express();

app.disable("x-powered-by");
app.set("json spaces", 2);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

var store = new MongoDBStore({
  uri: process.env.GCC_MONGODB_URI,
  collection: Collections.Sessions
});
store.on("error", err => console.log(err));

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

app.get("*", (req, res) => {
  if (req.session.gcc_auth) {
    store.destroy(req.sessionID, () => {
      req.session.destroy(() => {
        res.status(200).json(ApiResponse.getSuccess("Logout successful"));
      });
    });
  } else {
    res.status(200).json(ApiResponse.getFailure(0, "Session not found"));
  }
});

app.all("*", (req, res) => {
  res.status(405).json(ApiResponse.getFailureGetOnly());
});

module.exports = app;
