const fs = require("fs");

function readSecret(path, fallback) {
  try {
    return fs.readFileSync(path, "utf8").trim();
  } catch {
    return fallback;
  }
}

module.exports = readSecret;

