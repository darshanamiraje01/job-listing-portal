import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "", 
    password: "",
    role: "jobseeker"
 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, form);
    alert("Registered successfully");
    navigate("/login");
  } catch(err) {
    alert(err.response ?.data?.message || "Registration failed!");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
      <h2 className="text-center text-2xl font-semibold">Register</h2>

      <input 
      placeholder="Name" 
      className="border p-2 rounded" 
      onChange={e => setForm({...form, name: e.target.value})} />

      <input 
      placeholder="Email" 
      className="border p-2 rounded" 
      onChange={e => setForm({...form, email: e.target.value})} />

      <input 
      type="password" 
      placeholder="Password" 
      className="border p-2 rounded" 
      onChange={e => setForm({...form, password: e.target.value})} />

      <select
        className="border p-2 ronded"
        value={form.role}
        onChange={e => setForm({...form, role: e.target.value})}>
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

      <button 
      className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">Register</button>
    </form>
    </div>
  );
}
