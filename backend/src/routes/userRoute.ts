import express from "express";
import {
  allUsers,
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

router.get("/", authenticateToken, allUsers);

export default router;
