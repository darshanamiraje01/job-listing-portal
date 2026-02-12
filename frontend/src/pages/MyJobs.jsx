import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API = "http://localhost:5000/api";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchMyJobs = async () => {
    try {
      const res = await fetch(`${API}/my-jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch {
      toast.error("Failed to load your jobs");
    }
  };

    const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`${API}/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Job deleted successfully");
        setJobs(jobs.filter(job => job._id !== id)); // remove from state
      } else {
        toast.error("Failed to delete job");
      }
    } catch (err) {
      toast.error("Error deleting job");
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My Posted Jobs</h1>

//       {jobs.length === 0 && <p>No jobs posted yet.</p>}

//       {jobs.map(job => (
//         <div key={job._id} className="border p-4 rounded mb-4">
//           <h2 className="font-bold">{job.title}</h2>
//           <p>{job.company} — {job.location}</p>
//           <p>{job.salary}</p>
//           <p className="text-gray-600">{job.description?.slice(0, 100)}...</p>
          
//           <div className="mt-2 flex gap-2">
//           <button
//             onClick={() => navigate(`/edit-job/${job._id}`)}
//             className="bg-blue-600 text-white px-4 py-1 rounded"
//           >
//             Edit
//           </button>

//           <button
//           onClick={() => navigate(`/view-job/${job._id}`)}
//           className="bg-blue-600 text-white px-4 py-1 rounded">
//             View
//           </button>

//           <button
//           onClick={() => handleDelete(job._id)}
//           className="bg-red-600 text-white px-4 py-1 rounded"
//         >
//           Delete
//         </button>

//         <button 
//         onClick={() => navigate(`/job-applicants/${job._id}`)}
//         className="bg-green-600 text-white px-4 py-1 rounded">
//           View Applicants
//         </button>
//         </div>
//       </div>
//       ))}
//     </div>
//   );

 return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Posted Jobs</h1>

      {jobs.length === 0 && (
        <p className="text-gray-500 text-lg">No jobs posted yet.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {jobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative border rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition-transform"
            >
              {/* Job Title and Badges */}
              <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {job.location}
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {job.salary}
                </span>
                {job.company && (
                  <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-full">
                    {job.company}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mt-2">{job.description?.slice(0, 120)}...</p>

              {/* Buttons */}
              <div className="mt-4 flex gap-2 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition text-sm"
                  onClick={() => navigate(`/edit-job/${job._id}`)}
                >
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-400 text-white px-3 py-1.5 rounded hover:bg-blue-500 transition text-sm"
                  onClick={() => navigate(`/view-job/${job._id}`)}
                >
                  View
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition text-sm"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 transition text-sm"
                  onClick={() => navigate(`/job/${job._id}/applicants`)}
                >
                  Applicants
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

}
