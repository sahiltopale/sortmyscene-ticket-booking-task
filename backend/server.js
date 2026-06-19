import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api", bookingRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
});
