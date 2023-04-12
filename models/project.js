const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  meetings : [{
    type:Schema.Types.ObjectId,
    ref: 'Meeting'
  }],
  creator : {
    type: String,
    required: true,
  },
  manhours: {
    type: Number,
    default: 0
  }
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;