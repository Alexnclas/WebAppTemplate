const mongoose = require("mongoose");
const readSecret = require("../utils/readSecrets");

const dbUser = readSecret(process.env.MONGODB_ACCESS_KEY_FILE, "db_user");
const dbUserPassword = readSecret(process.env.MONGODB_SECRET_KEY_FILE, "password");
const uriSuffix = process.env.MONGODB_URI_SUFFIX;
const productionUri = `mongodb+srv://${dbUser}:${dbUserPassword}@${uriSuffix}`;
const devUri = process.env.MONGODB_DEV_URI;

const connectDB = async () =>  {
  console.log("Production uri DELETE THIS", productionUri)
  try {
    if(process.env.NODE_ENV === "production"){
      await mongoose.connect(productionUri)
    }
    else {
      await mongoose.connect(devUri) 
    }
    console.log("MongoDB connected")
  }
  catch(err) {
      console.error(`Error connecting MongoDB: ${err}`);
      process.exit(1);
  }
};

module.exports = connectDB;
