import { all } from "redux-saga/effects";
import blogSaga from "./blogSaga";
import authSaga from "./authSaga";

export default function* rootSaga() {
  yield all([blogSaga(), authSaga()]);
}
