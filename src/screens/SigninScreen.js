import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const direct = props.localtion.search
    ? props.localtion.search.split("=")[1]
    : "/";

  useEffect(() => {
    props.history.push(direct);
    console.log("userInfo", userInfo, "redirect", redirect);
    return () => {};
  }, userInfo);
  function onSubmitHandler(e) {
    e.preventDefault();
  }
  return (
    <div className="form">
      <form onSubmit={onSubmitHandler}>
        <ul className="form-container">
          <li>
            <h3>Sign-IN</h3>
          </li>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </li>
          <li>
            <button type="submit" className="button primary">
              Signin
            </button>
          </li>
          <li>New to amazona?</li>
          <a className="button secondary text-center">
            Create your amazona account
          </a>
        </ul>
      </form>
    </div>
  );
}
