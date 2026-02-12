// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import { motion } from "framer-motion";

// // Dummy API endpoints (replace with your backend)
// const API_URL = "http://localhost:5000/api";

// export default function Jobs() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   // Fetch all jobs from backend
//   const fetchJobs = async () => {
//   setLoading(true);
//   try {
//     const res = await fetch(`${API_URL}/jobs`);
//     if(!res.ok) throw new Error("Fetch failed");
//     const data = await res.json();

//     if (Array.isArray(data)) {
//       setJobs(data);
//       setFilteredJobs(data);
//     } else if (Array.isArray(data.jobs)) {
//       setJobs(data.jobs);
//       setFilteredJobs(data.jobs);
//     } else {
//       setJobs([]);
//       setFilteredJobs([]);
//       toast.error("Jobs data format issue");
//     }

//   } catch (err) {
//     console.error(err);
//     toast.error("Failed to fetch jobs");
//   }
//   setLoading(false);
// };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   // Handle search
//   useEffect(() => {
//     const filtered = jobs.filter(job =>
//       (job.title || "").toLowerCase().includes(search.toLowerCase()) ||
//       (job.location || "").toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredJobs(filtered);
//   }, [search, jobs]);

//   const applyJob = async (jobId) => {

//   if (!token) {
//     toast.info("Please login to apply");
//     navigate("/login");
//     return;
//   }

//   try {
//     const res = await fetch(`${API_URL}/apply`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ jobId })
//     });

//     const data = await res.json();

//     //extra for looking for error can delete later
//     console.log("Apply response :", data, "Status :", res.status);

//     if (res.ok) {
//       toast.success("Applied successfully!");
//     } else {
//       toast.warning(data.message || "Already applied");
//     }

//   } catch (err) {
//     console.error(err);
//     toast.error("Apply failed");
//   }
// };

// const containerVariants ={
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.1 }}
// }

// const cardVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 }
// };

// const headerVariants = {
//   hidden: { opacity: 0, y: -20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 }}
// };

// const searchVariants = {
//   hidden: { opacity: 0, y: -10},
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 }}
// };

// //floating blob animation
// const floatVariants = {
//   animate: { y: ["0%", "10%", "0%"], x: ["0%", "5%", "0%"], transition: { duration: 6, repeat: Infinity, ease: "easeInOut"}}
// };
// //in first div changed the classname added rel and min-
//   return (
//     <motion.div 
//     initial="hidden"
//     animate="visible"
//     className="px-8 py-6 relative min-h-screen">

//       {/* floating background blobs */}
//       <motion.div className="absolute top-0 left-0 w-40 h-40 bg-blue-200 rounded-full opacity-30 -z-10"
//       variants={floatVariants}
//       animate="animate" />
//       <motion.div className="absolute top-1/3 right-0 w-32 h-32 bg-blue-300 rounded-full opacity-20 -z-10"
//       variants={floatVariants}
//       animate="animate" />
//       <motion.div className="absolute bottom-0 left-1/4 w-48 h-48 bg-blue-100 rounded-full opacity-25 -z-10"
//       variants={floatVariants}
//       animate="animate" />


//       <motion.h1 
//       variants={headerVariants}
//       className="text-2xl font-bold mb-4">Available Jobs</motion.h1>

//       {/* Search */}
//       <motion.div 
//       className="mb-6"
//       variants={searchVariants}>
//       <input
//         type="text"
//         placeholder="Search by title or location..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full max-w-xl mx-auto block px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       </motion.div>

//       {loading ? (
//         <p>Loading jobs...</p>
//       ) : filteredJobs.length === 0 ? (
//         <p>No jobs found.</p>
//       ) : (
//         <motion.div 
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredJobs.map((job) => {

//             console.log(job);
//             return(
//             <motion.div 
//             key={job._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//             variants={cardVariants}>
//               <h2 className="text-lg font-bold mb-2">{job.title}</h2>
//               <p className="text-gray-600 mb-1">{job.company}</p>
//               <p className="text-gray-600 mb-1">{job.location}</p>
//               <p className="text-gray-600 mb-3">{job.salary}</p>
//               {/* view button */}
//               <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate(`/jobs/${job._id}`)}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mb-2"
//               >
//                 View Details
//               </motion.button>

//               {/* Apply button */}
//               <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//                 onClick={() => applyJob(job._id || job.id)}                
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
//               >
//                 Apply
//               </motion.button>
//             </motion.div>
//           );
//         })}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }


import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api";

export default function Jobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  //fetch applied jobs
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applyingId, setApplyingId] = useState(null);

  const fetchAppliedJobs = async () => {
  if (!token) return;

  try {
    const res = await fetch(`${API_URL}/my-applications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    const ids = data.map(app => app.job._id);
    setAppliedJobs(ids);
  } catch {
    console.log("Failed to load applied jobs");
  }
};



  const token = localStorage.getItem("token");

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`);
      const data = await res.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchJobs();
  // }, []);

  useEffect(() => {
  fetchJobs();
  fetchAppliedJobs();
}, []);


  // Filter logic
  useEffect(() => {
    let result = jobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase())
    );

    if (location) {
      result = result.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredJobs(result);
  }, [search, location, jobs]);

  // const applyJob = async (jobId) => {
  //   if (!token) {
  //     toast.info("Login to apply");
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     const res = await fetch(`${API_URL}/apply`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`
  //       },
  //       body: JSON.stringify({ jobId })
  //     });

  //     const data = await res.json();

  //     if (res.ok) toast.success("Applied successfully!");
  //     else toast.warning(data.message || "Already applied");

  //   } catch {
  //     toast.error("Apply failed");
  //   }
  // };


  const applyJob = async (jobId) => {
  if (!token) {
    toast.info("Login to apply");
    navigate("/login");
    return;
  }

  setApplyingId(jobId);

  try {
    const res = await fetch(`${API_URL}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ jobId })
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Applied successfully!");
      setAppliedJobs(prev => [...prev, jobId]);
    } else {
      toast.warning(data.message);
    }

  } catch {
    toast.error("Apply failed");
  } finally {
    setApplyingId(null);
  }
};

  return (
    <div className="px-8 py-8 min-h-screen bg-gray-50">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-blue-700"
      >
        Browse Jobs
      </motion.h1>

      {/* FILTER BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-4 mb-10"
      >
        <input
          placeholder="Search job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />

        <input
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />

        <button
          onClick={() => {
            setSearch("");
            setLocation("");
          }}
          className="bg-gray-200 px-6 rounded-lg hover:bg-gray-300"
        >
          Clear
        </button>
      </motion.div>

        {/* add filter UI on browse jobs page */}
      {/* <div className="filter-box">
        <input
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <select onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        <input
          type="number"
          placeholder="Min Salary"
          onChange={(e) => setMinSalary(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Salary"
          onChange={(e) => setMaxSalary(e.target.value)}
        />
      </div> */}


      {/* JOB LIST */}
      {loading ? (
        <p className="text-lg">Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >

          {filteredJobs.map(job => (
            <motion.div
              key={job._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-lg p-6 transition"
            >

              <h2 className="text-xl font-bold text-blue-700 mb-1">
                {job.title}
              </h2>

              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>

              <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {job.salary}
              </span>

              <div className="mt-4 flex gap-3">

                <button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View
                </button>

                {/* <button
                  onClick={() => applyJob(job._id)}
                  className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
                >
                  Apply
                </button> */}

                <button
                disabled={appliedJobs.includes(job._id) || applyingId === job._id}
                onClick={() => applyJob(job._id)}
                className={`flex-1 py-2 rounded-lg transition
                  ${appliedJobs.includes(job._id)
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-50"}
                `}
              >
                {appliedJobs.includes(job._id)
                  ? "✅ Applied"
                  : applyingId === job._id
                  ? "Applying..."
                  : "Apply"}
              </button>


              </div>
            </motion.div>
          ))}

        </motion.div>
      )}
    </div>
  );
}
