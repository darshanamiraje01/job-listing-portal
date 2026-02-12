// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const employerOnly = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user || user.role !== "employer") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     req.user = user;
//     next();
//   } catch {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

export const employerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "employer") {
    return res.status(403).json({ message: "Employers only" });
  }
  next();
};

