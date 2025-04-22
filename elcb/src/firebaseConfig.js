import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyACjQr_2dWwBD0O1gcXiEFTjY9aUKdaHKg",
  authDomain: "elcb-c77d5.firebaseapp.com",
  databaseURL: "https://elcb-c77d5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "elcb-c77d5",
  storageBucket: "elcb-c77d5.firebasestorage.app",
  messagingSenderId: "678933860455",
  appId: "1:678933860455:web:0f96facccceab9e4ddc4c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
