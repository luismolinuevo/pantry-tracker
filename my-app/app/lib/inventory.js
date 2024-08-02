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

const createInventory = async (user_id) => {
  try {
    if (!user_id) {
      console.log("No valid user id provided");
      return false;
    }

    const new_inventory = await addDoc(collection(firestore, "inventory"), {
      user_id: user_id,
    });

    if (new_inventory) {
      return new_inventory.id;
    }

    return false;
  } catch (error) {
    console.error("Error creating a inventory", error);
  }
};

const checkIfUserHasInventory = async (user_id) => {
  try {
    // Reference to the "inventory" collection
    const inventoryCollection = collection(firestore, "inventory");

    // Create a query to find documents where the `user_id` field matches the provided user_id
    const inventoryQuery = query(
      inventoryCollection,
      where("user_id", "==", user_id)
    );

    // Execute the query
    const querySnapshot = await getDocs(inventoryQuery);

    // Check if any documents match the query
    if (!querySnapshot.empty) {
      // Return the ID of the first document found
      const doc = querySnapshot.docs[0];
      return doc.id; // This returns the ID of the document
    }

    console.log("No inventory found for user_id:", user_id);
    return false; // No inventory found
  } catch (error) {
    console.error("Error checking if user has inventory:", error);
    return false; // Handle the error and return a default value
  }
};

export { checkIfUserHasInventory, createInventory };
