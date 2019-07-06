export const createWorker = worker => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make some async call to database
    const firestore = getFirestore();
    firestore
      .collection("workers")
      .add({
        ...worker,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_WORKER", worker });
      })
      .catch(err => {
        dispatch({ type: "CREATE_WORKER_ERROR", err });
      });
  };
};
