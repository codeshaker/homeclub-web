const initState = {
  name: "",
  phone: "",
  email: "",
  address: ""
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      console.log(action.newUser);
      state.name = action.newUser.Name;
      state.address = action.newUser.Address;
      state.phone = action.newUser.Phone;
      state.email = action.newUser.Email;
      return state;

    case "SIGNUP_ERROR":
      console.log("sign up failed");
      return state;

    default:
      return state;
  }
};

export default userReducer;
