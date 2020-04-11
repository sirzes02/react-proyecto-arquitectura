const mongoose = require("mongoose");
const { Schema } = mongoose;

const PasswordSchema = new Schema({
  password: { type: String, required: true },
});

module.exports = mongoose.model("Password", PasswordSchema);
