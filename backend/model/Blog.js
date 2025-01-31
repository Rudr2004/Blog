import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [String],
    default: [],
  },
  comments: [
    {
      text: { type: String, required: true },
      user: { type: mongoose.Types.ObjectId, ref: "User" },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
