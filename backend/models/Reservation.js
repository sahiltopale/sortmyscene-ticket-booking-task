import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Event",

      required: true,
    },

    seatNumbers: [String],

    expiresAt: {
      type: Date,

      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Reservation", reservationSchema);
