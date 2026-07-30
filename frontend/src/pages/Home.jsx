import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { icon: "🔍", title: "Smart Job Discovery",    desc: "Filter by title, company, or location. Find roles that match your skills." },
  { icon: "📋", title: "One-Click Applications", desc: "Apply with your saved profile. Track every application in one place." },
  { icon: "🏢", title: "Powerful for Employers",  desc: "Post jobs, manage applicants, accept or reject — all from your dashboard." },
  { icon: "🔔", title: "Real-time Status Updates",desc: "Applicants see live status changes the moment employers review them." },
];

const stats = [
  { label: "Jobs Available",    value: "500+" },
  { label: "Companies Hiring",  value: "120+" },
  { label: "Applications Made", value: "2,400+" },
  { label: "Successful Hires",  value: "340+" },
];

const steps = [
  { step: "1", title: "Create an account",     desc: "Sign up as a job seeker or employer in under a minute." },
  { step: "2", title: "Browse or post jobs",   desc: "Search listings or create a job posting with full details." },
  { step: "3", title: "Apply or hire",         desc: "Submit applications or review candidates and manage status." },
];

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isEmployer  = user?.role === "employer";
  const isLoggedIn  = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-white/10 text-white/90 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              🚀 Your career starts here
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              Find Your<br />
              <span className="text-brand-200">Dream Job</span>
            </h1>
            <p className="text-brand-100 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Connect with top companies and exciting opportunities.
              Whether you're hiring or looking — JobPortal makes it simple.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            {!isLoggedIn ? (
              <>
                <Link to="/register" className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-btn hover:bg-brand-50 transition-colors">
                  Get Started — Free
                </Link>
                <Link to="/jobs" className="border border-white/30 text-white px-8 py-3 rounded-btn hover:bg-white/10 transition-colors">
                  Browse Jobs
                </Link>
              </>
            ) : isEmployer ? (
              <>
                <Link to="/post-job" className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-btn hover:bg-brand-50 transition-colors">
                  Post a Job
                </Link>
                <Link to="/employer-dashboard" className="border border-white/30 text-white px-8 py-3 rounded-btn hover:bg-white/10 transition-colors">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/jobs" className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-btn hover:bg-brand-50 transition-colors">
                  Browse Jobs
                </Link>
                <Link to="/applied-jobs" className="border border-white/30 text-white px-8 py-3 rounded-btn hover:bg-white/10 transition-colors">
                  My Applications
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="border-b border-surface-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="text-2xl md:text-3xl font-bold text-brand-700">{s.value}</p>
              <p className="text-sm text-text-muted mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="py-20 bg-surface-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-3">Everything you need in one place</h2>
            <p className="text-text-muted max-w-xl mx-auto">
              A complete hiring platform built for both job seekers and employers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-3">How it works</h2>
            <p className="text-text-muted">Three steps to your next opportunity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-bold text-lg flex items-center justify-center mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-text-muted">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      {!isLoggedIn && (
        <section className="bg-brand-700 text-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-3">Ready to get started?</h2>
              <p className="text-brand-100 mb-6">
                Join today — it's free for job seekers, forever.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/register" className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-btn hover:bg-brand-50 transition-colors">
                  Sign up for free
                </Link>
                <Link to="/jobs" className="border border-white/30 text-white px-8 py-3 rounded-btn hover:bg-white/10 transition-colors">
                  Browse Jobs
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}