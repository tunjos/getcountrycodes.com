function returnCountryDetail() {}

function getSuccess(message) {
  return {
    error: false,
    error_code: 0,
    message: message
  };
}

function getFailure(error_code, message) {
  return {
    error: true,
    error_code: error_code,
    message: message
  };
}

function getFailureGetOnly() {
  return {
    error: true,
    error_code: 0,
    error: "Only GET requests are accepted"
  };
}

function getFailurePostOnly() {
  return {
    error: true,
    error_code: 0,
    message: "Only POST requests are accepted"
  };
}

module.exports = {
  getSuccess: getSuccess,
  getFailure: getFailure,
  getFailureGetOnly: getFailureGetOnly,
  getFailurePostOnly: getFailurePostOnly
};
