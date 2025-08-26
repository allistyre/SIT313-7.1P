import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
    const userDocRef = doc (db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                email,
                createdAt,
                ...additionalInfo,
            });
        }
        catch (error) {
            console.error("Error creating user doc", error.message);
        }
    }

    return userDocRef;
}