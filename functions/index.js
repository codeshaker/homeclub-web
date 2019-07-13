const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Hello World cloud functions
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from HomeClub!");
});

// Cloud function to keep track of worker documents count so that id is unique.
//const docRef = db.doc("workersCount/count");
const docRef = db.collection("workersCount").doc("count");

exports.workerDocumentWriteListener = functions.firestore
  .document("workers/{documentUid}")
  .onWrite((change, context) => {
    return docRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log(
            "workersCount collection and count document inside it does not exist"
          );
          throw new Error("No such User document!");
        } else {
          let currentWorkerCount = doc.data().numberOfWorkers;
          console.log("current worker count: ", currentWorkerCount);
          if (!change.before.exists) {
            // New worker document Created : add one to count so that id is unique
            console.log("increasing worker count");
            ++currentWorkerCount;
            docRef.update({ numberOfWorkers: currentWorkerCount });
          } else if (change.before.exists && change.after.exists) {
            // Updating existing document : Do nothing
          } else if (!change.after.exists) {
            // Deleting document : subtract one from count
            console.log("decreasing worker count");
            --currentWorkerCount;
            docRef.update({ numberOfWorkers: currentWorkerCount });
          }
          return true;
        }
      })
      .catch(err => {
        console.log(
          "error getting workersCount collection and count document ",
          err
        );
        return false;
      });
  });
