import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

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

const getCurrentUser = () => {
  try {
    const user = auth.currentUser;
    return user;
  } catch (error) {
    console.error("Error getting current user");
  }
};

export { signUp, login, logOut, signInWithGoogle, getCurrentUser };
