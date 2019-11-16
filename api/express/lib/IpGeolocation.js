const axios = require("axios");

const baseUrl = "https://api.smartip.io/";

async function geoLocate(ip) {
  try {
    var response = await axios.get(
      baseUrl + ip + "?api_key=" + process.env.SMART_IP_API_KEY
    );
    return response;
  } catch (err) {
    console.log(err);
  }
  return false;
}

module.exports = {
  geoLocate: geoLocate
};
