import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 mt-12"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Info */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">Job Portal</h2>
          <p className="text-gray-300 max-w-md">
            Your one-stop solution for finding the best job opportunities
            and connecting with top companies. Search, apply, and grow your career.
          </p>
        </div>

        {/* Social / Copyright */}
        <div className="text-center md:text-right">
          <p className="mb-2">&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
          <p className="text-gray-400">
            Follow us: 
            <span className="ml-2">@JobPortal</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
