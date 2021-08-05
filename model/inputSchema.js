const mongoose = require("mongoose");

const timerSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const Input = mongoose.model("Input", timerSchema);
module.exports = Input;
