import express from "express";
import {
  createPayment,
  verifyPayment,
} from "../controllers/payment.controller.js";
import { body } from "express-validator";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/create-payment")
  .post(
    verifyJWT,
    body("amount").isNumeric().withMessage("Invalid amount"),
    createPayment
  );

router
  .route("/verify-payment")
  .post(
    verifyJWT,
    body("rideId")
      .isLength({ min: 1 })
      .isMongoId()
      .withMessage("Invalid ride id"),
    body("paymentId").isLength({ min: 1 }).withMessage("Invalid payment id"),
    body("signature").isLength({ min: 1 }).withMessage("Invalid signature"),
    body("orderId").isLength({ min: 1 }).withMessage("Invalid order id"),
    verifyPayment
  );

export default router;
