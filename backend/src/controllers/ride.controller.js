import {
  confirmTheRide,
  createNewRide,
  endTheRide,
  startTheRide,
} from "../../Services/ride.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { validationResult } from "express-validator";
import { getFare } from "../../Services/ride.service.js";
import getAddressCoordinates, {
  getCaptiansInTheRadius,
} from "../../Services/map.service.js";
import { sendMessagetoSocketId, getIO } from "../socket.js";
import { User } from "../models/user.model.js";
import { Ride } from "../models/ride.model.js";

export const createRide = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      400,
      errors.array().map((err) => err.msg)
    );
  }

  const { start, end, vehicleType } = req.body;

  if (!start || !end || !vehicleType) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const ride = await createNewRide({
      user: req.user?._id,
      start,
      end,
      vehicleType,
    });
    if (!ride) {
      throw new ApiError(500, "internal error: could not create new ride");
    }
    res
      .status(200)
      .json(new ApiResponse(201, ride, "ride created successfully"));

    const captianInRadius = await getCaptiansInTheRadius(
      start.lat,
      start.lng,
      2
    );

    ride.otp = "";

    const rideUser = await Ride.findOne({ _id: ride._id }).populate("user");

    captianInRadius.map((captian) => {
      sendMessagetoSocketId(captian.socketId, {
        event: "message",
        data: rideUser,
      });
    });
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "internal error");
  }
});

export const getPrice = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      400,
      errors.array().map((err) => err.msg)
    );
  }

  const { start, end } = req.query;

  if (!start || !end) {
    throw new ApiError(400, "start and end coordinates are required");
  }

  try {
    const fare = await getFare(start, end);
    if (!fare) {
      throw new ApiError(500, "internal server error: Could not find fare");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, fare, "fare fetched successfully"));
  } catch (error) {
    throw new ApiError(
      400,
      "internal server error: Could not find fare: " + error.message
    );
  }
});

export const confirmRide = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      400,
      errors.array().map((err) => err.msg)
    );
  }

  try {
    const { rideId } = req.body;

    const ride = await confirmTheRide({ rideId, captian: req.captian });

    if (!ride) {
      throw new ApiError(400, "Ride not found or already confirmed");
    }

    sendMessagetoSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    sendMessagetoSocketId(ride.captian.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, ride, "Ride confirmed successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "internal error");
  }
});

export const startRide = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      400,
      errors.array().map((err) => err.msg)
    );
  }

  try {
    const { rideId, otp } = req.query;

    if (!rideId) {
      throw new ApiError(400, "rideId is required");
    }

    if (!otp) {
      throw new ApiError(400, "OTP is required");
    }

    const ride = await startTheRide({ rideId, otp, captian: req.captian });
    if (!ride) {
      throw new ApiError(400, "Ride not found or OTP is incorrect");
    }

    sendMessagetoSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, ride, "Ride started successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "internal error");
  }
});

export const endRide = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      400,
      errors.array().map((err) => err.msg)
    );
  }

  const { rideId } = req.body;

  if (!rideId) {
    throw new ApiError(404, "rideId not found");
  }

  try {
    const ride = await endTheRide({ rideId, captian: req.captian });

    if (!ride) {
      throw new ApiError(404, "ride not found");
    }

    sendMessagetoSocketId(ride.user.socketId, {
      event: "rideEnded",
      data: ride,
    });
    // Broadcast to all connections
    getIO().emit("rideEnded", ride);

    return res
      .status(200)
      .json(new ApiResponse(200, ride, "ride ended successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "internal error");
  }
});
