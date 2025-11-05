const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreviewSchema = new Schema({
  userImageUrl: String,
  hairstyleId: String,
  transform: {
    x: Number,
    y: Number,
    scale: Number,
    rotation: Number,
  },
  finalImageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Preview", PreviewSchema);
