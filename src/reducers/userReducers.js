import userConstants, {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_LOGOUT,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
  USER_LOGOUT_FAIL,
} from "../constants/userConstants";

const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_VERIFY_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { message: action.payload };
    case USER_LOGOUT_FAIL:
      return { message: action.payload };
    default:
      return state;
  }
};
export { userSigninReducer };
