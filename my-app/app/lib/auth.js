import { createUserWithEmailAndPassword } from "firebase/auth";
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

export default signUp;
