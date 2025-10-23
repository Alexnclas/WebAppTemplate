const mongoose = require("mongoose");
const Media = require("./src/models/MediaModel");


mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await Media.deleteMany({}); 
    console.log("MongoDB emptied");
    process.exit();
  })
  .catch(err => console.error(err));