import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../utils/constants";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";
import Badge from "../components/ui/Badge";

export default function JobApplicants() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const resolveUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL.replace("/api", "")}${path}`;
};

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setApps(apps => apps.map(a => a._id === updated._id ? updated : a));
      toast.success(`Application ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/job/${jobId}/applications`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setApps(res.data))
    .catch(() => toast.error("Failed to load applicants"))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-container"><Spinner text="Loading applicants..." /></div>;

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-header mb-1">Applicants</h1>
        <p className="text-text-muted text-sm mb-6">{apps.length} application{apps.length !== 1 ? "s" : ""} received</p>
      </motion.div>

      {apps.length === 0 ? (
        <EmptyState icon="👥" title="No applicants yet" description="Share the job to attract candidates." />
      ) : (
        <motion.div
          initial="hidden" animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="space-y-4"
        >
          {apps.map(app => (
            <motion.div
              key={app._id}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="card p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <h2 className="font-semibold text-text-primary">{app.user?.name}</h2>
                  <p className="text-sm text-text-muted">{app.user?.email}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-text-muted mt-1.5">
                    {app.contact?.phone    && <span>📞 {app.contact.phone}</span>}
                    {app.contact?.linkedin && <span>🔗 {app.contact.linkedin}</span>}
                  </div>
                </div>
                <Badge status={app.status} label={app.status === "applied" ? "New" : app.status.charAt(0).toUpperCase() + app.status.slice(1)} />
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2">
                {resolveUrl(app.resume) && (
                <a 
                  href={resolveUrl(app.resume)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-xs"
                >
                  📄 Download Resume
                </a>
              )}
                {app.status === "applied" && (
                  <>
                    <button onClick={() => updateStatus(app._id, "accepted")} className="btn-primary text-xs bg-success hover:bg-success-dark">
                      ✅ Accept
                    </button>
                    <button onClick={() => updateStatus(app._id, "rejected")} className="btn-danger text-xs">
                      ❌ Reject
                    </button>
                  </>
                )}
                {app.status !== "applied" && (
                  <button onClick={() => updateStatus(app._id, "applied")} className="btn-ghost text-xs">
                    ↩ Undo
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}