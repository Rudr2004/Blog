import jwt from "jsonwebtoken";
import { User } from "../model/User.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Received token:", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = await User.findById(decoded.id);
    console.log("Authenticated user:", req.user);
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};
