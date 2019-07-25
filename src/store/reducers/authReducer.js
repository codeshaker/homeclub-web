const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "LOGIN_FAILED"
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "SIGNOUT_SUCCESS":
      console.log("Sign Out success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("sign up success");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      console.log("sign up failed");
      return {
        ...state,
        authError: action.err.message
      };
    default:
      return state;
  }
};

export default authReducer;
