// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBU-VkKYC9hyBR3LbXiCpiOQ_tfwightfY",
  authDomain: "comidarapida-a295b.firebaseapp.com",
  databaseURL: "https://comidarapida-a295b-default-rtdb.firebaseio.com",
  projectId: "comidarapida-a295b",
  storageBucket: "comidarapida-a295b.firebaseapp.com",
  messagingSenderId: "230786412117",
  appId: "1:230786412117:web:79421693d9b8dc4458aedc",
  measurementId: "G-8VCVHZKGS8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);