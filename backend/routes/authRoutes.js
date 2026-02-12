import express from "express";
import { register, login, getProfile, updateProfile, uploadProfilePhoto } from "../controllers/authController.js";
//import authMiddleware from "../middleware/authMiddleware.js";
//import { uploadProfilePhoto } from "../controllers/authController.js";
import upload from "../middleware/uploads.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/profile/photo", protect, upload.single("avatar"), uploadProfilePhoto);

export default router;
