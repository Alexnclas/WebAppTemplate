const fs = require("fs");

/**
 * Reads a secret value from one of:
 *  1. A mounted secret file at `/etc/secrets/<filename>`
 *  2. An environment variable (fallback)
 *  3. A fallback default value
 *
 * @param {string} filename    The name of the secret file (without path)
 * @param {string} envVarName  The name of the environment variable to check
 * @param {string} fallback    The fallback string if neither exists
 * @returns {string}           The secret value
 */
function readSecret(filename, envVarName, fallback) {
  console.log("reading secret for:", filename, envVarName, fallback);
  // Env var
  if (process.env[envVarName]) {
    return process.env[envVarName];
  }

  // Mounted secret file
  const path1 = `/etc/secrets/${filename}`;
  try {
    if (fs.existsSync(path1)) {
      return fs.readFileSync(path1, "utf8").trim();
    }
  } catch (err) {
    console.warn(`Warning: could not read secret file ${path1}: ${err.message}`);
  }

  return fallback;
}


module.exports = readSecret;