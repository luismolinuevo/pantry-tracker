"use client";

import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/auth";
import { useRouter } from "next/navigation";
import { createItems } from "../lib/items";
import { Card, Input, Button, Typography } from "../../material_tailwind";

export default function Page() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [count, setCount] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserId(user.uid);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.log("Unable to get user id", error);
      }
    };

    getUserId();
  }, [router]);

  const addItem = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let item = await createItems(
        userId,
        parseInt(count),
        name,
        parseFloat(price),
        image
      );

      if (!item) {
        console.log("Error creating item");
        return;
      }

      setSuccess("Item added successfully!");
      setName("");
      setCount("");
      setPrice("");
    } catch (error) {
      console.error("Unable to add item:", error);
      setError("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card color="transparent" shadow={false} className="flex justify-center">
        <Typography variant="h4" color="blue-gray">
          Add Item
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter the details of the item you want to add.
        </Typography>
        <form
          onSubmit={addItem}
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
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Image
            </Typography>
            <Input
              type="file"
              size="lg"
              onChange={handleImageChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth disabled={loading}>
            {loading ? "Adding item..." : "Add Item"}
          </Button>
          {error && <p className="text-red-300 text-center">{error}</p>}
          {success && <p className="text-green-300 text-center">{success}</p>}
        </form>
      </Card>
    </div>
  );
}
