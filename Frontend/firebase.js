import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDULUML3vEgR1scCfjI37YtWy4aQKaY2U0",
  authDomain: "elevateai.firebaseapp.com",
  projectId: "elevateai",
  storageBucket: "elevateai.appspot.com",
  messagingSenderId: "524387787154",
  appId: "1:524387787154:web:842edef63a0f000898a14b"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();

export { auth };
