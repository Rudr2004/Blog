import express from "express";
import {
  commentOnBlog,
  createBlog,
  getBlogs,
  getByUserId,
  likeBlog,
  addComment,
} from "../controller/blog-controller.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all-blog", getBlogs);
router.get("/my-blog", authenticateUser, getByUserId);
router.post("/create", authenticateUser, createBlog);
router.post("/like/:blogId", authenticateUser, likeBlog);
router.post("/comment/:blogId", authenticateUser, commentOnBlog);
router.post("/comments", authenticateUser, addComment);

export default router;
