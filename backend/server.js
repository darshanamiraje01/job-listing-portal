import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

const app = express();
//app.use("/uploads", express.static(path.join(process.cwd(), "backend/uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api/auth", authRoutes);

app.use("/api", jobRoutes);

app.use("/api", resumeRoutes);


app.use("/api", applicationRoutes);

//app.use("/api", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
