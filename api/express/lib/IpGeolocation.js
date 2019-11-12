const axios = require("axios");

const baseUrl = "https://api.smartip.io/";

async function geoLocate(ip) {
  return axios.get(baseUrl + ip + "?api_key=" + process.env.SMART_IP_API_KEY);
}

module.exports = {
  geoLocate: geoLocate
};
