export const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : "http://localhost:5000/api";

// Keep this alias in case any file uses API_URL
export const API_URL = API_BASE_URL;

export const JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Remote", "Internship"];

export const STATUS_LABELS = {
  applied: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
};

export const STATUS_STYLES = {
  applied: "text-yellow-700 bg-yellow-100 border border-yellow-200",
  accepted: "text-green-700 bg-green-100 border border-green-200",
  rejected: "text-red-700 bg-red-100 border border-red-200",
};