// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const API = "http://localhost:5000/api";

// export default function EmployerDashboard() {
//   const [data, setData] = useState(null);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`${API}/employer-dashboard`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(setData);
//   }, []);

//   if (!data) return <p className="p-6">Loading dashboard...</p>;

//   return (
//     <div className="p-6 space-y-6">

//       <h1 className="text-2xl font-bold">Employer Dashboard</h1>

//       <div className="flex gap-4 mb-4">
//         <button
//           onClick={() => navigate("/post-job")}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Post a Job
//         </button>

//       <button
//         onClick={() => navigate("/my-jobs")}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//       >
//         View All My Jobs
//       </button>
//       </div>

//       <div className="grid grid-cols-2 gap-4">

//       <div className="bg-blue-100 p-4 rounded">
//         <h2 className="text-lg">Jobs Posted</h2>
//         <p className="text-3xl font-bold">{data.totalJobs}</p>
//       </div>

//       <div className="bg-green-100 p-4 rounded">
//         <h2 className="text-lg">Applications</h2>
//         <p className="text-3xl font-bold">{data.totalApplications}</p>
//       </div>

//       <div className="bg-emerald-100 p-4 rounded">
//         <h2 className="text-lg">Accepted</h2>
//         <p className="text-3xl font-bold">{data.accepted}</p>
//       </div>

//       <div className="bg-red-100 p-4 rounded">
//         <h2 className="text-lg">Rejected</h2>
//         <p className="text-3xl font-bold">{data.rejected}</p>
//       </div>

//     </div>


//       <div>
//         <h2 className="text-xl font-semibold mb-2">Recent Jobs</h2>

//         {data.recentJobs.map(job => (
//           <div key={job._id} className="border p-3 rounded mb-2">
//             <p className="font-semibold">{job.title}</p>
//             <p className="text-sm">{job.location} — {job.salary}</p>
//             <p className="text-gray-600 text-sm line-clamp-2">
//               {job.description}
//             </p>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const API = "http://localhost:5000/api";

export default function EmployerDashboard() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/employer-dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setData(res.data));
  }, []);

  if (!data) return <p className="p-8">Loading dashboard...</p>;

  const stats = [
    { label: "Jobs Posted", value: data.totalJobs },
    { label: "Applications", value: data.totalApplications },
    { label: "Accepted", value: data.accepted },
    { label: "Rejected", value: data.rejected }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/post-job")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Post Job
          </button>

          <button
            onClick={() => navigate("/my-jobs")}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            My Jobs
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <p className="text-gray-500">{s.label}</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {s.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* RECENT JOBS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {data.recentJobs.map(job => (
            <motion.div
              key={job._id}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/job/${job._id}/applicants`)}
              className="bg-white p-5 rounded-xl shadow cursor-pointer hover:shadow-lg"
            >
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-gray-600 text-sm">
                {job.location} • {job.salary}
              </p>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {job.description}
              </p>

              <span className="text-blue-600 text-sm mt-3 inline-block">
                View Applicants →
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
