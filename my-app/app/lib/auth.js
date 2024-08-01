import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";

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

export default signUp;
