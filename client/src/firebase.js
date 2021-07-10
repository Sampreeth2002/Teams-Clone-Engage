import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCqPPz2juR2NZ7v0dtf1KwehJODB9QpT9U",
  authDomain: "meet-clone-c6a6a.firebaseapp.com",
  databaseURL: "https://meet-clone-c6a6a-default-rtdb.firebaseio.com",
  projectId: "meet-clone-c6a6a",
  storageBucket: "meet-clone-c6a6a.appspot.com",
  messagingSenderId: "916853236812",
  appId: "1:916853236812:web:92c698089ef48e6856c0e9",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
