const crypto = require("crypto");

const MongoDB = require("../lib/MongoDB");
const Collections = require("../lib/Collections");

async function findUserLogin(email) {
  const db = await MongoDB.connectToDatabase();

  const collectionUser = db.collection(Collections.Users);
  return collectionUser.findOne(
    {
      email: email
    },
    {
      projection: {
        hash_id: 1,
        email: 1,
        password: 1,
        salt: 1,
        login_history: 1
      }
    }
  );
}

function validatePassword(password, salt, passwordHash) {
  const passwordHashComputed = crypto
    .pbkdf2Sync(password, salt, 10000, 32, "sha512")
    .toString("hex");

  if (passwordHash == passwordHashComputed) {
    return true;
  }
  return false;
}

function findUserMe(email) {
  return false;
}

async function updateLoginHistory(email, ip, location, device, os, date, loginHistoryLength) {
  // Update login_history Array with max 5 objects
  const db = await MongoDB.connectToDatabase();

  const collectionUser = db.collection(Collections.Users);

  const login_history = {
    ip: ip,
    location: location,
    device: device,
    os: os,
    date: date
  };

  return collectionUser.updateOne(
    { email: email },
    { $push: { login_history: login_history } }
  ).then( result => {
    if (loginHistoryLength > 5) {
      collectionUser.updateOne(
        { email: email },
        { $pop: { login_history: -1 } }
      );
    }
  }
  )
}

function createUser(email) {
  return false;
}

module.exports = {
  findUserLogin: findUserLogin,
  validatePassword: validatePassword,
  findUserMe: findUserMe,
  updateLoginHistory: updateLoginHistory,
  createUser: createUser
};
