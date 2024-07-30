const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Resume schema
const resumeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    resumeId: {
      type: String,
      required: true,
      unique: true,
    },
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Resume model
const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
