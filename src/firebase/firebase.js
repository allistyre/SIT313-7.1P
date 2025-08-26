import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA7oZ-y3LuZbIGeRhAjGjNbVJKqMQMRD3o",
    authDomain: "sit313-task7-1p-6b1ee.firebaseapp.com",
    projectId: "sit313-task7-1p-6b1ee",
    storageBucket: "sit313-task7-1p-6b1ee.firebasestorage.app",
    messagingSenderId: "1060138741066",
    appId: "1:1060138741066:web:98803dd55c21c7dabd25b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account"
    });

export const auth = getAuth();

export const registerWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithPopup = () => signInWithPopup(auth, provider);
