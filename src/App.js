import React, { useEffect } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { verifyToken } from "./actions/userActions";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, token } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(verifyToken(token));
    }
    return () => {
      //
    };
  }, [token]);
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
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <div className="middle">
          <div className="content">
            <Route path="/" exact={true} component={HomeScreen}></Route>
            <Route path="/profile" component={ProfileScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
          </div>
        </div>
        <div className="footer">footer</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
