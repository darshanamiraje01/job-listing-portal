import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../utils/constants";
import Spinner from "../components/ui/Spinner";
import StatCard from "../components/ui/StatCard";

export default function EmployerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/employer-dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-container"><Spinner text="Loading your dashboard..." /></div>;
  if (!data) return <div className="page-container"><p className="text-text-muted">Failed to load dashboard.</p></div>;

  const stats = [
    { label: "Jobs Posted",     value: data.totalJobs,          icon: "📋", colorClass: "text-brand-600 bg-brand-50" },
    { label: "Total Applicants",value: data.totalApplications,  icon: "👥", colorClass: "text-purple-600 bg-purple-50" },
    { label: "Accepted",        value: data.accepted,           icon: "✅", colorClass: "text-success-dark bg-success-light" },
    { label: "Rejected",        value: data.rejected,           icon: "❌", colorClass: "text-danger-dark bg-danger-light" },
  ];

  return (
    <div className="page-container space-y-8">
      {/* Header row */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">Employer Dashboard</h1>
          <p className="text-text-muted text-sm mt-1">Manage your job postings and applicants</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate("/my-jobs")} className="btn-outline">
            📋 My Jobs
          </button>
          <button onClick={() => navigate("/post-job")} className="btn-primary">
            + Post a Job
          </button>
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial="hidden" animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((s, i) => (
          <motion.div key={i} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Recent Jobs</h2>
          <button onClick={() => navigate("/my-jobs")} className="text-sm text-brand-600 hover:underline">
            View all →
          </button>
        </div>

        {data.recentJobs?.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-3xl mb-2">📋</p>
            <p className="text-text-secondary font-medium">No jobs posted yet</p>
            <button onClick={() => navigate("/post-job")} className="btn-primary mt-4">Post your first job</button>
          </div>
        ) : (
          <div className="space-y-3">
            {data.recentJobs.map(job => (
              <div key={job._id} className="card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-semibold text-text-primary">{job.title}</p>
                  <p className="text-sm text-text-muted">📍 {job.location}{job.salary ? ` · 💰 ${job.salary}` : ""}</p>
                </div>
                <button
                  onClick={() => navigate(`/job-applicants/${job._id}`)}
                  className="btn-outline text-xs self-start sm:self-auto whitespace-nowrap"
                >
                  View Applicants
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}