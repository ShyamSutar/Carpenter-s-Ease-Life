import mongoose from "mongoose";

const paySchema = new mongoose.Schema(
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
        type: number,
        default: 0
    },
    pay: {
        type: number,
        default: 600
    }
  },
  { timestamps: true }
);

const Pay = mongoose.model('Pay', paySchema);

export default Pay;