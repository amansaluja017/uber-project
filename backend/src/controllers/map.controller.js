import getAddressCoordinates, { getDistanceAndTime, getSearchSuggestins } from "../../Services/map.service.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import {ApiResponse} from '../utils/ApiResponse.js'

export const getCoodinates = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(
            400,
            errors.array().map((err) => err.msg)
        );
    }

    const { address } = req.params;

    if (!address) {
        throw new ApiError(400, "Address is required");
    }

    try {
        const coordinates = await getAddressCoordinates(address);

        if(!coordinates) {
            throw new ApiError(400, "Invalid address");
        }

        return res.status(200).json(new ApiResponse(200, coordinates, "Coodinates fetched successfully"))
    } catch (err) {
        throw new ApiError(500, err);
    }
})

export const getDistanceTime = asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(
            400,
            errors.array().map((err) => err.msg)
        );
    }

    const {start, end, travelMode} = req.params;
    
    if (!start ||!end ||!travelMode) {
        throw new ApiError(400, "Start, end, and travel mode are required");
    }

    try {
        const distance = await getDistanceAndTime(start, end, travelMode);

        if(!distance) {
            throw new ApiError(400, "Invalid addresses or travel mode");
        }

        return res.status(200).json(new ApiResponse(200, distance, "distance and duration fetched successfully"))
    } catch (error) {
        throw new ApiError(500, "error getting distance");
    }
})

export const getSuggestions = asyncHandler(async(req, res) => {
    const {input } = req.query;

    if(!input) {
        throw new ApiError(400, "Input is required");
    }

    try {
        const suggestions = await getSearchSuggestins(input);

        if(!suggestions) {
            throw new ApiError(400, "Invalid input");
        }

        return res.status(200).json(new ApiResponse(200, suggestions, "Suggestions fetched successfully"))
        
    } catch (error) {
        console.log(error);
    }
});