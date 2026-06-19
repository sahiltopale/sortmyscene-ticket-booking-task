import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  reserveSeats,
  confirmBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/reserve", protect, reserveSeats);

router.post("/bookings", protect, confirmBooking);

export default router;
