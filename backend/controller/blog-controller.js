import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getBlogs = async (req, res) => {
  const { page = 1, limit = 15 } = req.query;
  try {
    const blogs = await Blog.find()
      .populate("user")
      .skip((page - 1) * limit)
      .limit(limit);
    const totalBlogs = await Blog.countDocuments();
    res.json({
      blogs: blogs.map((blog) => ({
        ...blog.toObject(),
        likes: blog.likes || 0,
        comments: blog.comments ? blog.comments.slice(0, 5) : [],
      })),
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, desc } = req.body;
  const userId = req.user ? req.user.id : null; // Get the user ID from the request

  console.log("Creating blog for user ID:", userId); // Log the user ID

  try {
    const newBlog = new Blog({ title, content, desc, user: userId });
    await newBlog.save();

    // Update the user's blog array
    await User.findByIdAndUpdate(userId, { $push: { blogs: newBlog._id } }); // Update the user's blog array

    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

export const getByUserId = async (req, res) => {
  const userId = req.user.id; // Use the authenticated user's ID

  try {
    const userBlogs = await User.findById(userId).populate({
      path: "blogs",
      populate: {
        path: "comments", // Populate comments for each blog
        model: "Comment", // Assuming comments are stored in a Comment model
      },
    });
    if (!userBlogs) {
      return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ blogs: userBlogs.blogs });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Like a blog
export const likeBlog = async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Check if the user has already liked the blog
    if (blog.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this blog" });
    }

    // Increment the like count and add the user ID to likedBy
    blog.likes = (blog.likes || 0) + 1;
    blog.likedBy.push(userId);
    await blog.save();
    res.status(200).json({ message: "Blog liked successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comment on a blog
export const commentOnBlog = async (req, res) => {
  const { blogId } = req.params;
  const { comment } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Add the comment to the blog
    blog.comments = [
      ...(blog.comments || []),
      { text: comment, user: req.user.id },
    ];
    await blog.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  const { blogId, comment } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Add the comment to the blog
    blog.comments.push({ text: comment, user: req.user.id });
    await blog.save();

    return res
      .status(200)
      .json({ message: "Comment added successfully", comments: blog.comments });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
