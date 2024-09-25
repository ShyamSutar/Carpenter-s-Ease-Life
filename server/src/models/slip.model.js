import mongoose from "mongoose";

const slipSchema = new mongoose.Schema(
  {
    mistry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    carpenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    totalAdvance: {
        type: Number,
        default: 0
    },
    totalAttendance: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Slip = mongoose.model('Slip', slipSchema);

export default Slip;