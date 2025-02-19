import { ApiError } from "../src/utils/ApiError.js";
import { ApiResponse } from "../src/utils/ApiResponse.js";
import Razorpay from 'razorpay'
import crypto from 'crypto';

const razorpay = new Razorpay({
    key_id: process.env.ROZARPAY_TEST_API_KEY,
    key_secret: process.env.ROZARPAY_TEST_API_KEY_SECRET
});

export const createPaymentService = async (amount, currency, receipt) => {
    try {
        const options = {
            amount: amount * 100,
            currency,
            receipt
        };

        const order = await razorpay.orders.create(options);
        
        if (!order) {
            throw new ApiError(500, "Error creating payment");
        }

        return order;
    } catch (error) {
        console.error("Payment Service Error:", error);
        throw new ApiError(500, "Error creating payment: " + error.message);
    }
};

export const verifyPaymentService = async (paymentId, orderId, signature) => {

    try {
        const hmac = crypto.createHmac("sha256", process.env.ROZARPAY_TEST_API_KEY_SECRET);
        hmac.update(orderId + "|" + paymentId);
        const generated_signature = hmac.digest("hex");

        if (generated_signature === signature) {
            return (paymentId, orderId, signature);
        } else {
            return new ApiError(400, "Invalid signature");
        }

    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Error verifying payment");
    }
};