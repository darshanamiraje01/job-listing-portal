// ViewJob.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = "http://localhost:5000/api";

export default function ViewJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setJob);
  }, [id]);

  if (!job) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 border rounded">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p><strong>Company: </strong>{job.company}</p>
      <p><strong>Location: </strong>{job.location}</p>
      <p><strong>Salary: </strong>{job.salary}</p>
      <p><strong>Description: </strong>{job.description}</p>
      {job.qualifications && <p><strong>Qualifications:</strong> {job.qualifications}</p>}
      {job.responsibilities && <p><strong>Responsibilities:</strong> {job.responsibilities}</p>}
    </div>
  );
}
