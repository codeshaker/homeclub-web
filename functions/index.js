const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from HomeClub!");
});

let data = {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
};

// Add a new document in collection "cities" with ID 'LA'
let setDoc = db
  .collection("cities")
  .doc("LA")
  .set(data);
