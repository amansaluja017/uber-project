import { Captian } from "../models/captian.model.js";
import { createCaptian } from "../../Services/captian.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { validationResult } from "express-validator";
import { Token } from "../models/blacklistToken.model.js";
import { Ride } from "../models/ride.model.js";
import { uploadImage } from "../utils/cloudinary.js";
import fs from "fs";

export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const captian = await Captian.findById(userId);

    const accessToken = await captian.generateAccessToken();
    const refreshToken = await captian.generateRefreshToken();

    captian.refreshToken = refreshToken;
    await captian.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "failed to generate access and refresh token",
      error.message
    );
  }
};

export const registercaptian = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      400,
      errors.array().map((err) => err.message),
      "Invalid request"
    );
  }

  const { firstName, lastName, email, password, color, vehicleType, plate,
    capicity, location } =
    req.body;

  if (!firstName || !email || !password || !vehicleType || !plate || !color || !capicity) {
    throw new ApiError(400, "All fields are required");
  }

  const captianAvatarPath = req.files?.avatar[0].path;

  if (!captianAvatarPath) {
    fs.unlinkSync(captianAvatarPath);
    throw new ApiError(400, "Failed to upload avatar");
  }

  const avatar = await uploadImage(captianAvatarPath);

  const existedcaptian = await Captian.findOne({ email });

  if (existedcaptian) {
    fs.unlinkSync(captianAvatarPath);
    throw new ApiError(400, "Email already exists");
  }

  if (existedcaptian) {
    throw new ApiError(400, "Email already exists");
  }

  const captian = await createCaptian({
    firstName,
    lastName,
    email,
    password,
    color,
    vehicleType,
    capicity,
    plate,
    location,
    avatar
  });

  return res
    .status(201)
    .json(new ApiResponse(201, captian, "captian created successfully"));
});

export const logincaptian = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      400,
      errors.array().map((err) => err.message),
      "Invalid request"
    );
  }

  const { email, password } = req.body;

  if (!(email && password)) {
    throw new ApiError(400, "All fields are required");
  }

  const captian = await Captian.findOne({ email }).select("+password");

  if (!captian) {
    throw new ApiError(401, "Invalid credentials");
  }

  const comparePassword = await captian.comparePassword(password);

  if (!comparePassword) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    captian._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        { captian, accessToken, refreshToken },
        "login success"
      )
    );
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  console.log(status)

  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  const captian = await Captian.findByIdAndUpdate(
    req.captian._id,
    {
      $set: {
        status,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, captian.status, "Captain status updated successfully"));
});

export const captainProfile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, req.captian, "Captain profile fetched successfully")
    );
});

export const logoutCaptian = asyncHandler(async (req, res) => {
  const captian = await Captian.findByIdAndUpdate(
    req.captian._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  await Token.create({ token, captian: req.captian, expiration: Date.now() });

  return res
    .status(200)
    .json(new ApiResponse(200, captian, "logged out successfully"));
});

export const rideHistory = asyncHandler(async (req, res) => {
  const { rideId } = req.query;

  if (!rideId) {
    throw new ApiError(400, "Invalid ride id");
  }

  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new ApiError(404, "Ride not found");
  }

  const captianId = ride.captian?._id;

  const captian = await Captian.findById(captianId).populate("rideHistory");

  const rideHistory = captian?.rideHistory;

  if (!rideHistory.some(r => r._id.toString() === rideId)) {
    const captianRideHistory = await Captian.findByIdAndUpdate(
      captianId,
      { $push: { rideHistory: ride } },
      { new: true }
    ).populate("rideHistory");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          captianRideHistory?.rideHistory,
          "Ride history fetched successfully"
        )
      );
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          rideHistory,
          "Ride already exists in history"
        )
      );
  }
});

export const captianEarnings = asyncHandler(async (req, res) => {
  const captian = await Captian.findById(req.captian?._id)
    .populate("rideHistory");

  if (!captian) {
    throw new ApiError(404, "Captian not found");
  }

  const rides = captian.rideHistory || [];

  const rating = rides
    .map((ride) => {
      if (ride.status === "completed" && ride.fare !== undefined) {
        return ride.fare;
      }
    })
    .filter((fare) => fare !== undefined);

  const earnings = Math.floor(rating.reduce((acc, fare) => acc + fare, 0));

  const updateEarning = await Captian.findByIdAndUpdate(
    req.captian?._id,
    { earnings },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updateEarning?.earnings, "earning updated successfully"));
});

export const captianPoints = asyncHandler(async (req, res) => {
  const captian = await Captian.findById(req.captian?._id)
    .populate("rideHistory")
    .select("+rating");

  if (!captian) {
    throw new ApiError(404, "Captian not found");
  }

  const rides = captian.rideHistory || [];

  const rating = rides
  .map((ride) => {
    if (ride.status === "completed" && ride.rating !== undefined) {
      return ride.rating;
    }
  })
  .filter((rating) => rating !== undefined);

  const sumOfRating = rating.reduce((acc, rating) => acc + rating, 0);

  const averageRating = Math.floor(sumOfRating / (rating.length || 1));
  const points = averageRating * 20;

  const updateRating = await Captian.findByIdAndUpdate(
    req.captian?._id,
    { points },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updateRating, "points updated successfully"));
});
