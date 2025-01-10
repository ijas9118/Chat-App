import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../utils/errorHandler";
import { verifyAccessToken } from "../utils/auth";

export const authenticateToken: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return next(new AppError("Access token required", 401));
  }

  try {
    const userPayload = verifyAccessToken(accessToken);
    req.user = userPayload;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired access token", 401));
  }
};
