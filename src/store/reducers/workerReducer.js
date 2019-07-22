const initState = {};

const workerReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_WORKER":
      console.log("create worker");
      return state;
    case "CREATE_WORKER_ERROR":
      console.log("create worker error", action.err);
      return state;
    case "SEARCH_WORKER":
      console.log(
        "search the web using search credentials",
        action.searchDetails
      );
      // Updating the worker list from actions.
      return {
        ...state,
        workers: action.workers
      };
    case "SEARCH_WORKER_ERROR":
      console.log("Search worker error", action.err);
      return state;
    default:
      return state;
  }
};

export default workerReducer;
