import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  userProfile,
  logoutUser,
} from "../controllers/user.controller.js";
import { body } from "express-validator";
import express from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/register")
  .post(upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    }
  ]), registerUser, [
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("first name must be at least 3 characters"),
    body("email").isEmail().withMessage("enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ]);

router
  .route("/login")
  .post(loginUser, [
    body("email").isEmail().withMessage("enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ]);

router.route("/userProfile").get(verifyJWT, userProfile);
router.route("/logout").get(verifyJWT, logoutUser);

export default router;
