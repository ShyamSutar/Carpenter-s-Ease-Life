import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
    },
    site: {
      type: String
    },
    mistry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    carpenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    plywood: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hardware: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;