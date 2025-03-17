import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import { productListReducers } from "./reducers/productReducers";
import { userSigninReducer } from "./reducers/userReducers";
import { myOrderListReducer } from "./reducers/orderReducers";
const reducer = combineReducers({
  productList: productListReducers,
  userSignin: userSigninReducer,
  myOrderList: myOrderListReducer,
});
//const token = Cookie.getJSON("token") || null;
const token = localStorage.getItem("token");

const initialState = {
  userSignin: { token },
};
console.log("initialState----", initialState);

//composeEnhancer 用于连接 Redux DevTools（如果存在）。如果没有 DevTools，它将使用默认的 compose。
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
