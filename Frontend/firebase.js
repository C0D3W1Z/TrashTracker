import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPQwzYxU7QaKeuChvqwm66OuI4Kmeyx1o",
  authDomain: "trashtracker-fd0aa.firebaseapp.com",
  projectId: "trashtracker-fd0aa",
  storageBucket: "trashtracker-fd0aa.appspot.com",
  messagingSenderId: "267073279101",
  appId: "1:267073279101:web:36b753bc5735a4877d4d14"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one.
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth };
export { db };





// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCPQwzYxU7QaKeuChvqwm66OuI4Kmeyx1o",
//   authDomain: "trashtracker-fd0aa.firebaseapp.com",
//   projectId: "trashtracker-fd0aa",
//   storageBucket: "trashtracker-fd0aa.appspot.com",
//   messagingSenderId: "267073279101",
//   appId: "1:267073279101:web:36b753bc5735a4877d4d14"
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// } else {
//     firebase.app(); // if already initialized, use that one
// }

// const auth = firebase.auth();

// export { auth };