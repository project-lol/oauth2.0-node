const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
  projectID: {
    type: String,
    required: true,
    unique: true,
  },
  projectSecret: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURLs: [
    {
      type: String,
      required: true,
    },
  ],
  scope: {
    type: String,
    enum: ["default", "admin", "phone", "full"],
    default: "default",
  },
  createdBy: {
    type: Schema.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
