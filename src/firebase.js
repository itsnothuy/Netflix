// Import the necessary functions from Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAH34V9zaResfDDKKHdb-l77zG1Iignz1E",
  authDomain: "netflix-eeebe.firebaseapp.com",
  projectId: "netflix-eeebe",
  storageBucket: "netflix-eeebe.firebasestorage.app",
  messagingSenderId: "917366400662",
  appId: "1:917366400662:web:3bed93c709cc6fe58604b7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;