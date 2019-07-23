export const createWorker = worker => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make some async call to database and add worker with custom id
    const firestore = getFirestore();

    let currentWorkersCount = 0;

    // First get current worker count to assign unique worker id
    firestore
      .collection("workersCount")
      .doc("count")
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("document exisit");
          currentWorkersCount = doc.data().numberOfWorkers;
          currentWorkersCount++;

          // Dispatch action for creating worker.
          firestore
            .collection("workers")
            .add({
              ...worker,
              id: currentWorkersCount,
              createdAt: new Date()
            })
            .then(() => {
              dispatch({ type: "CREATE_WORKER", worker });
            })
            .catch(err => {
              dispatch({ type: "CREATE_WORKER_ERROR", err });
            });
        }
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

    return relevantWorkers
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          const worker = doc.data();
          // Adding new id property.
          //worker["id"] = doc.id;
          workers.push(worker);
        });
      })
      .then(updatedWorkerList => {
        dispatch({ type: "SEARCH_WORKER", workers });
        return updatedWorkerList;
      })
      .catch(err => {
        dispatch({ type: "SEARCH_WORKER_ERROR", err });
      });
  };
};
