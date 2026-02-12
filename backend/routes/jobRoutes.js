import express from "express";
import { getAllJobs } from "../controllers/jobController.js";
import { employerOnly } from "../middleware/authRole.js";
import { protect } from "../middleware/authMiddleware.js";
import Job from "../models/Job.js";

const router = express.Router();

router.get("/jobs", getAllJobs);

router.post("/jobs", protect, employerOnly, async (req, res) => {
  try {
    // const job = await Job.create({
    //   title: req.body.title,
    //   company: req.body.company,
    //   location: req.body.location,
    //   salary: req.body.salary,
    //   type: req.body.type,
    //   description: req.body.description,
    //   qualifications: req.body.qualifications,
    //   responsibilities: req.body.responsibilities,
    //   postedBy: req.user.id
    // });

    const job = await Job.create({
      ...req.body,
      postedBy: req.user.id
    });
    
    res.status(201).json(job);
  } catch (err) {
    console.log("JOB ERROR", err);
    res.status(500).json({ message: "Job creation failed" });
  }
});

// Get jobs posted by logged-in employer
router.get("/my-jobs", protect, employerOnly, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch employer jobs" });
  }
});

// Update job
router.put("/jobs/:id", protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.user.id },
      req.body,
      { new: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// Delete Job
router.delete("/jobs/:id", protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Ensure employer owns the job
    if (job.postedBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

//get single job by id
router.get("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
