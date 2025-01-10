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

    res.cookie("access-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User registered successfully" });
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

    res.cookie("access-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
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

export const allUsers: RequestHandler = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword)
      .select("userName email profilePic")
      .find({ _id: { $ne: req.user.id } });

    console.log(users);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
