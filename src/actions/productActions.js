import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
} from "../constants/productConstants";
import Axios from "axios";
//如果没有Axios调用外部api的话，Redux 的 dispatch 会在一个事件循环中收集所有动作（action），然后一次性调用 Reducer 更新状态，而不是立即触发多次渲染。
//只有引入异步操作（如 axios.get 或 setTimeout），状态更新会被分隔在不同事件循环
const listProducts =
  (category = "", searchKeyword = "", sortOrder = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      //mock调用后台api
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // const { data } = { data: { products: ["1", "2"] } };
      const { data, headers } = await Axios.get(
        "/api/products?category=" +
          category +
          "&searchKeyword=" +
          searchKeyword +
          "&sortOrder=" +
          sortOrder
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };
export { listProducts };
