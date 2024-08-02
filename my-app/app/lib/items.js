import { firestore } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";

const createItems = async (user_id, count, name, price) => {
  try {
    if (!user_id) {
      console.log("No valid user id provided");
      return false;
    }

    const new_items = await addDoc(collection(firestore, "items"), {
      user_id: user_id,
      count: count,
      name: name,
      price: price,
      //   picture:
    });

    if (new_items) {
      return new_items.id;
    }

    return false;
  } catch (error) {
    console.error("Error creating a items", error);
  }
};

export { createItems };
