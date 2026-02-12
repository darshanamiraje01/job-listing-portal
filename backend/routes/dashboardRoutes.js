// import express from "express";
// import Job from "../models/Job.js";
// import Application from "../models/Application.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { employerOnly } from "../middleware/authRole.js";

// const router = express.Router();

// router.get("/employer-dashboard", protect, employerOnly, async (req, res) => {
//   try {
//     const jobs = await Job.find({ postedBy: req.user.id });

//     const jobIds = jobs.map(j => j._id);

//     const applications = await Application.countDocuments({
//       jobId: { $in: jobIds }
//     });

//     res.json({
//       totalJobs: jobs.length,
//       totalApplications: applications,
//       recentJobs: jobs.slice(0, 5)
//     });

//   } catch {
//     res.status(500).json({ message: "Dashboard error" });
//   }
// });

// export default router;
