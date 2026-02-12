import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

//import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Jobs from "./pages/Jobs";

import EmployerDashboard from "./pages/EmployerDashboard";
import MyJobs from "./pages/MyJobs";
import ViewJob from "./pages/ViewJob";
import EditJob from "./pages/EditJobs";

import AppliedJobs from "./pages/AppliedJobs";
import JobApplicants from "./pages/JobApplicants";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/*Home / Landing page */}
        <Route path="/" element={<Home />} />

        {/* Jobs */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route path="/post-job" element={
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute> }
           />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
          } />

          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/my-jobs" element={<MyJobs />} />       
          <Route path="/edit-job/:id" element={<EditJob />} /> 
          <Route path="/view-job/:id" element={<ViewJob />} />
          <Route path="/applied-jobs" element={
            <ProtectedRoute>
            <AppliedJobs />
            </ProtectedRoute>
          } />
          {/* <Route path="/job-applicants/:jobId" element={<JobApplicants />}/> */}
          <Route path="/job/:jobId/applicants" element={<JobApplicants />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000}/>
      <Footer />
    </>
  );
}

export default App;
