const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAnMwLk62PvWWxkWTgv_v8FhkkAJ-yG6lY",
  authDomain: "xhibitr-app.firebaseapp.com",
  projectId: "xhibitr-app"
};

export const fb = firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

export default database;
