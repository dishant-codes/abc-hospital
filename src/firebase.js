import firebase from "firebase";

var firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCcDJ57L1P0jQ7HcEjnysSb8_EKWumdtzo",
  authDomain: "abc-hospital-a9e05.firebaseapp.com",
  projectId: "abc-hospital-a9e05",
  storageBucket: "abc-hospital-a9e05.appspot.com",
  messagingSenderId: "147322252032",
  appId: "1:147322252032:web:e89f8b86b731d1c621e1e5",
  measurementId: "G-00YH3981CD",
});

var db = firebaseConfig.firestore();
export { db };
