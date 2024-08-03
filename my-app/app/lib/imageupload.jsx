import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Adjust the import path as necessary

const uploadImage = async (imageFile) => {
  if (!imageFile) return null;

  try {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export { uploadImage };
