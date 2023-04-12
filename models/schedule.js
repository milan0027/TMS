const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  desc: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    default: 0
  },
  end: {
    type: Date,
    required: true,
  },
  common: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;