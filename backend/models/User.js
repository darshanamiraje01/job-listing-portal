// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ["jobseeker", "employer"], default: "jobseeker" 
// },
// bio: { type: String, default: "" },
// skills: [{ type: String }],
// location: String,
// experience: String,
// education: String,
// avatarColor: { type: String, default: "" },
// avatar: { type: String, default: "" }
// });

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["jobseeker", "employer"], default: "jobseeker" },
  profile: {  // Nested profile object for frontend compatibility
    bio: { type: String, default: "" },
    skills: [{ type: String }],
    location: String,
    experience: String,
    education: String,
    resume: String,
    phone: String,
    linkedin: String,
    avatar: { type: String, default: "" },  // Moved here for nesting
  },
  avatarColor: { type: String, default: "" },  // Kept outside if needed elsewhere
}, { timestamps: true });

export default mongoose.model("User", userSchema);

