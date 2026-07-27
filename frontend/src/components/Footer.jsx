import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-text-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span>💼</span> JobPortal
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting talent with opportunity. Built with MERN Stack — MongoDB, Express, React, Node.js.
            </p>
          </div>

          {/* For job seekers */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-3">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs"          className="text-gray-300 hover:text-white transition-colors">Browse Jobs</Link></li>
              <li><Link to="/applied-jobs"  className="text-gray-300 hover:text-white transition-colors">My Applications</Link></li>
              <li><Link to="/profile"       className="text-gray-300 hover:text-white transition-colors">My Profile</Link></li>
            </ul>
          </div>

          {/* For employers */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-3">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/post-job"             className="text-gray-300 hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link to="/employer-dashboard"   className="text-gray-300 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/my-jobs"              className="text-gray-300 hover:text-white transition-colors">Manage Jobs</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">© {year} JobPortal. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link to="/register" className="hover:text-white transition-colors">Sign Up</Link>
            <Link to="/login"    className="hover:text-white transition-colors">Log In</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}