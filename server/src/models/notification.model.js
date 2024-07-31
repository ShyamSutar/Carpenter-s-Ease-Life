import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    mistry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    carpenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;