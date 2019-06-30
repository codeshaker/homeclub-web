export const createWorker = worker => {
  return (dispatch, getState) => {
    // make some async call
    dispatch({ type: "CREATE_WORKER", worker });
  };
};
