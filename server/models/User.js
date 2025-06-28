const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  currentPassword: String,
  newPassword: String,
  profession: String,
  companyName: String,
  addressLine1: String,
  country: String,
  state: String,
  city: String,
  subscription: String,
  newsletter: Boolean,
  profilePhoto: String,
});

module.exports = mongoose.model("User", userSchema);
