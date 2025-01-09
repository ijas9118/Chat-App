import express from "express";
import {
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

export default router;
