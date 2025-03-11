import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";
// ReactDOM.render(
//   <React.StrictMode store={store}>
//     <App />  //export NODE_OPTIONS=--openssl-legacy-provider
//   </React.StrictMode>,
//   document.getElementById("root")
// );
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
