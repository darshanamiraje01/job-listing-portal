// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function Profile() {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(true); // Added loading state
//   const token = localStorage.getItem("token");

//   //const [formData, setFormData] = useState(user || {});

//   const [formData, setFormData] = useState({
//   name: "",
//   email: "",
//   profile: {
//     bio: "",
//     skills: [],
//     location: "",
//     experience: "",
//     education: ""
//   }
// });


//   // useEffect(() => {
//   //   if (user) setFormData(user);
//   // }, [user]);

//   useEffect(() => {
//   if (user) {
//     setFormData({
//       ...user,
//       profile: user.profile || {
//         bio: "",
//         skills: [],
//         location: "",
//         experience: "",
//         education: ""
//       }
//     });
//   }
// }, [user]);


//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("TOKEN:", token);

//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     // Updated endpoint to match backend (/profile instead of /api/auth/profile)
//     axios.get("http://localhost:5000/api/auth/profile", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(res => {
//         setUser(res.data);
//         localStorage.setItem("user", JSON.stringify(res.data));
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Profile fetch failed", err);
//         setLoading(false);
//         // Optional: Redirect to login if 401
//         if (err.response?.status === 401) {
//           alert("Session expired. Please log in again.");
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           window.location.href = "/login"; // Adjust route as needed
//         }
//       });
//   }, []);

//   const saveProfile = async () => {
//     try {
//       // Updated endpoint
//       const res = await axios.put(
//         "http://localhost:5000/api/auth/profile",
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       //setUser(res.data);
//       setUser({
//         ...res.data,
//         profile: res.data.profile || {}
//       });

//       localStorage.setItem("user", JSON.stringify(res.data));
//       setEditMode(false);
//       alert("Profile updated");
//     } catch (err) {
//       console.error("Save failed", err);
//       alert("Failed to update profile");
//     }
//   };

//   // Get initials (fixed for first and last name)
//   const getInitials = (name = "") => {
//     const parts = name.split(" ");
//     if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
//     return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
//   };

//   // Profile completeness (assumes nested profile object)
//   const calculateProfileCompletion = () => {
//     const fields = isEmployer ? 
//     [user?.name, user?.profile?.bio, user?.profile?.location]
//     : [
//       user?.name,
//       user?.profile?.bio,
//       user?.profile?.skills?.length,
//       user?.profile?.location,
//       user?.profile?.experience,
//       user?.profile?.education
//     ];

//     const filled = fields.filter(Boolean).length;
//     return Math.round((filled / fields.length) * 100);
//   };

//   // Random avatar color (kept but not used; can remove if unnecessary)
//   const getRandomColor = () => {
//     const colors = [
//       "#2563EB", "#9333EA", "#16A34A",
//       "#DC2626", "#F97316", "#0D9488"
//     ];
//     return colors[Math.floor(Math.random() * colors.length)];
//   };

//   if (loading) return <p className="p-10">Loading...</p>;
//   if (!user) return <p className="p-10">No user data. Please log in.</p>;

//   const isEmployer = user.role === "employer";
//   const isJobSeeker = user.role === "jobseeker";

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
//         <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

//         {/* VIEW MODE */}
//         {!editMode && (
//           <div className="space-y-4">
//             {/* to display avatar image in cirle */}

//             <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mb-4">
//               {user.profile?.avatar && (
//                 <img
//                   src={`http://localhost:5000${user.profile.avatar}`}
//                   className="w-full h-full object-cover"
//                 />
//               )}
//             </div>

//             <p><strong>Name:</strong> {user.name}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             {isJobSeeker && (
//               <p><strong>Location:</strong> {user.profile?.location}</p>
//             )}

//             {isEmployer && (
//               <p><strong>Company Location:</strong> {user.profile?.location}</p>
//             )}


//             {isJobSeeker && (
//             <>
//               <p><strong>Bio:</strong> {user.profile?.bio}</p>

//               <p>
//                 <strong>Skills:</strong>{" "}
//                 {user.profile?.skills?.length
//                   ? user.profile.skills.join(", ")
//                   : "Not added"}
//               </p>

//               <p><strong>Experience:</strong> {user.profile?.experience || "Not added"}</p>
//               <p><strong>Education:</strong> {user.profile?.education || "Not added"}</p>

//               {/* RESUME DISPLAY */}
//               <p>
//                 <strong>Resume:</strong>{" "}
//                 {user.profile?.resume ? (
//                   <a
//                     href={`https://localhost:5000${formData.profile.resume}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View Resume
//                   </a>
//                 ) : (
//                   "Not uploaded"
//                 )}
//               </p>

//               {/* CONTACT INFO */}
//               <p><strong>Phone:</strong> {user.profile?.phone || "Not added"}</p>
//               <p>
//                 <strong>LinkedIn:</strong>{" "}
//                 {user.profile?.linkedin ? (
//                   <a
//                     href={user.profile.linkedin}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     Profile Link
//                   </a>
//                 ) : (
//                   "Not added"
//                 )}
//               </p>
//             </>
//           )}


//             {isEmployer && (
//               <p><strong>Company Description:</strong> {user.profile?.bio}</p>
//             )}

//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
//             >
//               Edit Profile
//             </button>
//           </div>
//         )}

//         {/* EDIT MODE */}
//         {editMode && (
//           <div className="space-y-6">
//             {/* HEADER */}
//             <div className="flex items-center gap-6">
//               <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
//                 {getInitials(user.name)}
//               </div>

//               {/* Profile completeness */}
//               <div className="mt-4">
//                 <p className="text-sm text-gray-600 mb-1">
//                   Profile completeness: {calculateProfileCompletion()}%
//                 </p>
//                 <div className="w-full bg-gray-200 h-2 rounded">
//                   <div
//                     className="bg-blue-600 h-2 rounded"
//                     style={{ width: `${calculateProfileCompletion()}%` }} 
//                   ></div>
//                 </div>
//               </div>
//             </div>

//             {/* Profile photo upload */}
//             <input
//               type="file"
//               onChange={async (e) => {
//                 const formDataUpload = new FormData();
//                 formDataUpload.append("avatar", e.target.files[0]);
//                 try {
//                   const res = await axios.put(
//                     "http://localhost:5000/api/auth/profile/photo", // Updated endpoint
//                     formDataUpload,
//                     { headers: { Authorization: `Bearer ${token}` } }
//                   );
//                   setUser(res.data);
//                   localStorage.setItem("user", JSON.stringify(res.data));
//                   window.dispatchEvent(new Event("userUpdated"));
//                 } catch (err) {
//                   console.error("Photo upload failed", err);
//                   alert("Failed to upload photo");
//                 }
//               }}
//             />

//             <div>
//               <h2 className="text-2xl font-semibold">{user.name}</h2>
//               <p className="text-gray-500">{user.email}</p>
//             </div>

//             {isJobSeeker && (
//               <>
//                 {/* BIO */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="font-semibold mb-1">About</h3>
//                   <textarea
//                     name="bio"
//                     value={formData.profile?.bio || ""}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         profile: { ...formData.profile, bio: e.target.value }
//                       })
//                     }
//                     className="w-full border p-2 rounded"
//                     placeholder="Tell us about yourself"
//                   />
//                 </div>

//                 {/* SKILLS */}
//                 <div>
//                   <h3 className="font-semibold mb-2">Skills</h3>
//                   <input
//                     type="text"
//                     value={formData.profile?.skills?.join(", ") || ""}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         profile: {
//                           ...formData.profile,
//                           skills: e.target.value.split(",").map(s => s.trim())
//                         }
//                       })
//                     }
//                     placeholder="e.g. React, Node, MongoDB"
//                     className="w-full border p-2 rounded"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Separate skills using commas
//                   </p>
//                 </div>

//                 {/* EXPERIENCE & EDUCATION */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-semibold">Experience</h4>
//                     <input
//                       name="experience"
//                       value={formData.profile?.experience || ""}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           profile: { ...formData.profile, experience: e.target.value }
//                         })
//                       }
//                       className="w-full border p-2 rounded"
//                       placeholder="e.g. 5 years in software development"
//                     />
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-semibold">Education</h4>
//                     <input
//                       name="education"
//                       value={formData.profile?.education || ""}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           profile: { ...formData.profile, education: e.target.value }
//                         })
//                       }
//                       className="w-full border p-2 rounded"
//                       placeholder="e.g. Bachelor's in Computer Science"
//                     />
//                   </div>
//                 </div>

//                 {/* RESUME UPLOAD */}
//                 <div className="bg-gray-50 p-4 rounded-lg mt-4">
//                   <h3 className="font-semibold mb-2">Resume</h3>
//                   <input
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     onChange={async (e) => {
//                       const file = e.target.files[0];
//                       if (!file) return;

//                       const formDataUpload = new FormData();
//                       formDataUpload.append("resume", file);

//                       try {
//                         const res = await axios.put(
//                           "http://localhost:5000/api/resume", // your backend endpoint
//                           formDataUpload,
//                           {
//                             headers: {
//                               Authorization: `Bearer ${token}`,
//                               "Content-Type": "multipart/form-data",
//                             },
//                           }
//                         );

//                         // Save resume URL to local state
//                         setFormData(prev => ({
//                           ...prev,
//                           profile: { ...prev.profile, resume: res.data.resumeUrl }
//                         }));

//                         setUser(prev => ({
//                           ...prev,
//                           profile: { ...prev.profile, resume: res.data.resumeUrl }
//                         }));
//                         localStorage.setItem("user", JSON.stringify({
//                           ...user,
//                           profile: { ...user.profile, resume: res.data.resumeUrl }
//                         }));

//                         toast.success("Resume uploaded successfully!");
//                       } catch (err) {
//                         console.error(err);
//                         toast.error("Resume upload failed");
//                       }
//                     }}
//                     className="w-full border p-2 rounded"
//                   />
//                   {formData.profile?.resume && (
//                     <p className="mt-1 text-sm text-gray-600">
//                       Uploaded: <a href={formData.profile.resume} target="_blank" className="text-blue-600 underline">View Resume</a>
//                     </p>
//                   )}
//                 </div>

//                 {/* CONTACT INFORMATION */}
//               <div className="bg-gray-50 p-4 rounded-lg mt-4">
//                 <h3 className="font-semibold mb-2">Contact Information</h3>
//                 <input
//                   type="text"
//                   placeholder="Phone Number"
//                   value={formData.profile?.phone || ""}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       profile: { ...formData.profile, phone: e.target.value }
//                     })
//                   }
//                   className="w-full border p-2 rounded mb-2"
//                 />
//                 <input
//                   type="text"
//                   placeholder="LinkedIn Profile URL"
//                   value={formData.profile?.linkedin || ""}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       profile: { ...formData.profile, 
//                         linkedin: e.target.value }
//                     })
//                   }
//                   className="w-full border p-2 rounded"
//                 />
//               </div>


//             </>
//             )}

//             {isEmployer && (
//               <>
//                 <input
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full border p-2 rounded"
//                   placeholder="Company Name"
//                 />

//                 <input
//                   value={formData.profile?.location || ""}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       profile: { ...formData.profile, location: e.target.value }
//                     })
//                   }
//                   className="w-full border p-2 rounded"
//                   placeholder="Company Location"
//                 />

//                 <textarea
//                   value={formData.profile?.bio || ""}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       profile: { ...formData.profile, bio: e.target.value }
//                     })
//                   }
//                   className="w-full border p-2 rounded"
//                   placeholder="About your company"
//                 />
//               </>
//             )}

//             <div className="flex gap-4">
//               <button
//                 onClick={saveProfile}
//                 className="bg-green-600 text-white px-6 py-2 rounded"
//               >
//                 Save Changes
//               </button>
//               <button
//                 onClick={() => {
//                   setEditMode(false);
//                   setFormData(user);
//                 }}
//                 className="bg-gray-400 text-white px-6 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaLinkedin, FaPhone, FaFileAlt } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile: {
      bio: "",
      skills: [],
      location: "",
      experience: "",
      education: ""
    }
  });

  const isEmployer = user?.role === "employer";
  const isJobSeeker = user?.role === "jobseeker";

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        profile: user.profile || {
          bio: "",
          skills: [],
          location: "",
          experience: "",
          education: ""
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    axios.get("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setLoading(false);
      })
      .catch(err => {
        console.error("Profile fetch failed", err);
        setLoading(false);
        if (err.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      });
  }, []);

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser({ ...res.data, profile: res.data.profile || {} });
      localStorage.setItem("user", JSON.stringify(res.data));
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
    const fields = isEmployer ? 
      [user?.name, user?.profile?.bio, user?.profile?.location] :
      [user?.name, user?.profile?.bio, user?.profile?.skills?.length, user?.profile?.location, user?.profile?.experience, user?.profile?.education];

    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  if (loading) return <p className="p-10">Loading...</p>;
  if (!user) return <p className="p-10">No user data. Please log in.</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl space-y-6">

        <h1 className="text-3xl font-bold text-center text-gray-800">My Profile</h1>

        {/* AVATAR & COMPLETENESS */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold overflow-hidden"
          >
            {user.profile?.avatar ? (
              <img src={`http://localhost:5000${user.profile.avatar}`} className="w-full h-full object-cover"/>
            ) : getInitials(user.name)}
          </motion.div>

          <div className="flex-1 w-full">
            <p className="text-sm text-gray-500 mb-1">Profile completeness: {calculateProfileCompletion()}%</p>
            <motion.div
              className="w-full bg-gray-200 h-2 rounded"
              initial={{ width: 0 }}
              animate={{ width: `${calculateProfileCompletion()}%` }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-blue-600 h-2 rounded"></div>
            </motion.div>
          </div>
        </div>

        {/* VIEW MODE */}
        {!editMode && (
          <div className="space-y-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.profile?.location && <p><strong>{isEmployer ? "Company Location" : "Location"}:</strong> {user.profile.location}</p>}
            {isJobSeeker && (
              <>
                <p><strong>Bio:</strong> {user.profile?.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {user.profile?.skills?.length ? user.profile.skills.map((skill, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{skill}</span>
                  )) : <span className="text-gray-500 text-sm">No skills added</span>}
                </div>
                {user.profile?.experience && <p><strong>Experience:</strong> {user.profile.experience}</p>}
                {user.profile?.education && <p><strong>Education:</strong> {user.profile.education}</p>}
                {user.profile?.resume && (
                  <p className="flex items-center gap-1"><FaFileAlt className="text-gray-600"/> 
                    <a href={user.profile.resume} target="_blank" rel="noreferrer" className="text-blue-600 underline">View Resume</a>
                  </p>
                )}
                <p className="flex items-center gap-1"><FaPhone className="text-gray-600"/> {user.profile?.phone || "Not added"}</p>
                <p className="flex items-center gap-1"><FaLinkedin className="text-blue-700"/> 
                  {user.profile?.linkedin ? <a href={user.profile.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline">Profile Link</a> : "Not added"}
                </p>
              </>
            )}
            {isEmployer && <p><strong>Company Description:</strong> {user.profile?.bio}</p>}

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
            >
              Edit Profile
            </motion.button>
          </div>
        )}

        {/* EDIT MODE */}
        {editMode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded" placeholder="Name / Company"/>
              <input type="text" value={formData.profile?.location || ""} onChange={e => setFormData({...formData, profile: {...formData.profile, location: e.target.value}})} className="w-full border p-2 rounded" placeholder={isEmployer ? "Company Location" : "Location"}/>
            </div>
            <textarea value={formData.profile?.bio || ""} onChange={e => setFormData({...formData, profile: {...formData.profile, bio: e.target.value}})}
            rows={6} className="w-full border p-2 rounded" placeholder={isEmployer ? "About your company" : "Bio"} />

            {isJobSeeker && (
              <>
                <input type="text" value={formData.profile?.skills?.join(", ") || ""} onChange={e => setFormData({...formData, profile:{...formData.profile, skills:e.target.value.split(",").map(s=>s.trim())}})} placeholder="Skills (comma separated)" className="w-full border p-2 rounded"/>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={formData.profile?.experience || ""} onChange={e => setFormData({...formData, profile:{...formData.profile, experience:e.target.value}})} className="w-full border p-2 rounded" placeholder="Experience"/>
                  <input type="text" value={formData.profile?.education || ""} onChange={e => setFormData({...formData, profile:{...formData.profile, education:e.target.value}})} className="w-full border p-2 rounded" placeholder="Education"/>
                </div>

                {isJobSeeker && (
  <>
    {/* Skills */}
    <input
      type="text"
      value={formData.profile?.skills?.join(", ") || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: {
            ...formData.profile,
            skills: e.target.value.split(",").map((s) => s.trim()),
          },
        })
      }
      placeholder="Skills (comma separated)"
      className="w-full border p-2 rounded"
    />

    {/* Experience & Education */}
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        value={formData.profile?.experience || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            profile: { ...formData.profile, experience: e.target.value },
          })
        }
        className="w-full border p-2 rounded"
        placeholder="Experience"
      />
      <input
        type="text"
        value={formData.profile?.education || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            profile: { ...formData.profile, education: e.target.value },
          })
        }
        className="w-full border p-2 rounded"
        placeholder="Education"
      />
    </div>

    {/* Resume Upload */}
      <div className="bg-gray-50 p-4 rounded-lg mt-4">
        <h3 className="font-semibold mb-2">Resume</h3>
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
                "http://localhost:5000/api/resume", // backend endpoint
                formDataUpload,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              setFormData((prev) => ({
                ...prev,
                profile: { ...prev.profile, resume: res.data.resumeUrl },
              }));

              setUser((prev) => ({
                ...prev,
                profile: { ...prev.profile, resume: res.data.resumeUrl },
              }));
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...user,
                  profile: { ...user.profile, resume: res.data.resumeUrl },
                })
              );

              toast.success("Resume uploaded successfully!");
            } catch (err) {
              console.error(err);
              toast.error("Resume upload failed");
            }
          }}
          className="w-full border p-2 rounded"
        />
        {formData.profile?.resume && (
          <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
            <FaFileAlt className="text-gray-600" />
            Uploaded:{" "}
            <a
              href={formData.profile.resume}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
          </p>
        )}
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 p-4 rounded-lg mt-4 space-y-2">
        <h3 className="font-semibold mb-2">Contact Information</h3>
        <div className="flex items-center gap-2">
          <FaPhone className="text-gray-600" />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.profile?.phone || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                profile: { ...formData.profile, phone: e.target.value },
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <FaLinkedin className="text-blue-700" />
          <input
            type="text"
            placeholder="LinkedIn Profile URL"
            value={formData.profile?.linkedin || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                profile: { ...formData.profile, linkedin: e.target.value },
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
    </>
  )}

              </>
            )}

            <div className="flex gap-4">
              <motion.button whileHover={{ scale: 1.05 }} onClick={saveProfile} className="bg-green-600 text-white px-6 py-2 rounded">Save</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => { setEditMode(false); setFormData(user); }} className="bg-gray-400 text-white px-6 py-2 rounded">Cancel</motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
