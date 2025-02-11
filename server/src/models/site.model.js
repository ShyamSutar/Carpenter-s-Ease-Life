import mongoose from "mongoose";

const siteSchema = new mongoose.Schema(
  {
    mistry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    siteName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    plywood: [
      {
        plywood: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        total: {
          type: String,
          default: 0,
        },
        plywoodDetails: [
          {
            plywoodType: {
              type: String,
            },
            brand: {
              type: String,
            },
            thickness: {
              type: Number,
            },
            size: {
              type: String,
            },
            quantity: {
              type: Number,
            },
            ratePerSheet: {
              type: Number,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Site = mongoose.model("Site", siteSchema);

export default Site;
