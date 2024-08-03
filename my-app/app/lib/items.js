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
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "./imageupload";

const createItems = async (user_id, count, name, price) => {
  try {
    if (!user_id) {
      console.log("No valid user id provided");
      return false;
    }

    // Generate a unique ID for the new item
    const newItemId = uuidv4();

    // Create a reference to the new document with the generated ID
    const newItemRef = doc(collection(firestore, "items"), newItemId);

    // Add the document with the specified ID
    await setDoc(newItemRef, {
      user_id: user_id,
      count: count,
      name: name,
      price: price,
      // picture:
    });

    return newItemId;
  } catch (error) {
    console.error("Error creating a items", error);
    return false;
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

const createItemWithImage = async (user_id, count, name, price, imageFile) => {
  try {
    if (!user_id) {
      console.log("No valid user id provided");
      return false;
    }

    // Upload the image and get the image URL
    const imageUrl = await uploadImage(imageFile);

    // Add item details along with image URL to Firestore
    const newItem = await addDoc(collection(firestore, "items"), {
      user_id: user_id,
      count: count,
      name: name,
      price: price,
      imageUrl: imageUrl, // Store the image URL in Firestore
    });

    if (newItem) {
      return newItem.id;
    }

    return false;
  } catch (error) {
    console.error("Error creating item with image", error);
    return false;
  }
};

export {
  createItems,
  getAllItems,
  deleteItem,
  updateItem,
  createItemWithImage,
};
