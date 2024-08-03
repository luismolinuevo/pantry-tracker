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
  deleteDoc,
  updateDoc,
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

// Get all items for a specific user
const getAllItems = async (user_id) => {
  try {
    if (!user_id) {
      console.log("No valid user id provided");
      return [];
    }

    const q = query(
      collection(firestore, "items"),
      where("user_id", "==", user_id)
    );
    const querySnapshot = await getDocs(q);

    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    return items;
  } catch (error) {
    console.error("Error getting items", error);
    return [];
  }
};

// Delete an item by ID
const deleteItem = async (item_id) => {
  try {
    if (!item_id) {
      console.log("No valid item id provided");
      return false;
    }

    await deleteDoc(doc(firestore, "items", item_id));
    console.log(`Item with ID ${item_id} has been deleted.`);
    return true;
  } catch (error) {
    console.error("Error deleting item", error);
    return false;
  }
};

// Update an item by ID
const updateItem = async (item_id, updatedData) => {
  try {
    if (!item_id) {
      console.log("No valid item id provided");
      return false;
    }

    const itemRef = doc(firestore, "items", item_id);
    await updateDoc(itemRef, updatedData);
    console.log(`Item with ID ${item_id} has been updated.`);
    return true;
  } catch (error) {
    console.error("Error updating item", error);
    return false;
  }
};

export { createItems, getAllItems, deleteItem, updateItem };
