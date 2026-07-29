import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../utils/constants";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Please fill in all fields");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      const profile = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${res.data.token}` }
      });
      localStorage.setItem("user", JSON.stringify(profile.data));
      toast.success("Welcome back! 👋");
      // Dispatch event so Navbar re-reads localStorage
      window.dispatchEvent(new Event("userUpdated"));
      const role = profile.data.role;
      setTimeout(() => {
        navigate(profile.data.role === "employer" ? "/employer-dashboard" : "/jobs");
      }, 100);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">💼</div>
          <h1 className="text-2xl font-bold text-text-primary">Welcome back</h1>
          <p className="text-text-muted mt-1">Sign in to your account</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="input-group">
              <label className="label">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-1">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-text-muted mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-brand-600 font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}