import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = "${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api";

export default function Jobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  //fetch applied jobs
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applyingId, setApplyingId] = useState(null);

  const fetchAppliedJobs = async () => {
  if (!token) return;

  try {
    const res = await fetch(`${API_URL}/my-applications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    const ids = data.map(app => app.job._id);
    setAppliedJobs(ids);
  } catch {
    console.log("Failed to load applied jobs");
  }
};



  const token = localStorage.getItem("token");

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`);
      const data = await res.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchJobs();
  fetchAppliedJobs();
}, []);


  // Filter logic
  useEffect(() => {
    let result = jobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase())
    );

    if (location) {
      result = result.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredJobs(result);
  }, [search, location, jobs]);

  const applyJob = async (jobId) => {
  if (!token) {
    toast.info("Login to apply");
    navigate("/login");
    return;
  }

  setApplyingId(jobId);

  try {
    const res = await fetch(`${API_URL}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ jobId })
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Applied successfully!");
      setAppliedJobs(prev => [...prev, jobId]);
    } else {
      toast.warning(data.message);
    }

  } catch {
    toast.error("Apply failed");
  } finally {
    setApplyingId(null);
  }
};

  return (
    <div className="px-8 py-8 min-h-screen bg-gray-50">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-blue-700"
      >
        Browse Jobs
      </motion.h1>

      {/* FILTER BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-4 mb-10"
      >
        <input
          placeholder="Search job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />

        <input
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />

        <button
          onClick={() => {
            setSearch("");
            setLocation("");
          }}
          className="bg-gray-200 px-6 rounded-lg hover:bg-gray-300"
        >
          Clear
        </button>
      </motion.div>

      {/* JOB LIST */}
      {loading ? (
        <p className="text-lg">Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >

          {filteredJobs.map(job => (
            <motion.div
              key={job._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-lg p-6 transition"
            >

              <h2 className="text-xl font-bold text-blue-700 mb-1">
                {job.title}
              </h2>

              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>

              <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {job.salary}
              </span>

              <div className="mt-4 flex gap-3">

                <button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View
                </button>

                <button
                disabled={appliedJobs.includes(job._id) || applyingId === job._id}
                onClick={() => applyJob(job._id)}
                className={`flex-1 py-2 rounded-lg transition
                  ${appliedJobs.includes(job._id)
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-50"}
                `}
              >
                {appliedJobs.includes(job._id)
                  ? "✅ Applied"
                  : applyingId === job._id
                  ? "Applying..."
                  : "Apply"}
              </button>


              </div>
            </motion.div>
          ))}

        </motion.div>
      )}
    </div>
  );
}
