import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resume: {
    type: String
  },
  contact: {
    phone: String,
    linkedin: String
  },
  status: {
    type: String,
    default: "applied"
  }
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);
