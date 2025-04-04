import express from "express";
import { body, query } from "express-validator";
import {
  registercaptian,
  logincaptian,
  captainProfile,
  logoutCaptian,
  rideHistory,
  captianPoints,
  captianEarnings,
  updateStatus,
} from "../controllers/captian.controller.js";
import { verifyJWTCaptian } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/register")
  .post(upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    }
  ]) , registercaptian, [
    body("firstName").notEmpty().withMessage("firstName is required"),
    body("email").isEmail().withMessage("email is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters"),
    body("color").isLength({ min: 3 }).withMessage("color is required"),
    body("vehicleType")
      .isLength({ min: 1 })
      .withMessage("vehicle type is required"),
    body("capicity")
      .isLength({ min: 1 })
      .withMessage("capicity must be greater than zero"),
    body("status").isLength({ min: 1 }).withMessage("status is required"),
  ]);

router
  .route("/login")
  .post(logincaptian, [
    body("email").isEmail().withMessage("enter a valid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters"),
  ]);

router.route("/captainProfile").get(verifyJWTCaptian, captainProfile);
router.route("/logout").get(verifyJWTCaptian, logoutCaptian);
router.route("/rideHistory").get(rideHistory);
router.route("/captian-earnings").get(verifyJWTCaptian, captianEarnings)
router.route("/captian-points").get(verifyJWTCaptian, captianPoints);
router.route("/update-status").post(verifyJWTCaptian, updateStatus);

export default router;
