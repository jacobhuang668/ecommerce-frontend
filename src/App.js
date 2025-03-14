import React, { useEffect } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import { verifyToken } from "./actions/userActions";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error, token } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyToken(token));
    return () => {
      //
      console.log("remove token", token);
    };
  }, [token]);
  console.log("userInfo", userInfo, "token", token);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button>&#9776;</button>
            <Link to="/">amazona</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            {userInfo ? (
              <span>{userInfo.name}</span>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <div className="middle">
          <div className="content">
            <Route path="/" exact={true} component={HomeScreen}></Route>
            {/* <Route path="/profile" component={ProfileScreen}></Route> */}
            <Route path="/signin" component={SigninScreen}></Route>
          </div>
        </div>
        <div className="footer">footer</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
