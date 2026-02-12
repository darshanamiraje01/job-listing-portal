import express from "express";
import upload from "../middleware/uploads.js"; // your existing multer middleware
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.put("/resume", protect, upload.single("resume"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profile.resume = `/uploads/resumes/${req.file.filename}`;
    await user.save();

    res.json({ message: "Resume uploaded", resumeUrl: user.profile.resume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Resume upload failed" });
  }
});

export default router;
