import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../utils/constants";

export default function EditJob() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const token    = localStorage.getItem("token");

  const [form, setForm]       = useState({
    title:            "",
    company:          "",
    location:         "",
    salary:           "",
    description:      "",
    qualifications:   "",
    responsibilities: "",
  });
  const [loading, setLoading] = useState(true);

  // ── Same fetch logic as original ─────────────────────────────────────────
  useEffect(() => {
    fetch(`${API_BASE_URL}/jobs`)
      .then((res) => res.json())
      .then((data) => {
        const job = data.find((j) => j._id === id);
        if (job) setForm(job);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load job");
        setLoading(false);
      });
  }, [id]);

  const updateJob = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method:  "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Job updated successfully!");
        navigate("/my-jobs");
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
          <p className="text-sm text-text-muted">Loading job...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-header">Edit Job</h1>
          <p className="text-text-muted text-sm mt-1">
            Update the details for this job posting
          </p>
        </div>

        <form onSubmit={updateJob} className="card p-8 space-y-5">

          {/* Title + Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="input-group">
              <label className="label">Job Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input"
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <div className="input-group">
              <label className="label">Company Name *</label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="input"
                placeholder="e.g. Acme Corp"
              />
            </div>
          </div>

          {/* Location + Salary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="input-group">
              <label className="label">Location *</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="input"
                placeholder="e.g. Pune, India or Remote"
              />
            </div>
            <div className="input-group">
              <label className="label">
                Salary{" "}
                <span className="text-text-muted font-normal">(optional)</span>
              </label>
              <input
                value={form.salary}
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
                className="input"
                placeholder="e.g. ₹6–8 LPA"
              />
            </div>
          </div>

          {/* Description */}
          <div className="input-group">
            <label className="label">Job Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input"
              rows={4}
              placeholder="Describe the role, team, and responsibilities..."
            />
          </div>

          {/* Qualifications */}
          <div className="input-group">
            <label className="label">
              Qualifications{" "}
              <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea
              value={form.qualifications}
              onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
              className="input"
              rows={2}
              placeholder="e.g. Bachelor's degree in CS, 2+ years React experience"
            />
          </div>

          {/* Responsibilities */}
          <div className="input-group">
            <label className="label">
              Responsibilities{" "}
              <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea
              value={form.responsibilities}
              onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
              className="input"
              rows={3}
              placeholder="e.g. Build frontend features, collaborate with design team..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">
              💾 Update Job
            </button>
            <button
              type="button"
              onClick={() => navigate("/my-jobs")}
              className="btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}