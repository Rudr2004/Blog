import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  loginSuccess,
  REGISTER_REQUEST,
  registerSuccess,
  registerFailure,
  loginFailure,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../actions/authAction.js";

// Worker saga for login
function* loginSaga(action) {
  try {
    const apicall = axios.post;
    const response = yield call(
      apicall,
      "http://localhost:4000/api/user/login",
      action.payload
    );
    localStorage.setItem("token", response.data.token);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.message || "Login failed"));
    console.log(error);
  }
}

// Worker saga for register
function* registerSaga(action) {
  try {
    const apicall = axios.post;
    const response = yield call(
      apicall,
      "http://localhost:4000/api/user/signup",
      action.payload
    );
    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(registerFailure(error.message || "Registration failed"));
  }
}

function* resetPasswordSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:4000/api/user/reset-password",
      action.payload
    );
    yield put({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({
      type: RESET_PASSWORD_FAILURE,
      payload: error.response.data.message,
    });
  }
}

// Watcher saga for authentication actions
export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}
