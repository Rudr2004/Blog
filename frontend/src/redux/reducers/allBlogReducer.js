import {
  FETCH_ALL_BLOGS_REQUEST,
  FETCH_ALL_BLOGS_SUCCESS,
  FETCH_ALL_BLOGS_FAILURE,
  FETCH_MY_BLOGS_REQUEST,
  FETCH_MY_BLOGS_SUCCESS,
  FETCH_MY_BLOGS_FAILURE,
} from "../actions/blogAction";

// Initial state for All Blogs
const initialState = {
  blogs: [], // Array of all blogs
  myBlogs: [], // Array of my blogs
  loading: false, // Indicates if the blogs are being fetched
  error: null, // Stores any error messages
};

// Reducer to handle All Blogs actions
const allBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    // When a request to fetch All Blogs is made
    case FETCH_ALL_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // When blogs are successfully fetched
    case FETCH_ALL_BLOGS_SUCCESS:
      console.log("Action Type:", action.type);
      console.log("Fetched blogs payload:", action.payload);
      return {
        ...state,
        loading: false,
        blogs: action.payload,
        error: null,
      };

    // When an error occurs during fetching
    case FETCH_ALL_BLOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // When a request to fetch My Blogs is made
    case FETCH_MY_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // When My Blogs are successfully fetched
    case FETCH_MY_BLOGS_SUCCESS:
      console.log("My Blogs Action Type:", action.type);
      console.log("Fetched My Blogs payload:", action.payload);
      return {
        ...state,
        loading: false,
        myBlogs: action.payload, // Set the fetched My Blogs
        error: null,
      };

    // When an error occurs during fetching My Blogs
    case FETCH_MY_BLOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Default case: return the current state
    default:
      return state;
  }
};

export default allBlogReducer;
