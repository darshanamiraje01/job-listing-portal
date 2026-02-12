import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { applyJob } from "../controllers/applicationController.js";

import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { employerOnly } from "../middleware/authRole.js";

const router = express.Router();

router.post("/apply", protect, applyJob);

router.get("/my-applications", protect, async (req, res) => {
    try{ 
        const applications = await Application.find({ user: req.user.id })
      .populate("job"); 

        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch applications" });
        }
})

// Employer: get applicants for a specific job
router.get("/job/:jobId/applications", protect, employerOnly, async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId
    })
      .populate("user", "name email profile") // get jobseeker info
      .populate("job", "title company");

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
});

//employer can accept/reject application status
router.put("/applications/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
        req.params.id,
    { status: status },
    { new: true }).populate("user job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // application.status = status;
    await application.save();

    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

//employer dashboard
router.get("/employer-dashboard", protect, async (req, res) => {
  try {
    // 1. All jobs by this employer
    const jobs = await Job.find({ postedBy: req.user.id });

    const jobIds = jobs.map(job => job._id);

    // 2. Count applications for those jobs
    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds }
    });
    // 3. accepted - rejected count
    const accepted = await Application.countDocuments({
      job: { $in: jobIds },
      status: "accepted"
    });

    const rejected = await Application.countDocuments({
      job: { $in: jobIds },
      status: "rejected"
    });

    // 4. Recent jobs
    const recentJobs = await Job.find({ postedBy: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalJobs: jobs.length,
      totalApplications,
      accepted,
      rejected,
      recentJobs
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

export default router;
