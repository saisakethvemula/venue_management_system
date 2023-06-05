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
  apiKey: "AIzaSyB3-EsyAynM3aCLlIlADe2F5Xz2UXvTiS4",
  authDomain: "simplybook-e7357.firebaseapp.com",
  projectId: "simplybook-e7357",
  storageBucket: "simplybook-e7357.appspot.com",
  messagingSenderId: "826090304504",
  appId: "1:826090304504:web:47bea26a6760ec18c81c0d",
  measurementId: "G-759G16TSZ1"
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