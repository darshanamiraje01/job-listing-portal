import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../utils/constants";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";
import Badge from "../components/ui/Badge";

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const resolveUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL.replace("/api", "")}${path}`;
};

  useEffect(() => {
    axios.get(`${API_BASE_URL}/my-applications`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setApplications(res.data))
    .catch(() => toast.error("Failed to fetch applied jobs"))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-container"><Spinner text="Loading your applications..." /></div>;

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-header mb-1">My Applications</h1>
        <p className="text-text-muted text-sm mb-6">{applications.length} application{applications.length !== 1 ? "s" : ""}</p>
      </motion.div>

      {applications.length === 0 ? (
        <EmptyState
          icon="📨"
          title="No applications yet"
          description="Start applying to jobs to track them here."
        />
      ) : (
        <motion.div
          initial="hidden" animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="space-y-4"
        >
          {applications.map((app) => (
            <motion.div
              key={app._id}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="card p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-text-primary">{app.job?.title}</h2>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {app.job?.company} · 📍 {app.job?.location}
                  </p>
                  {app.job?.salary && (
                    <p className="text-sm font-medium text-brand-700 mt-0.5">💰 {app.job.salary}</p>
                  )}
                </div>
                <Badge
                  status={app.status}
                  label={app.status === "applied" ? "Pending Review" : app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-muted">
                {app.contact?.phone    && <span>📞 {app.contact.phone}</span>}
                {app.contact?.linkedin && <span>🔗 {app.contact.linkedin}</span>}
                {resolveUrl(app.resume) && (
                  <div className="mt-3">
                    <a 
                      href={resolveUrl(app.resume)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-brand-600 font-medium hover:underline"
                    >
                      📄 View Resume
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}