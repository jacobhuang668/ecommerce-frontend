import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_LOGOUT_FAIL,
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
    localStorage.setItem("token", data.encrptTokens);
    console.log("data---", data);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error });
  }
};

const verifyToken = (encryptedToken) => async (dispatch) => {
  if (!encryptedToken) return;
  try {
    /*
          axios.get(url) 的返回值是一个 response 对象，通常包含多个属性，如：
              {
                data: { products: [...] }, // 这是我们需要的 API 返回数据
                status: 200,
                statusText: "OK",
                headers: { ... },
                config: { ... },
                request: { ... }
              }
      const { data } 这行代码使用了解构赋值, 不能直接改成 const data，否则 data 会变成整个 response 对象，而不是 response.data。
    
    */
    const { data } = await Axios.post(
      "/api/users/verify",
      { token: encryptedToken } //请求体（body）。
      /* 
          2. { withCredentials: true } 表示什么？
              含义：
                  这是 Axios 的配置选项，用于控制 HTTP 请求是否携带浏览器的凭据（如 Cookie、HTTP 认证头）。
                  设置 withCredentials: true 表示请求会附带当前域的 Cookie。
              作用：
                  如果后端接口需要 Cookie（比如用于会话验证或 CSRF 防护），withCredentials: true 确保这些 Cookie 被发送。
                  跨域请求（CORS）时尤其重要，后端必须配置允许携带凭据（Access-Control-Allow-Credentials: true）。
      */
      // { withCredentials: true }配置选项（config）。
    );
    dispatch({ type: "USER_VERIFY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_VERIFY_FAIL",
      payload: error.response?.data?.message, //error.response?.data如果response是undefined或null不会报错，直接返回undefined或null，?.(optional chaining)
    });
  }
};

const logout = (encryptedToken) => async (dispatch) => {
  try {
    const config = { headers: { Authorization: `Bearer ${encryptedToken}` } };
    const { data } = await Axios.post("/api/users/logout", config);
    console.log(data);
    dispatch({ type: USER_LOGOUT, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error });
  }
};

export { signin, verifyToken, logout };
