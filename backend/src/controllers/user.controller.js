import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userCreate } from "../../Services/user.service.js";
import { validationResult } from "express-validator";
import { Token } from "../models/blacklistToken.model.js";

export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "failed to generate access and refresh token",
      error.message
    );
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      400,
      errors.array().map((err) => err.msg)
    );
  }

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return res.status(401).json(new ApiError(401, "All fields are required"));
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "Email already exists");
  }

  const user = await userCreate({
    firstName,
    lastName,
    email,
    password,
  });

  return res.json(new ApiResponse(201, user, "user created successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      400,
      errors.array().map((err) => err.msg)
    );
  }

  const { email, password } = req.body;

  if (!(email && password)) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email }).select("+password +refreshToken");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const comparePassword = await user.comparePassword(password);

  if (!comparePassword) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        {
          user,
          accessToken,
          refreshToken,
        },
        "Logged in successfully"
      )
    );
    
});

export const userProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
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

  await Token.create({ token, user: req.user, expiration: Date.now() });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "logged out successfully"));
});
