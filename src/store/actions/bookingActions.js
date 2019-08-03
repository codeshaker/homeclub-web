export const confirmBooking = bookingDetails => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const bookingDatabase = firestore.collection("bookings");
    const workerDatabase = firestore.collection("workers");
    const userDatabase = firestore.collection("users");
    const workerId = bookingDetails.workerId;
    const userId = bookingDetails.userId;
    const workerDocRef = workerDatabase.doc(workerId);
    const userDocRef = userDatabase.doc(userId);

    // First tell him to complete payment then booking will be done.
    // Here will add 2 property BookingStatus (upcoming|ongoing|expired(after 1 week)) and paymentStatus(paid|unpaid) - salary is first credit.

    // Dispatch action for creating new booking.
    bookingDatabase
      .add({
        ...bookingDetails,
        createdAt: new Date()
      })
      .then(bookingDocRef => {
        console.log("new booking doc id", bookingDocRef.id);

        // Add the bookingid to userBookingId Array property of worker doc
        workerDocRef.update({
          userBookingId: firestore.FieldValue.arrayUnion(bookingDocRef.id)
        });

        // Add the bookingid to userBookingId Array property of user doc
        userDocRef.update({
          workerBookingId: firestore.FieldValue.arrayUnion(bookingDocRef.id)
        });

        // update the worker doc
        dispatch({ type: "CREATE_BOOKING", bookingDetails });
      })
      .catch(err => {
        dispatch({ type: "CREATE_BOOKING_ERROR", err });
      });
  };
};
