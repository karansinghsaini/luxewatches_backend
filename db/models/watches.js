const mongoose = require("mongoose");
require('mongoose-double')(mongoose);

const watchesSchema = new mongoose.Schema({
  brand_name: String, // String is shorthand for {type: String}
  model_name: String,
  price: {
    type: Number
  },
  description: String,
  strap_type: { type: String, enum: ["rubber", "steel"], default: "rubber" },
  gender: { type: String, enum: ["male", "female", "kids"], default: "male" },
  shape: { type: String, enum: ["round", "square"], default: "round" },
  type: {
    type: String,
    enum: ["analog", "digital", "analog-digital", "smartwatch"],
    default: "analog",
  },
  image_url: String,
});
module.exports = mongoose.model("watches", watchesSchema);
