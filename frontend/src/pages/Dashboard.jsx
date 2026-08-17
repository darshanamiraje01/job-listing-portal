import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage.getItem("user"));

  // Employers should never land here — redirect them
  useEffect(() => {
    if (user?.role === "employer") {
      navigate("/employer-dashboard", { replace: true });
    }
  }, []);

  if (!user) {
    return (
      <div className="page-container text-center py-20">
        <p className="text-text-muted">Please log in to view your dashboard.</p>
      </div>
    );
  }

  // Job seeker dashboard
  const quickLinks = [
    { icon: "🔍", label: "Browse Jobs",       to: "/jobs",         desc: "Find your next opportunity" },
    { icon: "📋", label: "My Applications",   to: "/applied-jobs", desc: "Track your application status" },
    { icon: "👤", label: "My Profile",        to: "/profile",      desc: "Update your skills and resume" },
  ];

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="page-header">Welcome back, {user.name?.split(" ")[0]} 👋</h1>
          <p className="text-text-muted text-sm mt-1">
            Here's a quick overview of your job search
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map((link, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={link.to}
                className="card card-hover p-5 flex flex-col gap-2"
              >
                <span className="text-2xl">{link.icon}</span>
                <p className="font-semibold text-text-primary">{link.label}</p>
                <p className="text-xs text-text-muted">{link.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Profile completion nudge */}
        <div className="card p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="font-medium text-text-primary">Complete your profile</p>
            <p className="text-sm text-text-muted mt-0.5">
              A complete profile gets 3x more recruiter attention
            </p>
          </div>
          <Link to="/profile" className="btn-primary self-start sm:self-auto whitespace-nowrap">
            Update Profile →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}