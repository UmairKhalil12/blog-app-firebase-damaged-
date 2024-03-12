import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiW_RDASw436Uc2E01xmh4X1PJcpLcOFo",
  authDomain: "blogging-1d695.firebaseapp.com",
  projectId: "blogging-1d695",
  storageBucket: "blogging-1d695.appspot.com",
  messagingSenderId: "939120301491",
  appId: "1:939120301491:web:114bdfc24314837048e7c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage } 