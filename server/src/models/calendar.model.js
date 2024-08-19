import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true
    },

    start: {
      type: Date
    },

    end: {
        type: Date
    },
    title: {
        type: String
    },
    mistry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    carpenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

const Calendar = mongoose.model('Calendar', calendarSchema);

export default Calendar;