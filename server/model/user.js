const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, require: true },
  wallet_address: { type: String },
  token: { type: String },
});

const User = mongoose.model("User", UserSchema);

module.exports = User