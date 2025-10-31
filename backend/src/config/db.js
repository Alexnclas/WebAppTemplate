const mongoose = require("mongoose");
const readSecret = require("../utils/readSecrets");

const dbUser = readSecret("mongodb_access_key", "db_user");
const dbUserPassword = readSecret("mongodb_secret_key", "password");
const uriSuffix = process.env.MONGODB_URI_SUFFIX;
const productionUri = `mongodb+srv://${dbUser}:${dbUserPassword}@${uriSuffix}`;
const devUri = process.env.MONGODB_DEV_URI;

const connectDB = async () =>  {
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
