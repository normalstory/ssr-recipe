import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga"; //+saga
import rootReducer, { rootSaga } from "./modules"; //+saga

const sagaMiddleware = createSagaMiddleware(); //+saga

const store = createStore(
  rootReducer,
  window.__PRELOADED_STATE__, // 이 값을 초기 상태로 사용
  applyMiddleware(thunk, sagaMiddleware) //+saga
);

sagaMiddleware.run(rootSaga); //+saga

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
