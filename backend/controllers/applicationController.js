import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";

export const applyJob = async (req, res) => {

  try {
    const { jobId } = req.body;

    console.log("Apply request body :", req.body);
    console.log("User applying :", req.user.id);

    //check if job exists
    const job = await Job.findById(jobId);
    if(!job){
      return res.status(404).json({messgae: "Job not found"});
    }

    // prevent duplicate apply
    const exists = await Application.findOne({
      job: jobId,
      user: req.user.id
    });

    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    const user = await User.findById(req.user.id);

    const application = await Application.create({
      job: jobId,
      user: req.user.id,
      resume: user.profile?.resume,
      contact: {
        phone: req.user.profile?.phone,
        linkedin: req.user.profile?.linkedin
      }
    });

    res.status(201).json({ message: "Applied successfully", application });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Apply failed" });
  }
};
