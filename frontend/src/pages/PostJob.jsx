import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-3">
      <input
        placeholder="Job Title"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Company Name"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, company: e.target.value })}
      />

      <input
        placeholder="Location"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, location: e.target.value })}
      />

      <input
        placeholder="Salary (optional)"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, salary: e.target.value })}
      />

      <select
        className="border p-2 w-full"
        value={form.type}
        onChange={e => setForm({ ...form, type: e.target.value })}
      >
        <option value="">Select Job Type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Internship">Internship</option>
        <option value="Remote">Remote</option>
      </select>


      <textarea
        placeholder="Job Description"
        className="border p-2 w-full"
        rows="4"
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <textarea
        placeholder="Qualifications (e.g., Bachelor's degree, certifications)"
        className="border p-2 w-full"
        rows="2"
        value={form.qualifications}
        onChange={e => setForm({ ...form, qualifications: e.target.value })}
      />

      <textarea
        placeholder="Responsibilities (e.g., Manage team, report progress)"
        className="border p-2 w-full"
        rows="3"
        value={form.responsibilities}
        onChange={e => setForm({ ...form, responsibilities: e.target.value })}
      />

      <button className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 transition">
        Post Job
      </button>
    </form>
  );
}
