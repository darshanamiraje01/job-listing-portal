// import Job from "../models/Job.js";

// export const getAllJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find().sort({ createdAt: -1 });
//     res.json(jobs);
//   } catch (error) {
//     console.error("GET JOBS ERROR", error);
//     res.status(500).json({ message: "Failed to fetch jobs" });
//   }
// };


import Job from "../models/Job.js";

export const getAllJobs = async (req, res) => {
  try {
    const { keyword, location, type, minSalary, maxSalary } = req.query;

    let query = {};

    // Search by title
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Filter by job type
    if (type) {
      query.type = type;
    }

    // Filter by salary range
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error("GET JOBS ERROR", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body); // ✅ automatically includes type
    res.status(201).json(job);
  } catch (error) {
    console.error("JOB ERROR", error);
    res.status(500).json({ message: "Failed to create job" });
  }
};


