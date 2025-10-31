const fs = require("fs");

function readSecret(name, fallback = "") {
  console.log("reading secret", name)
  try {
    const path = `/etc/secrets/${name}`;
    if (fs.existsSync(path)) return fs.readFileSync(path, "utf8").trim();
  } catch {}
  try {
    const path = `/run/secrets/${name}`;
    if (fs.existsSync(path)) return fs.readFileSync(path, "utf8").trim();
  } catch {}
  console.log("Could not read secret, using fallback")
  return process.env[name.toUpperCase()] || fallback;
}

module.exports = readSecret;