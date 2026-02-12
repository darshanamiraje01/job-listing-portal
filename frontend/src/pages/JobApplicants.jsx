// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const API = "http://localhost:5000/api";

// export default function JobApplicants() {
//   const { jobId } = useParams();
//   const [apps, setApps] = useState([]);
//   const token = localStorage.getItem("token");

//   const updateStatus = async (id, status) => {
//   try {
//     const res = await fetch(
//       `${API}/applications/${id}/status`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ status }),
//       }
//     );

//     if (!res.ok) throw new Error();

//     const updated = await res.json();

//     setApps(apps =>
//       apps.map(app =>
//         app._id === updated._id ? updated : app
//       )
//     );
//   } catch (err) {
//     console.error(err);
//     alert("Failed to update status");
//   }
// };


//   useEffect(() => {
//     axios.get(`${API}/job/${jobId}/applications`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(res => setApps(res.data))
//     .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Applicants</h1>

//       {apps.length === 0 ? (
//         <p>No one applied yet.</p>
//       ) : (
//         apps.map(app => (
//           <div key={app._id} className="bg-white p-4 rounded shadow mb-4">
//             <h2 className="font-semibold">{app.user.name}</h2>
//             <p>{app.user.email}</p>

//             <p>Phone: {app.contact?.phone || "N/A"}</p>
//             <p>LinkedIn: {app.contact?.linkedin || "N/A"}</p>

//             {app.resume && (
//               <a
//                 href={app.resume}
//                 target="_blank"
//                 className="text-blue-600 underline"
//               >
//                 Download Resume
//               </a>
//             )}

//             <p className="mt-2 font-semibold">
//             Status: {app.status}
//             </p>

//             <div className="mt-3 flex gap-3 items-center">

//               {app.status === "applied" && (
//                 <>
//                   <button
//                     onClick={() => updateStatus(app._id, "accepted")}
//                     className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
//                   >
//                     Accept
//                   </button>

//                   <button
//                     onClick={() => updateStatus(app._id, "rejected")}
//                     className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
//                   >
//                     Reject
//                   </button>
//                 </>
//               )}

//               {app.status === "accepted" && (
//                 <span className="text-green-700 font-semibold">
//                   ✅ Accepted
//                 </span>
//               )}

//               {app.status === "rejected" && (
//                 <span className="text-red-700 font-semibold">
//                   ❌ Rejected
//                 </span>
//               )}

//             </div>


//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API = "http://localhost:5000/api";

export default function JobApplicants() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const token = localStorage.getItem("token");

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API}/applications/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const updated = await res.json();

      setApps(apps =>
        apps.map(app => app._id === updated._id ? updated : app)
      );
    } catch {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    axios.get(`${API}/job/${jobId}/applications`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setApps(res.data));
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Applicants</h1>

        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 font-medium hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>

      {apps.length === 0 ? (
        <p className="text-gray-600">No applicants yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {apps.map(app => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-2xl shadow-lg relative"
              >
                <h2 className="text-lg font-semibold">
                  {app.user.name}
                </h2>

                <p className="text-gray-600 text-sm">{app.user.email}</p>

                <div className="text-sm text-gray-500 mt-2 space-y-1">
                  <p>📞 {app.contact?.phone || "N/A"}</p>
                  <p>🔗 {app.contact?.linkedin || "N/A"}</p>
                </div>

                {app.resume && (
                  <a
                    href={app.resume}
                    target="_blank"
                    className="inline-block mt-3 text-blue-600 text-sm hover:underline"
                  >
                    📄 Download Resume
                  </a>
                )}

                <div className="mt-4 flex items-center justify-between">

                  <span className={`font-medium ${
                    app.status === "accepted" ? "text-green-600" :
                    app.status === "rejected" ? "text-red-600" :
                    "text-gray-600"
                  }`}>
                    {app.status.toUpperCase()}
                  </span>

                  {app.status === "applied" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(app._id, "accepted")}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => updateStatus(app._id, "rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
