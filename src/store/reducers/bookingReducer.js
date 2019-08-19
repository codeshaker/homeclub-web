const initState = {};

const bookingReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_BOOKING":
      console.log("Booking created");
      return state;
    case "CREATE_BOOKING_ERROR":
      console.log("Booking creation error");
      return state;
    default:
      return state;
  }
};

export default bookingReducer;
