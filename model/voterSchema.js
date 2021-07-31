const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  optionSelected: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});
const User = mongoose.model("User", voterSchema);
module.exports = User;
