
function extractApiKey(authorizationHeader) {
  var apiKey = authorizationHeader.replace('Bearer: ', '')
  return apiKey;
}

module.exports = {
  extractApiKey: extractApiKey
};
