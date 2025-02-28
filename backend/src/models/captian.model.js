import mongoose from "mongoose";
import bycypt from "bcrypt";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const captianSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First Name must be at least 3 characters"],
    },
    lastName: {
      type: String,
      minLength: [3, "Last Name must be at least 3 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) =>
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
      validate: {
        validator: (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          ),
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
    socketId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "active",
      required: true,
      enum: ["active", "inactive"],
    },
    vehicle: {
      color: {
        type: String,
        required: true,
      },
      plate: {
        type: String,
        required: true,
        unique: true,
      },
      capicity: {
        type: Number,
        required: true,
        minLength: [1, "capicity of vehicle is equal to atleast 1"],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "motorbike", "auto"],
      },
    },
    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    rideHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ride",
        unique: true,
      },
    ]
  },
  { timestamps: true }
);

captianSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bycypt.hash(this.password, 10);
  next();
});

captianSchema.methods.comparePassword = async function (password) {
  return await bycypt.compare(password, this.password);
};

captianSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

captianSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const Captian = mongoose.model("Captian", captianSchema);

export { Captian };
