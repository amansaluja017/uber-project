import { Caption } from "../models/caption.model.js";
import { createCaption } from "../../Services/caption.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { validationResult } from "express-validator";

export const generateAccessAndRefreshToken = async (userId) => {

    try {
        const caption = await Caption.findById(userId);

        const accessToken = await caption.generateAccessToken();
        const refreshToken = await caption.generateRefreshToken();

        caption.refreshToken = refreshToken;
        await caption.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        process.exit(1);
        throw new ApiError(500, "failed to generate access and refresh token", error.message);
    }
}

export const registerCaption = asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array().map(err => err.message), "Invalid request");
    }

    const {firstName, lastName, email, password, vehicle, location, status} = req.body;

    if(!firstName || !email || !password || !vehicle || !status) {
        throw new ApiError(400, "All fields are required");
    }

    const existedCaption = await Caption.findOne({email})

    if(existedCaption) {
        throw new ApiError(400, "Email already exists",);
    }

    const caption = await createCaption({
        firstName,
        lastName,
        email,
        password,
        color: vehicle.color,
        vehicleType: vehicle.vehicleType,
        capicity: vehicle.capicity,
        plate: vehicle.plate,
        location,
        status
    })

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(caption._id)
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(201).cookie('accessToken', accessToken, options).cookie('refreshToken', refreshToken, options).json(new ApiResponse(201, caption, "caption created successfully"))
})