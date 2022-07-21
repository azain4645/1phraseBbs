import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig  = { 
  apiKey: "AIzaSyDskyUlYX_3PO7ZBwTXjoTiO9aVceS1wOQ",
  authDomain: "phrasebbs.firebaseapp.com",
  projectId: "phrasebbs",
  storageBucket: "phrasebbs.appspot.com",
  messagingSenderId: "501839072363",
  appId: "1:501839072363:web:5889fa3860da58fd8ff52e"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db