import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../utils/constants";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";
import SearchBar from "../components/ui/SearchBar";

export default function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/jobs`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      const list = Array.isArray(data) ? data : Array.isArray(data.jobs) ? data.jobs : [];
      setJobs(list);
      setFilteredJobs(list);
    } catch {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/my-applications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    const data = await res.json();
    // data is array of applications, each has app.job._id or app.job
    const ids = new Set(
      data.map((app) => app.job?._id || app.job)
    );
    setAppliedJobIds(ids);
  } catch {
    // silently fail — not critical
  }
};

  useEffect(() => {
  fetchJobs();
  if (token) fetchAppliedJobs();
}, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFilteredJobs(
      jobs.filter(j =>
        (j.title || "").toLowerCase().includes(q) ||
        (j.location || "").toLowerCase().includes(q) ||
        (j.company || "").toLowerCase().includes(q)
      )
    );
  }, [search, jobs]);

  const applyJob = async (jobId) => {
    if (!token) { toast.info("Please sign in to apply"); navigate("/login"); return; }
    try {
      const res = await fetch(`${API_BASE_URL}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ jobId }),
      });
      const data = await res.json();
      if(res.ok) {
        toast.success("Applied successfully! 🎉");
        setAppliedJobIds((prev) => new Set([...prev, jobId]));
      }
    } catch {
      toast.error("Apply failed");
    }
  };

  return (
    <div className="page-container">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="page-header mb-1">Browse Jobs</h1>
        <p className="text-text-muted mb-6">
          {filteredJobs.length} {filteredJobs.length === 1 ? "opportunity" : "opportunities"} available
        </p>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title, company, or location..."
        />
      </motion.div>

      {/* Content */}
      <div className="mt-8">
        {loading ? (
          <Spinner text="Finding jobs for you..." />
        ) : filteredJobs.length === 0 ? (
          <EmptyState
            icon="🔍"
            title={search ? "No jobs match your search" : "No jobs posted yet"}
            description={search ? `Try different keywords — we have ${jobs.length} jobs total.` : "Check back soon!"}
            action={search && (
              <button onClick={() => setSearch("")} className="btn-outline mt-2">Clear search</button>
            )}
          />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredJobs.map(job => (
              <motion.div
                key={job._id}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="card card-hover p-5 flex flex-col"
              >
                {/* Company logo placeholder */}
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-xl mb-3">
                  🏢
                </div>

                <h2 className="font-semibold text-text-primary mb-1 line-clamp-1">{job.title}</h2>
                <p className="text-sm text-text-secondary mb-0.5">{job.company}</p>
                <p className="text-sm text-text-muted mb-0.5">📍 {job.location}</p>
                {job.salary && (
                  <p className="text-sm font-medium text-brand-700 mt-1">💰 {job.salary}</p>
                )}

                {job.description && (
                  <p className="text-sm text-text-muted mt-3 line-clamp-2">{job.description}</p>
                )}

                <div className="mt-auto pt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="btn-outline flex-1 text-xs"
                  >
                    Details
                  </button>
                  {user?.role !== "employer" && (
                    <motion.button
                      whileHover={{ scale: appliedJobIds.has(job._id) ? 1 : 1.03 }}
                      whileTap={{ scale: appliedJobIds.has(job._id) ? 1 : 0.97 }}
                      onClick={() => !appliedJobIds.has(job._id) && applyJob(job._id || job.id)}
                      disabled={appliedJobIds.has(job._id)}
                      className={`flex-1 text-xs rounded-btn font-medium transition-colors px-3 py-2 ${
                        appliedJobIds.has(job._id)
                          ? "bg-green-50 text-green-700 border border-green-200 cursor-not-allowed"
                          : "btn-primary"
                      }`}
                    >
                      {appliedJobIds.has(job._id) ? "✅ Applied" : "Apply"}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}