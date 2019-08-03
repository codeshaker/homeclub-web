export const confirmBooking = bookingDetails => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    // Dispatch action for creating booking.
    firestore
      .collection("bookings")
      .doc()
      .set({
        ...bookingDetails,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_BOOKING", bookingDetails });
      })
      .catch(err => {
        dispatch({ type: "CREATE_BOOKING_ERROR", err });
      });
  };
};
