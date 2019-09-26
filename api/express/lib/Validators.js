function isValuePresent(value) {
  // !Checks for "", null, undefined, false, 0 and NaN
  return !!value;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAuthTokenPresent(req) {
  var authorizationHeader = req.header("Authorization");

  if (!isValuePresent(authorizationHeader)) {
    return false;
  }

  var token = authorizationHeader.replace('Bearer ', '')
}

module.exports = {
  isValuePresent: isValuePresent,
  isValidEmail: isValidEmail
};
