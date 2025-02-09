import mongoose from "mongoose";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First Name must be at least 3 characters"],
    },
    lastName: {
      type: String,
      minLength: [3, "Last Name must be at least 3 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) =>
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
      validate: {
        validator: (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          ),
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
    socketId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bycrpt.compare(password, this.password);
  return isMatch;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bycrpt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", userSchema);
