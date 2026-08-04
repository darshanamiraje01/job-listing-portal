import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../utils/constants";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchMyJobs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/my-jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setJobs(data);
    } catch {
      toast.error("Failed to load your jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job? This action cannot be undone.")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Job deleted");
        setJobs(jobs => jobs.filter(j => j._id !== id));
      } else {
        toast.error("Failed to delete job");
      }
    } catch {
      toast.error("Error deleting job");
    }
  };

  useEffect(() => { fetchMyJobs(); }, []);

  if (loading) return <div className="page-container"><Spinner text="Loading your jobs..." /></div>;

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-header">My Posted Jobs</h1>
          <p className="text-text-muted text-sm mt-1">{jobs.length} {jobs.length === 1 ? "job" : "jobs"} posted</p>
        </div>
        <button onClick={() => navigate("/post-job")} className="btn-primary">+ Post a Job</button>
      </motion.div>

      {jobs.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No jobs posted yet"
          description="Post your first job to start receiving applications."
          action={<button onClick={() => navigate("/post-job")} className="btn-primary mt-2">Post a Job</button>}
        />
      ) : (
        <motion.div
          initial="hidden" animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="space-y-4"
        >
          {jobs.map(job => (
            <motion.div
              key={job._id}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="card p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <h2 className="font-semibold text-text-primary">{job.title}</h2>
                  <p className="text-sm text-text-secondary mt-0.5">{job.company}</p>
                  <p className="text-sm text-text-muted mt-0.5">
                    📍 {job.location}{job.salary ? ` · 💰 ${job.salary}` : ""}
                  </p>
                  {job.description && (
                    <p className="text-sm text-text-muted mt-2 line-clamp-2">{job.description}</p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 sm:flex-col sm:w-36">
                  <button onClick={() => navigate(`/job-applicants/${job._id}`)} className="btn-primary text-xs flex-1 sm:flex-none">
                    👥 Applicants
                  </button>
                  <button onClick={() => navigate(`/edit-job/${job._id}`)} className="btn-outline text-xs flex-1 sm:flex-none">
                    ✏️ Edit
                  </button>
                  <button onClick={() => navigate(`/view-job/${job._id}`)} className="btn-ghost text-xs flex-1 sm:flex-none">
                    👁️ View
                  </button>
                  <button onClick={() => handleDelete(job._id)} className="btn-danger text-xs flex-1 sm:flex-none">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}