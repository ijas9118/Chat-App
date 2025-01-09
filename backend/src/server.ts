import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
connectDB();

app.get("/", (req, res) => {
  console.log("Hello world");
  res.send("hiii");
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on http://localhost:3000`)
);
