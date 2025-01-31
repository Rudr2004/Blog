import {
  FETCH_MY_BLOGS_REQUEST,
  FETCH_MY_BLOGS_SUCCESS,
  FETCH_MY_BLOGS_FAILURE,
  FETCH_ALL_BLOGS_REQUEST,
  FETCH_ALL_BLOGS_SUCCESS,
  FETCH_ALL_BLOGS_FAILURE,
} from "../actions/blogAction";

// Initial state for My Blogs
const initialState = {
  blogs: [],
  loading: false,
  error: false,
  success: null,
};

// Reducer to handle My Blogs actions
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MY_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_MY_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload,
        error: false,
        success: true,
      };

    case FETCH_MY_BLOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_ALL_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ALL_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload,
        error: false,
        success: true,
      };

    case FETCH_ALL_BLOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default blogReducer;
