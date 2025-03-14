import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
} from "../constants/userConstants";
import Axios from "axios";
const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    console.log({ type: USER_SIGNIN_SUCCESS, payload: data });

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error });
  }
};

const verifyToken = (encryptedToken) => async (dispatch) => {
  if (!encryptedToken) return;
  try {
    const { data } = await Axios.post(
      "/api/users/verify",
      { token: encryptedToken }, //请求体（body）。
      /* 
          2. { withCredentials: true } 表示什么？
              含义：
                  这是 Axios 的配置选项，用于控制 HTTP 请求是否携带浏览器的凭据（如 Cookie、HTTP 认证头）。
                  设置 withCredentials: true 表示请求会附带当前域的 Cookie。
              作用：
                  如果后端接口需要 Cookie（比如用于会话验证或 CSRF 防护），withCredentials: true 确保这些 Cookie 被发送。
                  跨域请求（CORS）时尤其重要，后端必须配置允许携带凭据（Access-Control-Allow-Credentials: true）。
      */
      { withCredentials: true } //配置选项（config）。
    );
    dispatch({ type: "USER_VERIFY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_VERIFY_FAIL",
      payload: error.response?.data?.message,
    });
  }
};

export { signin, verifyToken };
