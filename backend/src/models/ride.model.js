import mongoose from "mongoose";

const Schema = mongoose.Schema;

const rideSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    captian: {
      type: Schema.Types.ObjectId,
      ref: "Captian",
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
      default: "pending",
    },
    duration: {
      type: Number,
      default: 0,
    },
    distance: {
      type: Number,
      default: 0,
    },
    paymentId: {
      type: String,
      default: null,
    },
    orderId: {
      type: String,
      default: null,
    },
    signature: {
      type: String,
      default: null,
    },
    otp: {
      type: String,
      default: null,
      required: true,
      select: false,
    },
    rating: {
      type: Number,
      default: 4,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

export const Ride = mongoose.model("Ride", rideSchema);
