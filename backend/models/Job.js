// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     company: { type: String, required: true },
//     location: String,
//     salary: String,
//     description: String,
//     skills: [String],

//     postedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Job", jobSchema);


import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  description: String,
  qualifications: String,
  responsibilities: String,

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  type: {
    type: String,
    required: true
  }
});

export default mongoose.model("Job", jobSchema);
