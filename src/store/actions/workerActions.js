import { browserHistory } from "../../index";

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

export const searchWorker = searchDetails => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to firestore to fetch the relevant doc(worker)

    const db = getFirestore();
    const workersRef = db.collection("workers");
    const workers = [];

    console.log("searchDetails", searchDetails, workersRef);

    // Get all relevant documents meeting the searchDetails.
    let relevantWorkers = workersRef
      .where("city", "==", searchDetails.selectedCity)
      .where("workerType", "==", searchDetails.selectedWorkerType)
      .where("areas", "array-contains", searchDetails.value)
      .limit(25);

    relevantWorkers
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          const worker = doc.data();
          // Adding new id property.
          worker["id"] = doc.id;
          workers.push(worker);
        });
      })
      .then(() => dispatch({ type: "SEARCH_WORKER", workers }))
      .catch(err => {
        dispatch({ type: "SEARCH_WORKER_ERROR", err });
      });
  };
};
