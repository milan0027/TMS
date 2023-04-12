const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  invited: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  start: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
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

const Meeting = mongoose.model("Meeting", MeetingSchema);
module.exports = Meeting;