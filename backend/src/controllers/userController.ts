import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/auth";
import { IUser } from "../models/User";
import { AppError } from "../utils/errorHandler";

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) next(new AppError("User already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(newUser._id.toString());
    const refreshToken = generateRefreshToken(newUser._id.toString());

    newUser.refreshToken = refreshToken;

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      next(new AppError("Invalid credentials", 400));
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password as string
    );

    if (!isPasswordValid) next(new AppError("Invalid credentials", 400));

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken: RequestHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      res.status(400).json({ message: "Refresh token required" });

    const payload = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(payload.id);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token", error });
  }
};
