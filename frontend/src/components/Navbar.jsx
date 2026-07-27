import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constants";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sync = () => setUser(JSON.parse(localStorage.getItem("user")));
    window.addEventListener("storage", sync);
    window.addEventListener("userUpdated", sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener("userUpdated", sync); };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const close = (e) => { if (!e.target.closest("#user-menu")) setDropdownOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    return parts.length === 1 ? parts[0][0] : parts[0][0] + parts[1][0];
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isJobSeeker = user?.role === "jobseeker";
  const isEmployer = user?.role === "employer";

  const navLinks = !token ? [
    { to: "/login",    label: "Log in" },
    { to: "/register", label: "Get Started", primary: true },
  ] : isEmployer ? [
    { to: "/post-job",            label: "Post a Job" },
    { to: "/employer-dashboard",  label: "Dashboard" },
    { to: "/my-jobs",             label: "My Jobs" },
  ] : [
    { to: "/jobs",         label: "Browse Jobs" },
    { to: "/applied-jobs", label: "My Applications" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-surface-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-brand-700">
            <span className="text-2xl">💼</span>
            <span>JobPortal</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              link.primary ? (
                <Link key={link.to} to={link.to} className="btn-primary ml-2">{link.label}</Link>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-btn text-sm font-medium transition-colors
                    ${pathname === link.to
                      ? "text-brand-700 bg-brand-50"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-muted"
                    }`}
                >
                  {link.label}
                </Link>
              )
            ))}

            {/* User menu */}
            {token && (
              <div className="relative ml-3" id="user-menu">
                <button
                  onClick={() => setDropdownOpen(o => !o)}
                  className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-full border border-surface-border hover:border-brand-300 transition-colors"
                >
                  <span className="text-sm font-medium text-text-secondary">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white overflow-hidden"
                    style={{ backgroundColor: user?.avatarColor || "#2563EB" }}
                  >
                    {user?.profile?.avatar
                      ? <img src={`${API_BASE_URL.replace("/api", "")}${user.profile.avatar}`} alt="" className="w-full h-full object-cover" />
                      : getInitials(user?.name || "U")
                    }
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-11 w-52 card shadow-modal py-1 z-50">
                    <div className="px-4 py-2.5 border-b border-surface-border">
                      <p className="text-sm font-semibold text-text-primary">{user?.name}</p>
                      <p className="text-xs text-text-muted capitalize">{user?.role}</p>
                    </div>
                    <Link to="/profile" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors">
                      👤 My Profile
                    </Link>
                    {isJobSeeker && (
                      <Link to="/applied-jobs" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors">
                        📋 My Applications
                      </Link>
                    )}
                    <div className="border-t border-surface-border mt-1">
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-light transition-colors">
                        🚪 Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(o => !o)} className="md:hidden btn-ghost p-2">
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-surface-border py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-btn text-sm font-medium transition-colors
                  ${pathname === link.to ? "text-brand-700 bg-brand-50" : "text-text-secondary"}`}>
                {link.label}
              </Link>
            ))}
            {token && (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm text-text-secondary">👤 Profile</Link>
                <button onClick={handleLogout} className="text-left px-4 py-2.5 text-sm text-danger">🚪 Log out</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}