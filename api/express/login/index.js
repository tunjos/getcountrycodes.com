const express = require('express');
const asyncMiddleware = require('../lib/asyncMiddleware');
const url = require('url')
const path = require('path');
const MongoDB = require('../lib/MongoDB');
const GCC = require('../lib/GCC');
const Validators = require('../lib/Validators');
const Collections = require('../lib/Collections');

const app = express();
app.use(express.urlencoded({
  extended: false
}));

app.set('json spaces', 2);

app.post('*', asyncMiddleware(async (req, res) => {
  const db = await MongoDB.connectToDatabase();

  var email = req.body.email;

  if (!Validators.isValuePresent(email)) {
    res.status(400).json(GCC.getFailure(0, "Email not provided"));
  }

  if (!Validators.isValidEmail(email)) {
    res.status(400).json(GCC.getFailure(0, "Invalid email provided"));
  }

  const collection = db.collection(Collections.Users);
  collection.findOne({
      email: email
    }, {
      projection: {
        email: 1,
        password: 1,
        salt: 1
      }
    })
    .then(docs => {
      // Validate Password
      res.json(docs);
    })
    .catch(err => {
      console.log(err);
    });
}));

app.all('*', (req, res) => {
  res.status(405).json(GCC.getFailurePostOnly());
});

module.exports = app
