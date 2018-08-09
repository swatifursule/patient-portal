import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchPatient() {
  return axios({
    method: "get",
    url: "http://localhost:3001/api/v1/patients"
  });
}
/*function addPatient() {
  return axios({
    method: "get",
    url: ""
  });
}
function updatePatient() {
  return axios({
    method: "get",
    url: ""
  });
}
*/
// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchPatient);
    const patient = response.data.message;

    // dispatch a success action to the store with the new patient
    yield put({ type: "API_CALL_SUCCESS", patient });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}
