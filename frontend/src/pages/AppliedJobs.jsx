import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaLinkedin, FaFileAlt } from "react-icons/fa";

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_URL}/my-applications`, {
        headers: { Authorization: `Bearer ${token}`},
      });
      setApplications(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch applied jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading applied jobs...</p>;

  const getStatusBadge = (status) => {
    if (status === "accepted")
      return <span className="px-3 py-1 rounded-full text-white bg-green-600 text-sm font-semibold">Accepted</span>;
    if (status === "rejected")
      return <span className="px-3 py-1 rounded-full text-white bg-red-600 text-sm font-semibold">Rejected</span>;
    return <span className="px-3 py-1 rounded-full text-yellow-800 bg-yellow-100 text-sm font-semibold">Pending</span>;
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">My Applied Jobs</h1>

      {applications.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">
          You haven't applied to any jobs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {applications.map((app) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
              >
                {/* JOB INFO */}
                <div>
                  <h2 className="text-xl font-semibold text-blue-700">{app.job.title}</h2>
                  <p className="text-gray-600">{app.job.company} — {app.job.location}</p>
                  <p className="text-gray-500 mt-1">{app.job.salary}</p>

                  {/* STATUS BADGE */}
                  <div className="mt-3">
                      {getStatusBadge(app.status)}
                  </div>

                  {/* CONTACT INFO */}
                  {app.contact && (
                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <h3 className="font-semibold">Contact Info</h3>
                      <p className="flex items-center gap-1">
                        <FaPhone className="text-gray-500" /> {app.contact.phone || "N/A"}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaLinkedin className="text-blue-600" />{" "}
                        {app.contact.linkedin || "N/A"}
                      </p>
                    </div>
                  )}

                  {/* RESUME LINK */}
                  {app.resume && (
                    <div className="mt-2 flex items-center gap-1">
                      <FaFileAlt className="text-gray-600" />
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Resume
                      </a>
                    </div>
                  )}
                </div>

                {/* APPLY DATE OR MOCKUP BADGE */}
                <div className="mt-4 flex justify-end">
                  <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaPhone, FaLinkedin, FaFileAlt, FaCheck, FaTimes, FaClock } from "react-icons/fa";

// const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

// export default function AppliedJobs() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/my-applications`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch applied jobs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   if (loading)
//     return <p className="p-6 text-center text-gray-600">Loading applied jobs...</p>;

//   const getStatusBadge = (status) => {
//     if (status === "accepted")
//       return (
//         <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-600 text-white text-sm font-semibold shadow-sm">
//           <FaCheck /> Accepted
//         </span>
//       );
//     if (status === "rejected")
//       return (
//         <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-sm font-semibold shadow-sm">
//           <FaTimes /> Rejected
//         </span>
//       );
//     return (
//       <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold shadow-sm">
//         <FaClock /> Pending
//       </span>
//     );
//   };

//   return (
//     <div className="p-8 min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">My Applied Jobs</h1>

//       {applications.length === 0 ? (
//         <p className="text-gray-600 text-center mt-10">
//           You haven't applied to any jobs yet.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <AnimatePresence>
//             {applications.map((app) => (
//               <motion.div
//                 key={app._id}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 whileHover={{ scale: 1.03 }}
//                 transition={{ duration: 0.4 }}
//                 className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border-l-4 border-blue-600 relative"
//               >
//                 {/* Ribbon for applied date */}
//                 <div className="absolute top-3 right-3 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full shadow-sm">
//                   Applied: {new Date(app.createdAt).toLocaleDateString()}
//                 </div>

//                 {/* JOB INFO */}
//                 <div className="space-y-2">
//                   <h2 className="text-xl font-semibold text-blue-700">{app.job.title}</h2>
//                   <p className="text-gray-600">{app.job.company} — {app.job.location}</p>
//                   <p className="text-gray-500">{app.job.salary}</p>

//                   {/* STATUS BADGE */}
//                   <div className="mt-2">{getStatusBadge(app.status)}</div>

//                   {/* CONTACT INFO */}
//                   {app.contact && (
//                     <div className="mt-3 text-sm text-gray-700 space-y-1">
//                       <h3 className="font-semibold">Contact Info</h3>
//                       <p className="flex items-center gap-1 hover:text-blue-600 transition">
//                         <FaPhone className="text-gray-500" /> {app.contact.phone || "N/A"}
//                       </p>
//                       <p className="flex items-center gap-1 hover:text-blue-600 transition">
//                         <FaLinkedin className="text-blue-600" /> {app.contact.linkedin || "N/A"}
//                       </p>
//                     </div>
//                   )}

//                   {/* RESUME LINK */}
//                   {app.resume && (
//                     <div className="mt-2 flex items-center gap-1 hover:scale-105 transition-transform">
//                       <FaFileAlt className="text-gray-600" />
//                       <a
//                         href={app.resume}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-600 underline"
//                       >
//                         View Resume
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// }
