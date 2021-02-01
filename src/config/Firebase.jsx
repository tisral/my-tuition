import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBP1GK4o3qvjatgtiZ_mRec44mTYWUgrco",
  authDomain: "mytuition-82223.firebaseapp.com",
  projectId: "mytuition-82223",
  storageBucket: "mytuition-82223.appspot.com",
  messagingSenderId: "941743831182",
  appId: "1:941743831182:web:5797d67eeda9f4cb96b1df",
  measurementId: "G-LNG9W637SC"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;