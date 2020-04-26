const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: Number, required: true },
  clasification: { type: Number, required: true },
  year: { type: Number, required: true },
  hardware: { type: Number, required: true },
  requirements: { type: Number, required: true }, // 0 - low, 1 - medium, 2 - high
  description: { type: String, required: true },
});

module.exports = mongoose.model("Game", GameSchema);
