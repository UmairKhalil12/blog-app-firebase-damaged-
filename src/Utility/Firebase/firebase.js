import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9qSG6M5RwBWMOo_9uH_wFtrbQ32KsY9E",
  authDomain: "blogging-app-4acfc.firebaseapp.com",
  projectId: "blogging-app-4acfc",
  storageBucket: "blogging-app-4acfc.appspot.com",
  messagingSenderId: "266955429560",
  appId: "1:266955429560:web:3107f031b5bbbdf8bd464d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage } 