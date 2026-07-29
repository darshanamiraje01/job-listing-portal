import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../utils/constants";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "jobseeker" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error("Please fill in all fields");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, form);
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">💼</div>
          <h1 className="text-2xl font-bold text-text-primary">Create your account</h1>
          <p className="text-text-muted mt-1">Join thousands of job seekers and employers</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="input-group">
              <label className="label">Full name</label>
              <input type="text" placeholder="Jane Smith" className="input"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="input-group">
              <label className="label">Email address</label>
              <input type="email" placeholder="you@example.com" className="input"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>

            <div className="input-group">
              <label className="label">Password</label>
              <input type="password" placeholder="At least 6 characters" className="input"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>

            <div className="input-group">
              <label className="label">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "jobseeker", label: "🔍 Job Seeker", desc: "Find your dream job" },
                  { value: "employer",  label: "🏢 Employer",   desc: "Hire great talent" },
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: option.value })}
                    className={`p-3 rounded-btn border-2 text-left transition-colors ${
                      form.role === option.value
                        ? "border-brand-500 bg-brand-50"
                        : "border-surface-border hover:border-brand-300"
                    }`}
                  >
                    <p className="text-sm font-semibold">{option.label}</p>
                    <p className="text-xs text-text-muted">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-1">
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-text-muted mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}