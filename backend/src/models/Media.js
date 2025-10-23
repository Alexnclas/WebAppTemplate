const mongoose = require("mongoose");
const MediaSchema = new mongoose.Schema({
  storageKey: String,
  title: String,
  description: String,
  tags: [String],
  uploadDate: {type: Date, default: Date.now }
});
module.exports = mongoose.model('Media', MediaSchema);
