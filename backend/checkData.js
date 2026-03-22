import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)  // remove options
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.once("open", async () => {
  console.log("Checking existing collections...");

  const collections = await db.db.listCollections().toArray();
  console.log("Collections in DB:", collections.map(c => c.name));

  try {
    const users = await db.db.collection("users").find({}).toArray();
    console.log("Users in DB:", users);

    const jobs = await db.db.collection("jobs").find({}).toArray();
    console.log("Jobs in DB:", jobs);
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    mongoose.connection.close();
  }
});
