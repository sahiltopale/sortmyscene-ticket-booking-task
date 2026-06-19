import Event from "../models/Event.js";
import Seat from "../models/Seat.js";

// CREATE EVENT

export const createEvent = async (req, res) => {
  try {
    const { name, dateTime, venue, totalSeats } = req.body;

    const event = await Event.create({
      name,

      dateTime,

      venue,

      totalSeats,
    });

    const seats = [];

    for (let i = 1; i <= totalSeats; i++) {
      seats.push({
        eventId: event._id,

        seatNumber: `A${i}`,

        status: "available",
      });
    }

    await Seat.insertMany(seats);

    res.status(201).json({
      message: "Event Created",

      event,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// GET EVENTS

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.json(events);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// GET EVENT DETAILS

export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    const seats = await Seat.find({
      eventId: req.params.id,
    });

    res.json({
      event,

      seats,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
