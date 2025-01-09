import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRouter from "./routes/userRoute";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello world");
  res.send("hiii");
})

app.use("/api/user", userRouter);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
