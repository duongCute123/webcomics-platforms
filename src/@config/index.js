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
    apiKey: "AIzaSyD6tJiSCJgcmQ-Av_ld2B6QP3sVPLlRvOo",
    authDomain: "authencomics.firebaseapp.com",
    projectId: "authencomics",
    storageBucket: "authencomics.appspot.com",
    messagingSenderId: "15141927513",
    appId: "1:15141927513:web:91e38c46db9e6b3d394f48",
    measurementId: "G-RCGNFWHFLH"
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