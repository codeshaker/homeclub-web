const initState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  gender: "",
  dateOfBirth: ""
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      console.log(action.newUser);
      state.name = action.newUser.Name;
      state.address = action.newUser.Address;
      state.phone = action.newUser.Phone;
      state.gender = action.newUser.Gender;
      state.email = action.newUser.Email;
      state.dateOfBirth = action.newUser.DateOfBirth;
      return state;

    case "SIGNUP_ERROR":
      console.log("sign up failed");
      return state;

    default:
      return state;
  }
};

export default userReducer;
