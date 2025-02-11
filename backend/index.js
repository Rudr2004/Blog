import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import cors from "cors";
import router from "./routes/blog-route.js";
import userRouter from "./routes/user-route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://baaplg.netlify.app/"],
    //origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(express.json());
app.use("/api/blog", router);
app.use("/api/user", userRouter);
db();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
