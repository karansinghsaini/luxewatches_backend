const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  gender: String,
  contact_no: String,
  email: String,
  password: String,
  is_admin: { type: Boolean, default: false },
  image: String,
  is_active: { type: Boolean, default: true },
  is_vendor: { type: Boolean, default: false },
});
module.exports = mongoose.model("user", userSchema);
