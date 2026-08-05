import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    description: "",
    qualifications: "",
    responsibilities: ""
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Proper role protection
  useEffect(() => {
    if (!user || user.role !== "employer") {
      toast.error("Only employers can post jobs");
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {

    console.log("FORM DATA 👉", form);

    e.preventDefault();

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!form.title || !form.company || !form.location || !form.description) {
      toast.error("Please fill all required fields");
      return;
    }

     try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/jobs`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Job posted successfully!");
      setForm({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        qualifications: "",
        responsibilities: ""
      });
      navigate("/jobs");

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="page-header">Post a Job</h1>
          <p className="text-text-muted text-sm mt-1">Fill in the details to attract great candidates</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="input-group">
              <label className="label">Job Title *</label>
              <input className="input" placeholder="e.g. Frontend Developer"
                value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="input-group">
              <label className="label">Company Name *</label>
              <input className="input" placeholder="e.g. Acme Corp"
                value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
            </div>
            <div className="input-group">
              <label className="label">Location *</label>
              <input className="input" placeholder="e.g. Mumbai, India or Remote"
                value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="input-group">
              <label className="label">Salary <span className="text-text-muted font-normal">(optional)</span></label>
              <input className="input" placeholder="e.g. ₹6–8 LPA"
                value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
            </div>
          </div>

          <div className="input-group">
            <label className="label">Job Description *</label>
            <textarea className="input" rows={4} placeholder="Describe the role, team, and what success looks like..."
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="label">Qualifications</label>
            <textarea className="input" rows={2} placeholder="e.g. Bachelor's degree in CS, 2+ years React experience"
              value={form.qualifications} onChange={e => setForm({ ...form, qualifications: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="label">Responsibilities</label>
            <textarea className="input" rows={3} placeholder="e.g. Build and maintain frontend features, collaborate with design..."
              value={form.responsibilities} onChange={e => setForm({ ...form, responsibilities: e.target.value })} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">Post Job</button>
            <button type="button" onClick={() => navigate("/employer-dashboard")} className="btn-ghost">Cancel</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}