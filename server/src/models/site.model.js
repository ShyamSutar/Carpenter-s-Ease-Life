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
    hardware: [
      {
        hardware: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        total: {
          type: String,
          default: 0,
        },
        hardwareDetails: [
          {
            itemName: {
              type: String,
            },
            brand: {
              type: String,
            },
            size: {
              type: String, // Example: "10mm", "5 inch", "M8 Bolt"
            },
            quantity: {
              type: Number,
            },
            unit: {
              type: String, // Example: "pieces", "kg", "meter"
            },
            ratePerUnit: {
              type: Number,
            },
          },
        ],
      },
    ],
    client: [
      {
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Site = mongoose.model("Site", siteSchema);

export default Site;
