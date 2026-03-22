import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const API = "${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api";

export default function JobDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API}/jobs/${id}`);
        setJob(res.data);
      } catch {
        toast.error("Failed to load job");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const checkApplied = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${API}/my-applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const exists = res.data.some(app => app.job._id === id);
      setApplied(exists);
    } catch {}
  };

  useEffect(() => {
    checkApplied();
  }, [id]);

  const handleApply = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setApplying(true);

    try {
      const res = await axios.post(
        `${API}/apply`,
        { jobId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message);
      setApplied(true);

    } catch (err) {
      toast.warning(err.response?.data?.message || "Apply failed");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (!job) return <p className="p-8">Job not found</p>;

  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT CONTENT */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow">

          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            {job.title}
          </h1>

          <p className="text-gray-600 mb-4">
            {job.company} • {job.location}
          </p>

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full mb-6">
            {job.salary}
          </span>

          <section className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </section>

          <section className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Qualifications</h2>
            <p className="text-gray-700">{job.qualifications}</p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Responsibilities</h2>
            <p className="text-gray-700">{job.responsibilities}</p>
          </section>

        </div>

        {/* RIGHT STICKY APPLY CARD */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow h-fit sticky top-24"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >

          <h3 className="text-xl font-semibold mb-3">
            {job.company}
          </h3>

          <p className="text-gray-600 mb-2">{job.location}</p>
          <p className="font-bold mb-4">{job.salary}</p>

          <button
            disabled={applied || applying}
            onClick={handleApply}
            className={`w-full py-3 rounded-lg font-medium transition
              ${applied
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"}
            `}
          >
            {applied ? "✅ Applied" : applying ? "Applying..." : "Apply Now"}
          </button>

          {applied && (
            <p className="text-green-600 text-sm mt-3 text-center">
              You have already applied for this job
            </p>
          )}

        </motion.div>

      </div>
    </motion.div>
  );
}
