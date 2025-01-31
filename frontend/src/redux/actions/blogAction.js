export const FETCH_MY_BLOGS_REQUEST = "FETCH_MY_BLOGS_REQUEST";
export const ADD_BLOG_REQUEST = "ADD_BLOG_REQUEST";
export const ADD_BLOG_SUCCESS = "ADD_BLOG_SUCCESS";
export const ADD_BLOG_FAILURE = "ADD_BLOG_FAILURE";

export const FETCH_MY_BLOGS_SUCCESS = "FETCH_MY_BLOGS_SUCCESS";
export const FETCH_MY_BLOGS_FAILURE = "FETCH_MY_BLOGS_FAILURE";

export const FETCH_ALL_BLOGS_REQUEST = "FETCH_ALL_BLOGS_REQUEST";
export const FETCH_ALL_BLOGS_SUCCESS = "FETCH_ALL_BLOGS_SUCCESS";
export const FETCH_ALL_BLOGS_FAILURE = "FETCH_ALL_BLOGS_FAILURE";

// Action for adding a blog
export const addBlogRequest = () => ({
  type: ADD_BLOG_REQUEST,
});

export const addBlogSuccess = (blog) => ({
  type: ADD_BLOG_SUCCESS,
  payload: blog,
});

export const addBlogFailure = (error) => ({
  type: ADD_BLOG_FAILURE,
  payload: error,
});

// Actions for fetching my blogs
export const fetchMyBlogsRequest = (userId) => ({
  type: FETCH_MY_BLOGS_REQUEST,
  payload: { userId }, // Pass the user ID to fetch their blogs
});

export const fetchMyBlogsSuccess = (blogs) => ({
  type: FETCH_MY_BLOGS_SUCCESS,
  payload: blogs,
});

export const fetchMyBlogsFailure = (error) => ({
  type: FETCH_MY_BLOGS_FAILURE,
  payload: error,
});

// Actions for fetching all blogs
export const fetchAllBlogsRequest = ({ page = 1, limit = 5 }) => ({
  type: FETCH_ALL_BLOGS_REQUEST,
  payload: { page, limit }, // Pass the pagination object containing page and limit
});

export const fetchAllBlogsSuccess = (blogs) => ({
  type: FETCH_ALL_BLOGS_SUCCESS,
  payload: blogs,
});

export const fetchAllBlogsFailure = (error) => ({
  type: FETCH_ALL_BLOGS_FAILURE,
  payload: error,
});

// Actions for adding a comment
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addCommentRequest = (blogId, comment) => ({
  type: ADD_COMMENT_REQUEST,
  payload: { blogId, comment },
});

export const addCommentSuccess = (comments) => ({
  type: ADD_COMMENT_SUCCESS,
  payload: comments,
});

export const addCommentFailure = (error) => ({
  type: ADD_COMMENT_FAILURE,
  payload: error,
});

// Actions for adding a like
export const ADD_LIKE_REQUEST = "ADD_LIKE_REQUEST";
export const ADD_LIKE_SUCCESS = "ADD_LIKE_SUCCESS";
export const ADD_LIKE_FAILURE = "ADD_LIKE_FAILURE";

export const addLikeRequest = (blogId) => ({
  type: ADD_LIKE_REQUEST,
  payload: { blogId },
});

export const addLikeSuccess = (blogId) => ({
  type: ADD_LIKE_SUCCESS,
  payload: blogId,
});

export const addLikeFailure = (error) => ({
  type: ADD_LIKE_FAILURE,
  payload: error,
});
