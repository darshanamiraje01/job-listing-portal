import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaLinkedin, FaPhone, FaFileAlt } from "react-icons/fa";
import { API_BASE_URL } from "../utils/constants";

export default function Profile() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading]   = useState(true);
  const token = localStorage.getItem("token");

  const resolveUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL.replace("/api", "")}${path}`;
};

  const [formData, setFormData] = useState({
    name:    "",
    email:   "",
    profile: {
      bio:        "",
      skills:     [],
      location:   "",
      experience: "",
      education:  "",
    },
  });

  const isEmployer  = user?.role === "employer";
  const isJobSeeker = user?.role === "jobseeker";

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        profile: user.profile || {
          bio: "", skills: [], location: "", experience: "", education: "",
        },
      });
    }
  }, [user]);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    axios
      .get(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile fetch failed", err);
        setLoading(false);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      });
  }, []);

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/auth/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser({ ...res.data, profile: res.data.profile || {} });
      localStorage.setItem("user", JSON.stringify(res.data));
      window.dispatchEvent(new Event("userUpdated"));
      setEditMode(false);
      toast.success("Profile updated!");
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Failed to update profile");
    }
  };

  const getInitials = (name = "") => {
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const calculateProfileCompletion = () => {
    const fields = isEmployer
      ? [user?.name, user?.profile?.bio, user?.profile?.location]
      : [
          user?.name,
          user?.profile?.bio,
          user?.profile?.skills?.length,
          user?.profile?.location,
          user?.profile?.experience,
          user?.profile?.education,
        ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  const completion  = calculateProfileCompletion();

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
          <p className="text-sm text-text-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-container text-center py-20">
        <p className="text-text-muted">No user data. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        {/* ── Page title ── */}
        <div>
          <h1 className="page-header">My Profile</h1>
          <p className="text-text-muted text-sm mt-1">
            {isEmployer ? "Manage your company profile" : "Manage your job seeker profile"}
          </p>
        </div>

        {/* ── Avatar + completion card ── */}
        <div className="card p-6 flex flex-col sm:flex-row items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 rounded-full bg-brand-600 text-white flex items-center justify-center text-2xl font-bold overflow-hidden flex-shrink-0"
          >
            {user.profile?.avatar ? (
              <img
                src={resolveUrl(user.profile.avatar)}
                className="w-full h-full object-cover"
                alt="Avatar"
              />
            ) : (
              getInitials(user.name)
            )}
          </motion.div>

          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-1">
              <p className="font-semibold text-text-primary">{user.name}</p>
              <span className="text-sm font-medium text-brand-600">{completion}%</span>
            </div>
            <p className="text-xs text-text-muted mb-2">Profile completeness</p>
            <div className="w-full bg-surface-border h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-brand-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 capitalize">
                {user.role}
              </span>
              <span className="text-xs text-text-muted">{user.email}</span>
            </div>
          </div>
        </div>

        {/* ── VIEW MODE ── */}
        {!editMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-6 space-y-5"
          >
            {/* Basic info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">Name</p>
                <p className="text-text-primary font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">Email</p>
                <p className="text-text-primary">{user.email}</p>
              </div>
              {user.profile?.location && (
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
                    {isEmployer ? "Company Location" : "Location"}
                  </p>
                  <p className="text-text-primary">📍 {user.profile.location}</p>
                </div>
              )}
            </div>

            {/* Bio */}
            {user.profile?.bio && (
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
                  {isEmployer ? "About Company" : "Bio"}
                </p>
                <p className="text-text-secondary leading-relaxed">{user.profile.bio}</p>
              </div>
            )}

            {/* Job seeker specific */}
            {isJobSeeker && (
              <>
                {/* Skills */}
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {user.profile?.skills?.length ? (
                      user.profile.skills.map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-text-muted">No skills added yet</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.profile?.experience && (
                    <div>
                      <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">Experience</p>
                      <p className="text-text-primary">💼 {user.profile.experience}</p>
                    </div>
                  )}
                  {user.profile?.education && (
                    <div>
                      <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">Education</p>
                      <p className="text-text-primary">🎓 {user.profile.education}</p>
                    </div>
                  )}
                </div>

                {/* Contact + Resume */}
                <div className="border-t border-surface-border pt-4 space-y-2">
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Contact</p>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <FaPhone className="text-text-muted flex-shrink-0" />
                    {user.profile?.phone || <span className="text-text-muted">Phone not added</span>}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <FaLinkedin className="text-blue-600 flex-shrink-0" />
                    {user.profile?.linkedin ? (
                      <a href={user.profile.linkedin} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">
                        LinkedIn Profile
                      </a>
                    ) : (
                      <span className="text-text-muted">LinkedIn not added</span>
                    )}
                  </div>
                  {resolveUrl(user.profile?.resume) && (
                    <div className="flex items-center gap-2 text-sm">
                      <FaFileAlt className="text-text-muted flex-shrink-0" />
                      <a href={resolveUrl(user.profile.resume)} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline font-medium">
                        View Resume
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}

            <button onClick={() => setEditMode(true)} className="btn-primary">
              ✏️ Edit Profile
            </button>
          </motion.div>
        )}

        {/* ── EDIT MODE ── */}
        {editMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-6 space-y-5"
          >
            <h2 className="font-semibold text-text-primary text-lg">Edit Profile</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="input-group">
                <label className="label">{isEmployer ? "Company Name" : "Full Name"}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="Name"
                />
              </div>
              <div className="input-group">
                <label className="label">{isEmployer ? "Company Location" : "Location"}</label>
                <input
                  type="text"
                  value={formData.profile?.location || ""}
                  onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, location: e.target.value } })}
                  className="input"
                  placeholder="e.g. Mumbai, India"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="label">{isEmployer ? "About Company" : "Bio"}</label>
              <textarea
                value={formData.profile?.bio || ""}
                onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, bio: e.target.value } })}
                rows={4}
                className="input"
                placeholder={isEmployer ? "Describe your company..." : "Tell us about yourself..."}
              />
            </div>

            {isJobSeeker && (
              <>
                <div className="input-group">
                  <label className="label">Skills <span className="text-text-muted font-normal">(comma separated)</span></label>
                  <input
                    type="text"
                    value={formData.profile?.skills?.join(", ") || ""}
                    onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, skills: e.target.value.split(",").map((s) => s.trim()) } })}
                    className="input"
                    placeholder="React, Node.js, MongoDB..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="label">Experience</label>
                    <input
                      type="text"
                      value={formData.profile?.experience || ""}
                      onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, experience: e.target.value } })}
                      className="input"
                      placeholder="e.g. 2 years React"
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Education</label>
                    <input
                      type="text"
                      value={formData.profile?.education || ""}
                      onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, education: e.target.value } })}
                      className="input"
                      placeholder="e.g. B.E. IT, DYPCOE"
                    />
                  </div>
                </div>

                {/* Resume upload */}
                <div className="card p-4 bg-surface-muted space-y-2">
                  <p className="text-sm font-semibold text-text-primary">📄 Resume</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const formDataUpload = new FormData();
                      formDataUpload.append("resume", file);
                      try {
                        const res = await axios.put(
                          `${API_BASE_URL}/resume`,
                          formDataUpload,
                          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
                        );
                        setFormData((prev) => ({ ...prev, profile: { ...prev.profile, resume: res.data.resumeUrl } }));
                        setUser((prev) => ({ ...prev, profile: { ...prev.profile, resume: res.data.resumeUrl } }));
                        localStorage.setItem("user", JSON.stringify({ ...user, profile: { ...user.profile, resume: res.data.resumeUrl } }));
                        toast.success("Resume uploaded!");
                      } catch (err) {
                        console.error(err);
                        toast.error("Resume upload failed");
                      }
                    }}
                    className="input bg-white"
                  />
                  {resolveUrl(formData.profile?.resume) && (
                    <p className="text-sm text-text-muted flex items-center gap-1">
                      <FaFileAlt className="text-text-muted" />
                      <a href={resolveUrl(formData.profile.resume)} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">
                        View current resume
                      </a>
                    </p>
                  )}
                </div>

                {/* Contact info */}
                <div className="card p-4 bg-surface-muted space-y-3">
                  <p className="text-sm font-semibold text-text-primary">Contact Information</p>
                  <div className="input-group">
                    <label className="label flex items-center gap-1"><FaPhone className="text-text-muted" /> Phone</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.profile?.phone || ""}
                      onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, phone: e.target.value } })}
                      className="input bg-white"
                    />
                  </div>
                  <div className="input-group">
                    <label className="label flex items-center gap-1"><FaLinkedin className="text-blue-600" /> LinkedIn URL</label>
                    <input
                      type="text"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.profile?.linkedin || ""}
                      onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, linkedin: e.target.value } })}
                      className="input bg-white"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-2">
              <button onClick={saveProfile} className="btn-primary flex-1">
                💾 Save Changes
              </button>
              <button
                onClick={() => { setEditMode(false); setFormData(user); }}
                className="btn-ghost"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}