const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HairstyleSchema = new Schema({
  name: String,
  length: String,
  imageUrl: String,
  defaultScale: { type: Number, default: 1 },
});

module.exports = mongoose.model("Hairstyle", HairstyleSchema);
