import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Token } from "../models/blacklistToken.model.js";
import { Captian } from "../models/captian.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized access");
    };

    const isTokenBlackListed = await Token.findOne({ token });

    if (isTokenBlackListed) {
      throw new ApiError(401, "Unauthorized access due to token blacklisted");
    }

    const tokenDecode = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    const user = await User.findById(tokenDecode?.id).select("-refreshToken");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    throw new ApiError(401, "unauthorized access", error.message);
  }
});

export const verifyJWTCaptian = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized access");
    }

    const isTokenBlackListed = await Token.findOne({ token });

    if (isTokenBlackListed) {
      throw new ApiError(401, "Unauthorized access due to token blacklisted");
    }

    const tokenDecode = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);

    const captian = await Captian.findById(tokenDecode?._id).select(
      "-refreshToken"
    );

    if (!captian) {
      throw new ApiError(404, "Captian not found");
    }

    req.captian = captian;
    next();
  } catch (error) {
    throw new ApiError(401, "unauthorized access", error.message);
  }
});
