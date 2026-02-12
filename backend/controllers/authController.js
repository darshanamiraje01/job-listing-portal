// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   try {
//   const { name, email, password, role } = req.body;

//   const exists = await User.findOne({ email });
//   if(exists)
//     return res.status(400).json({message: "User already exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await User.create({ name, email, password: hashedPassword, role });

//   res.status(201).json({ message: "User registered successfully!" });
// } catch (err) {
//   res.status(500).json({ message: "Server error" });
// }
// };

// //added extra to display profile 
// export const getProfile = async (req, res) => {
//   const user = await User.findById(req.user.id).select("-password");
//   res.json(user);
// };

// //added to update the profile
// export const updateProfile = async (req, res) => {
//   try {
//   const user = await User.findByIdAndUpdate(
//     req.user.id,
//     req.body,
//     { new: true }
//   ).select("-password");

//   res.json(user);
// } catch (err) {
//     res.status(500).json({message: "failed to update profile", error: err.message });
// }
// };

// //to upload photo
// // upload profile photo
// export const uploadProfilePhoto = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     user.avatar = `/uploads/${req.file.filename}`;
//     await user.save();

//     const updatedUser = await User.findById(req.user.id).select("-password");
//     res.json(updatedUser);

//   } catch (err) {
//     res.status(500).json({
//       message: "Profile photo upload failed",
//       error: err.message,
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(401).json({ message: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
//   res.json({ token });
//   } catch (err){
//     res.status(500).json({ message: "Server error" });
//   }
// };


import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user });  // Added user data for frontend storage
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);  // Returns nested profile data
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       {
//         $set: {
//           name: req.body.name,
//           profile: req.body.profile
//         }
//       },
//       { new: true, runValidators: true }
//     ).select("-password");

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to update profile",
//       error: err.message,
//     });
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update basic name
    if (req.body.name) user.name = req.body.name;

    // Update profile fields safely
    user.profile = {
      ...user.profile,
      ...req.body.profile,   // <-- this keeps old values and adds new ones
    };

    await user.save();

    const updatedUser = await User.findById(req.user.id).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
    });
  }
};


export const uploadProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    user.profile.avatar = `/uploads/${req.file.filename}`;  // Updated to nested profile
    await user.save();

    const updatedUser = await User.findById(req.user.id).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({
      message: "Profile photo upload failed",
      error: err.message,
    });
  }
};