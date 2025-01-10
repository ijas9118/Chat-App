import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRouter from "./routes/userRoute";
import { errorHandler } from "./middleware/errorMiddleware";
import { AppError } from "./utils/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
connectDB();

app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/users", userRouter);

app.use(errorHandler);

app.use((req, res) => {
  throw new AppError("Not Found", 404);
});

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
