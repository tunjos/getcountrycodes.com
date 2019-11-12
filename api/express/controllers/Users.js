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

async function findVerifyToken(token) {
  const db = await MongoDB.connectToDatabase();

  const userCollection = db.collection(Collections.Users);

  return userCollection.findOne(
    {
      verify_token: token
    },
    {
      projection: {
        verified: 1,
        verify_token: 1,
        verify_token_expiry: 1
      }
    }
  );
  //Create API key
  //Init usage object
}

async function verifyAccount(token) {
  const db = await MongoDB.connectToDatabase();

  const userCollection = db.collection(Collections.Users);

  try {
    const { matchedCount, modifiedCount } = await userCollection.updateOne(
      { verify_token: token },
      { $set: { active: true, verified: true } }
    );

    if (matchedCount && modifiedCount) {
      return true;
    }
    console.log(result);
  } catch (err) {
    console.log(err);
    return false;
  }
  return false;
}

function findUserMe(email) {
  return false;
}

async function updateLoginHistory(
  email,
  ip,
  location,
  device,
  os,
  date,
  loginHistoryLength
) {
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

  try {
    if (loginHistoryLength >= 5) {
      var result2 = await collectionUser.updateOne(
        { email: email },
        { $pop: { login_history: -1 } }
      );
    }
  } catch (err) {
    console.log(err);
    return false;
  }

  try {
    var result = await collectionUser.updateOne(
      { email: email },
      { $push: { login_history: login_history } }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
  return false;
}

function createUser(email) {
  return false;
}

module.exports = {
  findUserLogin: findUserLogin,
  validatePassword: validatePassword,
  findVerifyToken: findVerifyToken,
  verifyAccount: verifyAccount,
  findUserMe: findUserMe,
  updateLoginHistory: updateLoginHistory,
  createUser: createUser
};
