import express from "express";
import dotenv from "dotenv";
import schoolRouter from "./routes/school.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "School Management API is running" });
});

app.use("/", schoolRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
