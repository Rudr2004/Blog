import { combineReducers } from "redux";
import blogReducer from "./blogReducer";
import allBlogReducer from "./allBlogReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  blog: blogReducer,
  allBlogs: allBlogReducer,
  auth: authReducer,
});

export default rootReducer;
