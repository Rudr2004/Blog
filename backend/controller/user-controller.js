import { User, Validation } from "../model/User.js";
import { Blog } from "../model/Blog.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { value, error } = await Validation.userValidation.validate(req.body);

  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log(e);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(201).json({ user, token });
  } catch (e) {
    console.log(e);
  }
};

export const logIn = async (req, res, next) => {
  const { value, error } = Validation.userValidation.validate(req.body);
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log(e);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password!" });
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return res.status(200).json({ user: existingUser, token }); // Send user and token in response
};

export const logOut = (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logged out successfully" });
};

// New methods for likes and comments
export const addLike = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.likes = (blog.likes || 0) + 1;
    await blog.save();
    return res.status(200).json({ message: "Like added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding like" });
  }
};

export const addComment = async (req, res) => {
  const { blogId } = req.params;
  const { comment } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.comments = blog.comments || [];
    blog.comments.push(comment);
    await blog.save();
    return res.status(200).json({ comments: blog.comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding comment" });
  }
};

export const resetPassword = async (req, res) => {
  const { value, error } = Validation.userValidation.validate(req.body);
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return res.status(500).json({ message: "Database query failed." });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  existingUser.password = hashedPassword;

  try {
    await existingUser.save();
    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "Failed to update password." });
  }
};
