"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Typography, Card } from "../../material_tailwind";
import Modal from "../general/Modal";
import { updateItem } from "@/app/lib/items"; // Ensure you have this import

export default function EditItem({ onClose, item, isVisible }) {
  const [count, setCount] = useState(item?.count);
  const [name, setName] = useState(item?.name);
  const [price, setPrice] = useState(item?.price);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedData = {
        count: parseInt(count),
        name,
        price: parseFloat(price),
      };
      const result = await updateItem(item.id, updatedData);

      if (result) {
        setSuccess("Item updated successfully!");
        onClose();
      } else {
        setError("Failed to update item. Please try again.");
      }
    } catch (error) {
      console.error("Unable to update item:", error);
      setError("Failed to update item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCount(item?.count);
    setName(item?.name);
    setPrice(item?.price);
  }, [item]);

  return (
    <Modal onClose={onClose} isVisable={isVisible}>
      <Card color="transparent" shadow={false} className="flex justify-center">
        <Typography variant="h4" color="blue-gray">
          Edit Item
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Update the details of the item.
        </Typography>
        <form
          onSubmit={handleUpdate}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Item Name
            </Typography>
            <Input
              size="lg"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Count
            </Typography>
            <Input
              type="number"
              size="lg"
              placeholder="Count"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Price
            </Typography>
            <Input
              type="number"
              step="0.01"
              size="lg"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth disabled={loading}>
            {loading ? "Updating item..." : "Update Item"}
          </Button>
          {error && <p className="text-red-300 text-center">{error}</p>}
          {success && <p className="text-green-300 text-center">{success}</p>}
        </form>
      </Card>
    </Modal>
  );
}
