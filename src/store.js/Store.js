import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginReducer from "../slice/LoginSlice";
import rootSagaMain from "../saga/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSagaMain);

export default store;
