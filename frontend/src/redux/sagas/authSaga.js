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
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
  GIT_LOGIN_SUCCESS,
  GIT_LOGIN_FAILURE,
  GIT_LOGIN_REQUEST,
} from "../actions/authAction.js";
import { toast } from "react-hot-toast";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import app from "../../firebase.js";
import { getDatabase, set, ref, push } from "firebase/database";
//import { addDoc, getFirestore, collection } from "firebase/firestore";

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
  }
}

//Google
function* googleLoginSaga() {
  try {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const response = yield call(signInWithPopup, auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(response);
    if (!credential) {
      throw new Error("Failed to get credentials from Google login");
    }

    const token = credential.accessToken;
    const user = response.user;
    console.log(user);
    localStorage.setItem("Googletoken", token);
    yield put({ type: GOOGLE_LOGIN_SUCCESS, payload: {} });

    //Store the User information into the Firebase Database
    try {
      const db = getDatabase(app);
      const dbRef = push(ref(db, "Users/Details"));
      const data = set(dbRef, {
        name: response.user.displayName,
        email: response.user.email,
      });
      toast.success("Saved to DB");
      alert("Saved to DB");
      console.log("Data", data);
    } catch (error) {
      console.log("Error", error);
      alert("Error");
    }

    //Store the User data into the FireStore
    /*
    try {
      const fireStore = getFirestore(app);
      const result = addDoc(collection(fireStore, "Users"), {
        name: response.user.displayName,
        email: response.user.email,
      });
      alert("FireStore");
      console.log("Result", result);
    } catch (error) {
      console.log("Error", error);
      alert("Error");
    } */
  } catch (error) {
    console.error("Google login error:", error);
    yield put({
      type: GOOGLE_LOGIN_FAILURE,
      payload: error.message || "Google login failed",
    });
  }
}

//Git
function* gitLoginSaga() {
  try {
    const auth = getAuth();
    console.log("auth", auth);
    const provider = new GithubAuthProvider();
    const response = yield call(signInWithPopup, auth, provider);
    console.log("response", response);
    if (!response) {
      console.log("Response not get");
    }
    const credential = GithubAuthProvider.credentialFromResult(response);
    if (!credential) {
      throw new Error("Failed to get credentials from Git login");
    }
    const token = credential.accessToken;
    const user = response.user;
    console.log("Git user:", user);
    localStorage.setItem("Gittoken", token);
    yield put({ type: GIT_LOGIN_SUCCESS, payload: {} });
  } catch (error) {
    console.error("Git login error:", error);
    const email = error.customData.email;
    console.log("Email", email);
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    console.log("Cre", credential);
    yield put({
      type: GIT_LOGIN_FAILURE,
      payload: error.message || "Git login failed",
    });
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
  yield takeLatest(GOOGLE_LOGIN_REQUEST, googleLoginSaga);
  yield takeLatest(GIT_LOGIN_REQUEST, gitLoginSaga);
}
