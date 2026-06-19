import Reservation from "../models/Reservation.js";
import Seat from "../models/Seat.js";

export const reserveSeats = async (req, res) => {
  try {
    const { eventId, seatNumbers } = req.body;

    const result = await Seat.updateMany(
      {
        eventId,

        seatNumber: {
          $in: seatNumbers,
        },

        status: "available",
      },

      {
        $set: {
          status: "reserved",
        },
      },
    );

    if (result.modifiedCount !== seatNumbers.length) {
      return res.status(400).json({
        message: "Some seats unavailable",
      });
    }

    const reservation = await Reservation.create({
      userId: req.user.id,

      eventId,

      seatNumbers,

      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    res.json({
      message: "Reserved",

      reservation,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const { reservationId } = req.body;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    if (new Date() > reservation.expiresAt) {
      await Seat.updateMany(
        {
          eventId: reservation.eventId,

          seatNumber: {
            $in: reservation.seatNumbers,
          },
        },

        {
          status: "available",
        },
      );

      await Reservation.findByIdAndDelete(reservationId);

      return res.status(400).json({
        message: "Reservation expired",
      });
    }

    await Seat.updateMany(
      {
        eventId: reservation.eventId,

        seatNumber: {
          $in: reservation.seatNumbers,
        },
      },

      {
        status: "booked",
      },
    );

    await Reservation.findByIdAndDelete(reservationId);

    res.json({
      message: "Booking Confirmed",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
