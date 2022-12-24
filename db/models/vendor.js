const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  user_id: String, // String is shorthand for {type: String}
  is_approved: { type: Boolean, default: false },
  bio: String,
});
module.exports = mongoose.model("vendor", vendorSchema);
