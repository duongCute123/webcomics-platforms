// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile, onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8ruAfXOOTIry6j0z6ODL6JKc3pPWfbnw",
    authDomain: "editrealtime-2da19.firebaseapp.com",
    databaseURL: "https://editrealtime-2da19-default-rtdb.firebaseio.com",
    projectId: "editrealtime-2da19",
    storageBucket: "editrealtime-2da19.appspot.com",
    messagingSenderId: "50996894410",
    appId: "1:50996894410:web:2e8420230698c4ef0e3233",
    measurementId: "G-HJTY0J5MN8"
};
initializeApp(firebaseConfig)
// Initialize Firebase
const auth = getAuth()
const storage = getStorage()
const db = getFirestore(initializeApp(firebaseConfig))
export {
    auth,
    db,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut, storage, ref
}