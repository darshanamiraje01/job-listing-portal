// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";

// export default function Home() {

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-white">

//       {/* HERO SECTION */}
//       <section className="text-center pt-28 pb-20 px-6">

//         <motion.h1
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4"
//         >
//           Find Your Dream Job Today
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg"
//         >
//           Connecting talented professionals with top companies.  
//           Search jobs, apply easily, and grow your career faster.
//         </motion.p>

//         {/* SEARCH BAR */}
//         <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.5 }}
//         className="flex items-center justify-between max-w-3xl mx-auto bg-white p-5 rounded-2xl shadow-lg"
//       >
//         <span className="text-gray-600 text-lg font-medium">
//           Search your dream jobs...
//         </span>

//         <Link
//           to="/jobs"
//           className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
//         >
//           Browse Jobs →
//         </Link>
//       </motion.div>
//       </section>

//       {/* STATS */}
//       <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mb-20">

//         {[
//           { title: "Active Jobs", value: "1,200+" },
//           { title: "Companies", value: "350+" },
//           { title: "Job Seekers", value: "10,000+" },
//         ].map((item, i) => (
//           <motion.div
//             key={i}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white rounded-2xl shadow-lg p-8 text-center"
//           >
//             <h2 className="text-3xl font-bold text-blue-600">{item.value}</h2>
//             <p className="text-gray-600 mt-2">{item.title}</p>
//           </motion.div>
//         ))}
//       </section>

//       {/* POPULAR CATEGORIES */}
//       <section className="max-w-6xl mx-auto px-6 pb-24">

//         <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
//           Popular Job Categories
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

//           {[
//             "Senior Software Engineer",
//             "UI/UX Designer",
//             "Data Scientist",
//             "Marketing Specialist",
//             "DevOps Engineer",
//             "Product Manager"
//           ].map((job, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ y: -6 }}
//               className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition"
//             >
//               <h3 className="font-semibold text-lg text-blue-700">{job}</h3>
//               <p className="text-gray-500 mt-2">Explore opportunities</p>
//             </motion.div>
//           ))}

//         </div>
//       </section>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { FaBriefcase, FaBuilding, FaUsers } from "react-icons/fa"; // icons for stats

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">

      {/* HERO SECTION */}
      <section className="relative text-center pt-28 pb-20 px-6 overflow-hidden">

        {/* Floating shapes / mockups */}
        <motion.div
          initial={{ x: -100, y: 50, opacity: 0.3 }}
          animate={{ x: 0, y: 0, opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-10 left-10 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply"
        />
        <motion.div
          initial={{ x: 100, y: -50, opacity: 0.3 }}
          animate={{ x: 0, y: 0, opacity: 0.3 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply"
        />

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 relative z-10"
        >
          Find Your Dream Job Today
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg relative z-10"
        >
          Connecting talented professionals with top companies.  
          Search jobs, apply easily, and grow your career faster.
        </motion.p>

        {/* SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between max-w-3xl mx-auto bg-white p-5 rounded-2xl shadow-lg relative z-10"
        >
          <span className="text-gray-600 text-lg font-medium">
            Search your dream jobs...
          </span>

          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            Browse Jobs →
          </Link>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mb-20">

        {[
          { title: "Active Jobs", value: "1,200+", icon: <FaBriefcase size={32} className="text-blue-500" /> },
          { title: "Companies", value: "350+", icon: <FaBuilding size={32} className="text-blue-500" /> },
          { title: "Job Seekers", value: "10,000+", icon: <FaUsers size={32} className="text-blue-500" /> },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col items-center gap-4"
          >
            {item.icon}
            <h2 className="text-3xl font-bold text-blue-600">{item.value}</h2>
            <p className="text-gray-600 mt-2">{item.title}</p>
          </motion.div>
        ))}
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Popular Job Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[
            "Senior Software Engineer",
            "UI/UX Designer",
            "Data Scientist",
            "Marketing Specialist",
            "DevOps Engineer",
            "Product Manager"
          ].map((job, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition relative"
            >
              {/* Small mockup icon inside card */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">{i+1}</span>
              </div>
              <h3 className="font-semibold text-lg text-blue-700">{job}</h3>
              <p className="text-gray-500 mt-2">Explore opportunities</p>
            </motion.div>
          ))}

        </div>
      </section>
    </div>
  );
}

