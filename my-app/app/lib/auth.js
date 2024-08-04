import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

//I would add more error handling in the future
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    console.error("Error signing up with email and password: ", error);
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in with email and password: ", error);
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in with Google: ", user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
};

const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // Clean up listener
        if (user) {
          resolve(user);
        } else {
          reject(new Error("No current user found"));
        }
      },
      reject
    );
  });
};

export { signUp, login, logOut, signInWithGoogle, getCurrentUser };
