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
  limit,
  startAfter,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "./imageupload";

const getAllItems = async (
  user_id,
  searchTerm,
  sortOrder = "A-Z",
  lastVisible = null,
  itemsPerPage = 3
) => {
  try {
    if (!user_id) {
      console.log("No valid user id provided");
      return { items: [], lastDoc: null };
    }

    let q = query(
      collection(firestore, "items"),
      where("user_id", "==", user_id)
    );

    if (searchTerm) {
    }
    q = query(
      q,
      where("name", ">=", searchTerm),
      where("name", "<=", searchTerm + "\uf8ff")
    );

    switch (sortOrder) {
      case "A-Z":
        q = query(q, orderBy("name", "asc"));
        break;
      case "Z-A":
        q = query(q, orderBy("name", "desc"));
        break;
      case "Newest to Oldest":
        q = query(q, orderBy("createdAt", "desc"));
        break;
      case "Oldest to Newest":
        q = query(q, orderBy("createdAt", "asc"));
        break;
      default:
        break;
    }

    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    q = query(q, limit(itemsPerPage));

    const querySnapshot = await getDocs(q);
    console.log("Query Snapshot:", querySnapshot);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { items, lastDoc };
  } catch (error) {
    console.error("Error getting items", error);
    return { items: [], lastDoc: null };
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

const updateItem = async (
  item_id,
  updatedData,
  imageFile = null,
  existingImageUrl = null
) => {
  try {
    if (!item_id) {
      console.log("No valid item id provided");
      return false;
    }

    // If an image file is provided, upload it and get the new image URL
    if (imageFile) {
      const imageUrl = await uploadImage(imageFile);
      if (imageUrl) {
        updatedData.imageUrl = imageUrl;
      }
    } else if (existingImageUrl) {
      // Retain the old image URL if no new image is provided
      updatedData.imageUrl = existingImageUrl;
    }

    const itemRef = doc(firestore, "items", item_id);
    await updateDoc(itemRef, updatedData);

    return true;
  } catch (error) {
    console.error("Error updating item", error);
    return false;
  }
};

const createItems = async (user_id, count, name, price, imageFile) => {
  try {
    if (!user_id) {
      console.log("No valid user id provided");
      return false;
    }

    // Upload the image and get the image URL
    let imageUrl = null;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    // Generate a unique ID for the new item
    const newItemId = uuidv4();

    // Add item details along with image URL to Firestore
    const newItem = await addDoc(collection(firestore, "items"), {
      user_id: user_id,
      count: count,
      name: name,
      price: price,
      imageUrl: imageUrl,
      id: newItemId,
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

export { createItems, getAllItems, deleteItem, updateItem };
