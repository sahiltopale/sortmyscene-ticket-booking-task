import express from "express";

import {
  createEvent,
  getEvents,
  getEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);

router.get("/", getEvents);

router.get("/:id", getEvent);

export default router;
