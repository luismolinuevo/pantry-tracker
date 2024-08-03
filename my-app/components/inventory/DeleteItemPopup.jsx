"use client";

import { useState } from "react";
import Modal from "../general/Modal";
import { deleteItem } from "@/app/lib/items";
import { Button, Input, Typography, Card } from "../../material_tailwind";

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
      const result = await deleteItem(item_id);

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
      <Card color="transparent" shadow={false} className="flex justify-center">
        <Typography variant="h4" color="blue-gray">
          Delete Item
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Delete Item out of inventory
        </Typography>
        <form
          onSubmit={handleDelete}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="flex gap-2">
            <Button type="submit" className="mt-6" fullWidth disabled={loading}>
              {loading ? "Deleting item..." : "Delete Item"}
            </Button>
            <Button
              onClick={onClose}
              className="mt-6 bg-red-500"
              fullWidth
              disabled={loading}
            >
              Cancel
            </Button>
          </div>

          {error && <p className="text-red-300 text-center">{error}</p>}
          {success && <p className="text-green-300 text-center">{success}</p>}
        </form>
      </Card>
    </Modal>
  );
}
