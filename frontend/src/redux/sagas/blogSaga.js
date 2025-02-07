import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_MY_BLOGS_REQUEST,
  fetchMyBlogsSuccess,
  fetchMyBlogsFailure,
  FETCH_ALL_BLOGS_REQUEST,
  fetchAllBlogsSuccess,
  fetchAllBlogsFailure,
  ADD_BLOG_REQUEST,
  addBlogSuccess,
  addBlogFailure,
  ADD_COMMENT_REQUEST,
  addCommentSuccess,
  addCommentFailure,
} from "../actions/blogAction";

// Worker saga for fetching my blogs
function* fetchMyBlogsSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.get,
      "https://blog-c1xp.onrender.com/api/blog/my-blog", // Use the /my-blog endpoint
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Fetched my blogs response:", response.data);
    yield put(fetchMyBlogsSuccess(response.data.blogs));
  } catch (error) {
    yield put(fetchMyBlogsFailure(error.message));
  }
}

// Worker saga for adding a comment
function* addCommentSaga(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.post,
      `https://blog-c1xp.onrender.com/api/blog/${action.payload.blogId}/comment`,
      { comment: action.payload.comment },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    yield put(addCommentSuccess(response.data.comments));
  } catch (error) {
    yield put(addCommentFailure(error.message));
  }
}

// Worker saga for fetching all blogs
function* fetchAllBlogsSaga() {
  try {
    const response = yield call(
      axios.get,
      "https://blog-c1xp.onrender.com/api/blog/all-blog"
    );

    // Log the response data to check its structure
    console.log("Fetched blogs response:", response);

    // Check if the response data is an array or if it's nested
    if (Array.isArray(response.data)) {
      yield put(fetchAllBlogsSuccess(response.data));
    } else if (response.data.blogs && Array.isArray(response.data.blogs)) {
      yield put(fetchAllBlogsSuccess(response.data.blogs));
    } else {
      yield put(fetchAllBlogsFailure("Fetched data is not an array"));
    }
  } catch {
    yield put(fetchAllBlogsFailure("error"));
  }
}

function* addBlogSaga(action) {
  try {
    const token = localStorage.getItem("token");
    const token1 = localStorage.getItem("Googletoken");
    if (token || token1) {
      const response = yield call(
        axios.post,
        "https://blog-c1xp.onrender.com/api/blog/create",
        action.payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      yield put(addBlogSuccess(response.data));
    }
  } catch (error) {
    yield put(addBlogFailure(error.message));
  }
}

// Watcher saga for blog actions
export default function* blogSaga() {
  yield takeLatest(FETCH_MY_BLOGS_REQUEST, fetchMyBlogsSaga);
  yield takeLatest(FETCH_ALL_BLOGS_REQUEST, fetchAllBlogsSaga);
  yield takeLatest(ADD_BLOG_REQUEST, addBlogSaga);
  yield takeLatest(ADD_COMMENT_REQUEST, addCommentSaga);
}
