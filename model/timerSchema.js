const mongoose = require("mongoose");

const timerSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
});
const Timer = mongoose.model("Timer", timerSchema);
module.exports = Timer;
