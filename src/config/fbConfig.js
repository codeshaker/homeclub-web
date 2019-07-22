import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBquALZDh_W6imceLsR8V3gu6P3t-D8Dmg",
  authDomain: "homeclub-69cc7.firebaseapp.com",
  databaseURL: "https://homeclub-69cc7.firebaseio.com",
  projectId: "homeclub-69cc7",
  storageBucket: "homeclub-69cc7.appspot.com",
  messagingSenderId: "169988929213",
  appId: "1:169988929213:web:fe7678183e0bbaf0"
};
// Initialize Firebase
firebase.initializeApp(config);
//firebase.firestore().settings({ timestampsInSnapshots: true });

const storage = firebase.storage();

export { storage, firebase as default };
