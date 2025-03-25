import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, update } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_REQUEST } from "../constants/userConstants";
function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, token } = userSignin;

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: orderLoading, orders, error: orderError } = myOrderList;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: updateLoading } = userUpdate;

  const dispatch = useDispatch();
  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }));
  }

  useEffect(() => {
    //if (!updateLoading) 会将所有假值（包括 undefined）视为 true
    if (updateLoading === false) {
      props.history.push("/");
      dispatch({ type: USER_UPDATE_REQUEST });
    }
    //input 显示数据
    if (userInfo) {
      setName(userInfo.name ?? "");
      setEmail(userInfo.email ?? "");
      setPassword(userInfo.password ?? ""); // 若 value 是 undefined 或 null，用 ""
      dispatch(listMyOrders(token));
    }
    return () => {};
  }, [userInfo, updateLoading]);
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
                {/*在 <form> 中， name="name" 提交时会生成键值对（如 { name: "输入的值" }）。 */}
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
