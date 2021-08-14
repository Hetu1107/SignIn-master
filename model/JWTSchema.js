const mongoose = require("mongoose");

const jwtSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});
const jwt = mongoose.model("JWT", jwtSchema);
module.exports = jwt;
