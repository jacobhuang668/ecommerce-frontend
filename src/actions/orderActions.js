import Axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from "../constants/orderConstants";
const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    /*
       疑问：为什么/api/orders/mine请求没有显示传递token，但是后端能获取token呢？
            这是因为 后端通过 res.cookie("token", encryptedToken) 设置 Cookie 时，浏览器会将其存储在客户端。
                    之后，每次向同一域名（或匹配的域名/path）发送请求时，浏览器会自动在请求头中附带 Cookie。
            你提到 token 是密文，且由后端解密，说明登录时后端已通过 res.cookie("token", encryptedToken) 设置了 Cookie。
            listMyOrders 的请求（/api/orders/mine）是向同一域名发送，浏览器自动附带了这个 Cookie。

            这样的认证方式有一个大问题，如果用户浏览器禁止cookie的话，这样的方式就会影响到用户。
            1. 使用 HTTP 头部传递 Token（推荐）
            思路：
                将 token 存储在客户端（非 Cookie，如 localStorage），通过 Authorization 头手动传递。
            缺点：
                localStorage 不如 httpOnly Cookie 安全，易受 XSS 攻击。
                需手动管理 token（如登出时清除）。

            2. Header
                  只用 Header 完全行得通，且是现代 Web 开发中推荐的方式之一，尤其在 API 驱动的应用中。



     */
    const { data } = await Axios.get("/api/orders/mine");
    console.log("data--", data);
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error });
  }
};

export { listMyOrders };
