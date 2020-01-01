const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAnMwLk62PvWWxkWTgv_v8FhkkAJ-yG6lY",
  authDomain: "xhibitr-app.firebaseapp.com",
  projectId: "xhibitr-app"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

export default database;
