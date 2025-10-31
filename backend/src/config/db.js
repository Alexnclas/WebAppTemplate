const mongoose = require("mongoose");
const readSecret = require("../utils/readSecrets");

const dbUser = readSecret(process.env.MONGODB_ACCESS_KEY_FILE, "db_user");
const dbUserPassword = readSecret(process.env.MONGODB_SECRET_KEY_FILE, "password");
const uri = `mongodb+srv://${dbUser}:${dbUserPassword}@webapptemplatecluster0.3qandzz.mongodb.net/?appName=WebAppTemplateCluster0`;
//TODO CHANGE Last part to .env constant
const connectDB = async () =>  {
  try {
    // await mongoose.connect(process.env.MONGO_URI) // Dev
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }) // Production
    console.log("MongoDB connected")
  }
  catch(err) {
      console.error(`Error connecting MongoDB: ${err}`);
      process.exit(1);
  }
};

module.exports = connectDB;
