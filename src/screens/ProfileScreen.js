import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, token } = userSignin;

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: orderLoading, orders, error: orderError } = myOrderList;
  const dispatch = useDispatch();
  function onSubmitHandler(e) {
    e.preventDefault();
  }
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        console.log("Token changed via storage event:", e.newValue);
        //setLocalToken(e.newValue); // 更新状态
      }
    };
    window.addEventListener("storage", handleStorageChange);
    //input 显示数据
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPassword(userInfo.password ?? ""); // 若 value 是 undefined 或 null，用 ""
      dispatch(listMyOrders());
    }
    return () => {
      //刷新前，旧组件卸载，触发清理函数
      window.removeEventListener("storage", handleStorageChange);
      console.log(333); //React 内的 token 是静态值（渲染时的快照）。localStorage 变化不自动反映到 token。
      //当浏览器localStorage的token被修改时，就会触发清理函数。const [localToken, setLocalToken] = useState(localStorage.getItem("token") || "");
    };
  }, [userInfo, token]);
  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={onSubmitHandler}>
            <ul className="form-container">
              <li>
                <h3>User Profile</h3>
              </li>
              <li>
                <label>Name</label>
                {/*在 <form> 中，提交时会生成键值对（如 { name: "输入的值" }）。 */}
                <input
                  value={name}
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                <label>Email</label>
                <input
                  value={email}
                  type="text"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                <label>Password</label>
                <input
                  value={password}
                  type="password"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                <button type="submit" className="button primary">
                  Update
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="button secondary full-width"
                  onClick={() => {
                    dispatch(logout(token));
                    localStorage.removeItem("token");
                    props.history.push("/signin");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="profile-orders content-margined">table</div>
    </div>
  );
}
export default ProfileScreen;
