// firebase.js
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYS6FMIMt3lwJQp-sw9wpu1IlZdUQvY4s",
  authDomain: "notifyexport.firebaseapp.com",
  projectId: "notifyexport",
  storageBucket: "notifyexport.firebasestorage.app",
  messagingSenderId: "117026570321",
  appId: "1:117026570321:web:f0716ac022b55aee097870"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL };
