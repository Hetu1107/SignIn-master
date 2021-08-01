const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  optionSelected: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("Voter", voterSchema);
module.exports = User;
