import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API = "${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    qualifications: "",
    responsibilities: "",
  });

  useEffect(() => {
    fetch(`${API}/jobs`)
      .then(res => res.json())
      .then(data => {
        const job = data.find(j => j._id === id);
        if (job) setForm(job);
      });
  }, [id]);

  const updateJob = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        toast.success("Job updated!");
        navigate("/my-jobs");
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <form onSubmit={updateJob} className="max-w-xl mx-auto p-6 space-y-3">
      {["title","company","location","salary"].map(field => (
        <input
          key={field}
          value={form[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          className="border p-2 w-full"
          //placeholder={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
        />
      ))}

      <textarea
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        className="border p-2 w-full"
        rows="4"
        placeholder="Job Description"
      />

       <textarea
        value={form.qualifications}
        onChange={e => setForm({ ...form, qualifications: e.target.value })}
        className="border p-2 w-full"
        rows="2"
        placeholder="Qualifications (e.g., Bachelor's, certifications)"
      />

      <textarea
        value={form.responsibilities}
        onChange={e => setForm({ ...form, responsibilities: e.target.value })}
        className="border p-2 w-full"
        rows="3"
        placeholder="Responsibilities (e.g., Manage team, report progress)"
      />

      <button className="bg-green-600 text-white p-2 w-full rounded">
        Update Job
      </button>
    </form>
  );
}
