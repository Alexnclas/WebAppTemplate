const mongoose = require("mongoose");
const Media = require("./src/models/MediaModel");
const User = require("./src/models/User");

mongoose.connect(process.env.MONGODB_DEV_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await Media.deleteMany({}); 
    await User.deleteMany({}); 
    console.log("MongoDB emptied");
    process.exit();
  })
  .catch(err => console.error(err));

