import {  call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { loginRequest, loginSuccess, loginFailure } from "../slice/LoginSlice";

const apiCall = (user) => {
  const apiBaseUrl = process.env.REACT_APP_USERS_SERVER + "/login";
  return axios.post(apiBaseUrl, user);
};

export function* loginSaga(action) {
  try {
    const response = yield call(apiCall, action.payload);
    if (response.status === 200) {
      yield put(loginSuccess(response.data));
      sessionStorage.setItem("token", response.data.token);
      action.payload.navigate("/home");
    } else {
      yield put(loginFailure("An unexpected error occurred."));
    }
  } catch (error) {
    if (error.response) {
      yield put(loginFailure(error.response.data));
    } else {
      yield put(loginFailure("An error occurred. Please try again later."));
    }
  }
}


export default function* rootSagaMain() {

  yield takeLatest(loginRequest.type, loginSaga);


}
