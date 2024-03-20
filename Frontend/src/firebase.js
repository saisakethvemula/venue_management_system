// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9KQ3iThX8mSnznWXiIz-utJqJ-hTbl-Y",
  authDomain: "simply-book.firebaseapp.com",
  projectId: "simply-book",
  storageBucket: "simply-book.appspot.com",
  messagingSenderId: "318597415438",
  appId: "1:318597415438:web:78bf8e5949e14fc4acf25f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const analytics = getAnalytics(app);
export default app;