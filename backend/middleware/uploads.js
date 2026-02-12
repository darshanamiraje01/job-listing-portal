// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null,  path.join(process.cwd(), "uploads", "resumes"));
//   },
//   filename: (req, file, cb) => {
//     const userId = req.user?.id || "user";
//     cb(null, `${userId}-${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ 
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowed = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ];
//     if (allowed.includes(file.mimetype)) cb(null, true);
//     else cb(new Error("Only PDF/DOC/DOCX allowed"));
//   }
//  });

// export default upload;

import multer from "multer";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

// Absolute runtime-safe folder
const uploadPath = path.join(__dirname, "uploads", "resumes");

// Create folder if missing
if(!fs.existsSync(uploadPath)){
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Invalid file type"));
  }
});

export default upload;
