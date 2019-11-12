function isValuePresent(value) {
  // !Checks for "", null, undefined, false, 0 and NaN
  return !!value;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  // Greater than or equal to 6 character
  if (password.length < 6) {
    return false;
  }
  // Contains an uppercase character
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  // Contains a lowercase character
  if (!/[a-z]/.test(password)) {
    return false;
  }
  // Contains a number
  if (!/\d/.test(password)) {
    return false;
  }
  // Contains special characters

  // Does not contain any char from name/surname

  return true;
}

function isAuthTokenPresent(req) {
  var authorizationHeader = req.header("Authorization");

  if (!isValuePresent(authorizationHeader)) {
    return false;
  }

  if (!authorizationHeader.includes("Bearer")) {
    return false;
  }
}

function isValidVerifyToken(token) {
  if (!isValuePresent(token)) {
    return false;
  }

  if (token.length == 64) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  isValuePresent: isValuePresent,
  isValidEmail: isValidEmail,
  isValidPassword: isValidPassword,
  isAuthTokenPresent: isAuthTokenPresent,
  isValidVerifyToken: isValidVerifyToken
};
