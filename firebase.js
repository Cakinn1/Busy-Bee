// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
// const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
// const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
// const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
// const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
// const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: "AIzaSyCKHylTlKoU8AEwHg8w4BiXNAVQ6ri_PJo",
  authDomain: "twitter-clone-57b5e.firebaseapp.com",
  projectId: "twitter-clone-57b5e",
  storageBucket: "twitter-clone-57b5e.appspot.com",
  messagingSenderId: "882606039281",
  appId: "1:882606039281:web:672713ebf4d96b08cfc950"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();



// const firebaseConfig = {
//   apiKey: "AIzaSyCKHylTlKoU8AEwHg8w4BiXNAVQ6ri_PJo",
//   authDomain: "twitter-clone-57b5e.firebaseapp.com",
//   projectId: "twitter-clone-57b5e",
//   storageBucket: "twitter-clone-57b5e.appspot.com",
//   messagingSenderId: "882606039281",
//   appId: "1:882606039281:web:672713ebf4d96b08cfc950"
// };