"use client";

import React from "react";
import Modal from "../general/Modal";
import { deleteItem } from "@/app/lib/items";

export default function DeleteItemPopup({
  item_id,
  onChange,
  setOnChange,
  isVisible,
  onClose,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDelete = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await deleteItem(item.id);

      if (result) {
        setSuccess("Item deleted successfully!");
        onClose();
        setOnChange(!onChange);
      } else {
        setError("Failed to delete item. Please try again.");
      }
    } catch (error) {
      console.error("Unable to delete item:", error);
      setError("Failed to delete item. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isVisable={isVisible} onClose={onClose}>
      <form
        onSubmit={handleDelete}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <Button type="submit" className="mt-6" fullWidth disabled={loading}>
          {loading ? "Deleting item..." : "Delete Item"}
        </Button>

        {error && <p className="text-red-300 text-center">{error}</p>}
        {success && <p className="text-green-300 text-center">{success}</p>}
      </form>
    </Modal>
  );
}
