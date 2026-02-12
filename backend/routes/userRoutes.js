import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.put(
  "/profile/photo",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = `/uploads/${req.file.filename}`;
    await req.user.save();
    res.json(req.user);
  }
);
