import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAob18l2fajuaPuWsk8kcB7kVcrD-aWxgg",
  authDomain: "sample-5ffc4.firebaseapp.com",
  projectId: "sample-5ffc4",
  storageBucket: "sample-5ffc4.firebasestorage.app",
  messagingSenderId: "507394470522",
  appId: "1:507394470522:web:0dc31ba6690041533941c3",
  databaseURL: "https://blog-app-449b1-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;
