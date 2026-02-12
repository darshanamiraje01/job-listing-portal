import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const [user, setUser] = useState(() =>
  JSON.parse(localStorage.getItem("user"))
);

useEffect(() => {
  const syncUser = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  window.addEventListener("storage", syncUser);
  window.addEventListener("userUpdated", syncUser);

  return () => {
    window.removeEventListener("storage", syncUser);
    window.removeEventListener("userUpdated", syncUser);
  };
}, []);


  const [open, setOpen] = useState(false);

  const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0];
  return parts[0][0] + parts[1][0];
  };

  const isJobSeeker = user?.role === "jobseeker";
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      
      <h1 className="text-xl font-bold tracking-wide">
        Job Portal
      </h1>

      <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-300 underline-offset-4 hover:underline
           transition font-medium">
            Home
          </Link>

          {isLoggedIn && user?.role === "employer" ? (
          <Link
            to="/employer-dashboard"
            className="hover:text-blue-300 underline-offset-4 hover:underline transition font-medium"
          >
            Employer Dashboard
          </Link>
        ) : (
          <Link
            to="/jobs"
            className="hover:text-blue-300 underline-offset-4 hover:underline transition font-medium"
          >
            Browse Jobs
          </Link>
        )}


        {!isLoggedIn ? (
          <>
          <Link to="/login" className="hover:text-blue-300 underline-offset-4 hover:underline
           transition">Login</Link>
          <Link to="/register" className="hover:text-blue-300 underline-offset-4 hover:underline
           transition">Register</Link>
          </>
        ) : (
        <div className="flex items-center space-x-3 relative">
          <span className="font-medium">Hi, {user?.name.split(" ")[0]}</span>
            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold cursor-pointer text-white"
              style={{ backgroundColor: user?.avatarColor || "#2563EB" }}
            >
            {user?.avatar ? (
            <img
            src={`http://localhost:5000${user.profile.avatar}`}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
            />
          ) : (
          getInitials(user?.name || "U")
        )}

  </div>

    {open && (
      <div className="absolute right-0 top-12 w-52 bg-white text-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
        <Link
          to="/profile"
          onClick={() => setOpen(false)}
          className="block px-4 py-2  hover:bg-gray-100"
        >
          My Profile
        </Link>
      {isJobSeeker && (
        <Link
          to="/applied-jobs"
          onClick={() => setOpen(false)}
          className="block px-4 py-2 hover:bg-gray-100"
          >
            My Applied Jobs
          </Link>
      )}

        <button
          onClick={() => {
            setOpen(false);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
            }}
          className="w-full text-left px-4 py-2   hover:bg-gray-100 text-red-500"
        >
          Logout
        </button>
      </div>
    )}
  </div>

      )}
      </div>
    </nav>
  );
}
