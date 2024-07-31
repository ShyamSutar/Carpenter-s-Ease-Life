import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    mistry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    carpenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // present: {
    //   type: String,
    //   required: true
    // }
  },
  { timestamps: true }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;