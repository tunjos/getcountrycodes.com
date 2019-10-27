const crypto = require("crypto");

function createSession(req, res, ip, hash_id) {
  const gcc_auth =
    "gcc_" +
    crypto
      .randomBytes(24)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  req.session.gcc_auth = gcc_auth + "-" + hash_id;
  req.session.ip = ip;

  res.cookie("gcc_auth", gcc_auth + "-" + hash_id);

  if (req.session.hits >= 1) {
    req.session.hits++;
    return true;
  } else {
    req.session.hits = 1;
    return false;
  }
}

module.exports = {
  createSession: createSession
};
