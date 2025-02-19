import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { createPaymentService, verifyPaymentService } from '../../Services/payment.service.js';
import { validationResult } from 'express-validator';
import { Ride } from '../models/ride.model.js';

export const createPayment = asyncHandler(async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(400, "Validation Error", errors.array());
        }

        const { amount, currency, receipt} = req.body;

        if (!amount) {
            throw new ApiError(400, "Amount is required");
        }

        const payment = await createPaymentService(amount, currency, receipt);

        return res
            .status(200)
            .json(new ApiResponse(200, payment, "Payment order created successfully"));
            
    } catch (error) {
        console.error("Payment Controller Error:", error);
        throw new ApiError(error.statusCode || 500, error.message || "Payment creation failed");
    }
});

export const verifyPayment = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array().map((err) => err.msg));
    }

    try {
        const { rideId, paymentId, orderId, signature } = req.body;

        if (!paymentId || !orderId || !signature) {
            throw new ApiError(400, "All fields are required");
        }

        if(!rideId) {
            throw new ApiError(400, "Ride id is required");
        }

        const paymentVerify = await verifyPaymentService(paymentId, orderId, signature);

        if (!paymentVerify) {
            throw new ApiError(400, "Invalid payment verification");
        }

        const ride = await Ride.findOneAndUpdate({_id: rideId}, {paymentId, orderId, signature}, {new: true}).populate('user').populate('captian');

        res.status(200).json(new ApiResponse(200, {paymentVerify, ride}, "Payment verified successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error: Failed to verify payment");
    }
});