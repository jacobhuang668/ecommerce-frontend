import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { token } = userSignin;
  const myOrderList = useSelector((state) => state.myOrderList);
  const { orders } = myOrderList;
  const dispatch = useDispatch();
  function onSubmitHandler(e) {
    e.preventDefault();
  }
  useEffect(() => {
    dispatch(listMyOrders());
    return () => {};
  }, []);
  console.log("ProfileScreen:", token, "myOrderList:", orders);
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
                <input
                  type="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                <label>Email</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                <label>Password</label>
                <input
                  type="password"
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
