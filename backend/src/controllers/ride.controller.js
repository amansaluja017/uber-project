import { createNewRide } from "../../Services/ride.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { validationResult } from "express-validator";
import { getFare } from "../../Services/ride.service.js";

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
    console.log(start)

    try {
        const ride = await createNewRide({ user: req.user?._id, start, end, vehicleType });
        if (!ride) {
            throw new ApiError(500, "internal error: could not create new ride");
        }

        return res.status(200).json(new ApiResponse(201, ride, "ride created successfully"));


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
            throw new ApiError(500, "internal server error: Could not find fare")
        }

        return res.status(200).json(new ApiResponse(200, fare, "fare fetched successfully"));
    } catch (error) {
        throw new ApiError(400, "internal server error: Could not find fare: " + error.message);
    }
})