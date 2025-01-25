import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shatter-b0750.firebaseapp.com",
  projectId: "shatter-b0750",
  storageBucket: "shatter-b0750.appspot.com",
  messagingSenderId: "205630338997",
  appId: "1:205630338997:web:29106394c978505ae78bfc",
  measurementId: "G-MRSMMR1LK8",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const storageRef = ref(storage);
export const dbRealtime = getDatabase();
export const db = getFirestore(app);

export const actionCodeSettings = {
  url: import.meta.env.VITE_APP_URL,
  handleCodeInApp: true,
};
